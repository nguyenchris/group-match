import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import queryString from 'query-string';
import { connect } from 'react-redux';
import moment from 'moment';

import EventCard from '../../components/EventCard/EventCard';
import Checkbox from '../../components/Input/SearchInput/Checkbox';
import Spinner from '../../components/UI/Spinner';
import ModalForm from '../../components/Modal/ModalForm';
// import Maps from '../Maps/Maps';
import SearchInputs from './Filters/SearchInputs';
import Filters from './Filters/Filters';

import './Search.css';
import categories from '../../data/event-categories.json';
import { getEventSearch } from '../../utils/api';
import * as actions from '../../store/actions/index';
import NotificationAlertPopUp from '../../components/NotificationAlert/NotificationAlertPopUp';
import AsyncSelect from 'react-select/lib/Async';

// create an object where each category id is the key with an inital value of false for checkboxes
const categoriesWithCheckedState = categories.reduce((categoriesObj, categoryObj) => {
  return { ...categoriesObj, [categoryObj.id]: false };
}, {});

class Search extends Component {
  state = {
    categories: categoriesWithCheckedState,
    categoriesIsOpen: false,
    event: {
      value: '',
      name: 'Event'
    },
    location: {
      value: '',
      name: 'Location'
    },
    locationLat: {
      value: '',
      name: 'LocationLat'
    },
    locationLong: {
      value: '',
      name: 'LocationLong'
    },
    range_start: {
      value: '',
      name: 'range_start'
    },
    range_end: {
      value: '',
      name: 'range_end'
    },
    searchResults: [],
    page: null,
    loading: false,
    selectedEvent: null,
    error: null,
    isCurrentLocationSelected: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { latitude, longitude } = this.props;
    const {
      isCurrentLocationSelected,
      locationLat,
      locationLong,
      location,
      categories,
      categoriesIsOpen
    } = this.state;
    if (latitude !== locationLat.value && longitude !== locationLong && isCurrentLocationSelected) {
      this.setState({
        ...this.state,
        locationLat: {
          value: latitude
        },
        locationLong: {
          value: longitude
        },
        location: {
          value: 'Current Location'
        }
      });
      const locationInput = document.getElementById('location');
      locationInput.value = 'Current Location';
    }

    if (
      locationLat.value &&
      locationLong.value &&
      isCurrentLocationSelected &&
      location.value !== 'Current Location'
    ) {
      const locationInput = document.getElementById('location');
      locationInput.value = '';
      this.setState({
        ...this.state,
        locationLat: {
          value: ''
        },
        locationLong: {
          value: ''
        },
        location: {
          value: ''
        },
        isCurrentLocationSelected: false
      });
    }

    if (prevState.categories !== categories && prevState.categoriesIsOpen !== categoriesIsOpen) {
      this.getEvents();
    }
  }

  toggle = type => {
    switch (type) {
      case 'eventSearch':
        return this.setState(prevState => ({
          searchResults: []
        }));
      case 'spinner':
        return this.setState(prevState => ({
          loading: !prevState.loading
        }));
      case 'categories':
        return this.setState(prevState => ({
          categoriesIsOpen: !prevState.categoriesIsOpen
        }));
      default:
        return;
    }
  };

  getCurrentLocation = () => {
    this.setState({
      isCurrentLocationSelected: true
    });
    this.props.onCurrentLocation();
  };

  handleEventButtonClick = ({ type, target }, props) => {
    this.setState({ selectedEvent: props });
  };

  handleCheckboxChange = e => {
    const categoryId = e.target.id;
    this.setState(prevState => ({
      categories: {
        ...prevState.categories,
        [categoryId]: !prevState.categories[categoryId]
      }
    }));
  };

  handleKeypress = e => {
    const value = e.target.value.trim();
    if (e.key === 'Enter' && value.length !== 0) {
      this.getEvents();
    }
  };

  handleInput = (e, date) => {
    let name, value;
    if (date) {
      value = e._d ? moment(e._d).format('YYYY-MM-DDThh:mm:ss') : '';
      name = date;
      if (date === 'range_end') {
        value = value >= this.state.range_start.value ? value : '';
      }
    } else {
      value = e.target.value;
      name = e.target.name.toLowerCase();
    }

    const updatedInput = {
      ...this.state,
      [name]: {
        ...this.state[name],
        value: value
      }
    };
    this.setState(updatedInput);
  };

  getSelectedCategories = () => {
    const selectedCategories = Object.entries(this.state.categories).filter(el => {
      return el[1] !== false;
    });
    return selectedCategories;
  };
  // Convert input and filters to a query string to call API and return the results
  getEvents = () => {
    const { range_start, range_end, location, event, locationLat, locationLong } = this.state;
    const selectedCategories = this.getSelectedCategories();
    let locationAddress;
    if (
      range_start.value ||
      range_end.value ||
      location.value ||
      event.value ||
      selectedCategories.length !== 0 ||
      locationLat.value ||
      locationLong.value
    ) {
      locationAddress = locationLat.value && locationLong.value ? '' : location.value;

      this.toggle('spinner');
      this.toggle('eventSearch');
      const categoryArray = selectedCategories.map(el => {
        return el[0];
      });
      const queryObject = {
        categories: categoryArray,
        q: [encodeURI(event.value)],
        'start_date.range_start': [range_start.value],
        'start_date.range_end': [range_end.value],
        'location.latitude': [locationLat.value],
        'location.longitude': [locationLong.value],
        'location.address': [locationAddress]
      };
      const query = queryString.stringify(queryObject, { arrayFormat: 'comma', encode: false });
      getEventSearch(query, this.props.token).then(result => {
        this.toggle('spinner');
        this.setState({ searchResults: result.data.events });
      });
    } else {
      this.getError('Please enter a search!');
    }
  };

  getError = message => {
    this.setState({
      error: message
    });
    setTimeout(() => {
      this.setState({
        error: null
      });
    }, 5000);
  };

  render() {
    const checkboxes = categories.map(category => {
      return (
        <Checkbox
          key={category.id}
          checked={this.state.categories[category.id]}
          changed={this.handleCheckboxChange}
          name={category.name}
          id={category.id}
        />
      );
    });

    const searchedEvents = this.state.searchResults.map((event, index) => {
      if (event.logo) {
        return (
          <EventCard
            key={event.id}
            id={event.id}
            isFree={event.is_free}
            name={event.name.text.toUpperCase()}
            start={moment(event.start.utc).format('MMM Do, hh:mm a')}
            end={moment(event.end.utc).format('MMM Do, hh:mm a')}
            summary={event.summary}
            url={event.url}
            highDefImage={event.logo.original.url}
            image={event.logo.url}
            category={event.category_id}
            venue={event.venue_id}
            event={event.description.text}
            clicked={this.handleEventButtonClick}
          />
        );
      }
    });

    return (
      <div className="content">
        <Row className="search-cards ml-auto mr-auto">
          <SearchInputs
            {...this.props}
            keyPressed={this.handleKeypress}
            eventValue={this.state.event.value}
            changed={this.handleInput}
            eventName={this.state.event.name}
            dateStartValue={this.state.range_start.value}
            dateStartName={this.state.range_start.name}
            dateEndValue={this.state.range_end.value}
            dateEndName={this.state.range_end.name}
            onCurrentLocation={this.getCurrentLocation}
            locationValue={this.state.location.value}
          />
          <Col xs={12} sm={2} className="btn-search">
            <Button color="primary" className="animation-on-hover" onClick={this.getEvents}>
              <i className="tim-icons icon-zoom-split" />
            </Button>
          </Col>
        </Row>
        <Row className="filter-search-row">
          <Filters
            categoriesIsOpen={this.state.categoriesIsOpen}
            toggleCategories={this.toggle}
            checkboxes={checkboxes}
            isCategoriesSelected={Object.values(this.state.categories).some(
              value => value === true
            )}
          />
        </Row>
        <Row />
        <Row>
          {this.state.loading ? (
            <div className="event-search-spinner">
              <Spinner />
            </div>
          ) : null}
          {searchedEvents}
          {this.state.selectedEvent ? (
            <ModalForm event={this.state.selectedEvent} {...this.props} />
          ) : null}
        </Row>
        {this.state.error ? <NotificationAlertPopUp message={this.state.error} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    latitude: state.geo.latitude,
    longitude: state.geo.longitude,
    locationError: state.geo.error
    // locationSuccess: state.geo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCurrentLocation: () => dispatch(actions.getCurrentLocation())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
