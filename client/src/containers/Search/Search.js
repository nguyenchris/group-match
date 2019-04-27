import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import queryString from 'query-string';
import { connect } from 'react-redux';
import moment from 'moment';

import EventCard from '../../components/EventCard/EventCard';
import Checkbox from '../../components/Input/SearchInput/Checkbox';
import Spinner from '../../components/UI/Spinner';
import Maps from '../Maps/Maps';
import SearchInputs from './Filters/SearchInputs';
import Filters from './Filters/Filters';

import './Search.css';
import categories from '../../data/event-categories.json';
import { getEventSearch } from '../../utils/api';
import * as actions from '../../store/actions/index';
import NotificationAlertPopUp from '../../components/NotificationAlert/NotificationAlertPopUp';

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
    location: '',
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

    /*
     Since current location consists of geolocation values (latitude and longitude)
     but user input for a location differs in value as well as query parameter with 
     eventbrite's API, we must check for the user's input and update state to 
     prevent appending both location queries, which would return an error.

     All below conditionals will check for changes in user location input / current location
     */

    // Check if current location is selected
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
          value: 'Current Location',
          label: 'Current Location'
        }
      });
    }
    // Reset all location states if user clears location input
    if (locationLat.value && locationLong.value && isCurrentLocationSelected && location === null) {
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
    // Remove geolocation values if user inputs a location instead of using current location
    if (locationLat.value && locationLong.value && isCurrentLocationSelected) {
      if (location !== null) {
        if (location.hasOwnProperty('value')) {
          if (location.value !== 'Current Location') {
            this.setState({
              ...this.state,
              locationLat: {
                value: ''
              },
              locationLong: {
                value: ''
              },
              isCurrentLocationSelected: false
            });
          }
        }
      }
    }
    //
    if (prevState.categories !== categories && prevState.categoriesIsOpen !== categoriesIsOpen) {
      this.getEvents();
    }
  }
  // Toggle state depending on which component needs to be updated
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
  // Method to get current location when current location is clicked
  getCurrentLocation = () => {
    this.setState({
      isCurrentLocationSelected: true
    });
    this.props.onCurrentLocation();
  };
  //
  handleEventButtonClick = ({ type, target }, props) => {
    this.setState({ selectedEvent: props });
  };
  // Update category checkboxes' states
  handleCheckboxChange = e => {
    const categoryId = e.target.id;
    this.setState(prevState => ({
      categories: {
        ...prevState.categories,
        [categoryId]: !prevState.categories[categoryId]
      }
    }));
  };
  // Get event search if user presses enter on keyboard
  handleKeypress = e => {
    const value = e.target.value.trim();
    if (e.key === 'Enter' && value.length !== 0) {
      this.getEvents();
    }
  };
  // updates locaton state depending on the value inputted
  handleLocationValue = value => {
    this.setState({
      ...this.state,
      location: value
    });
  };
  //
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
  // Creates an array of the category id's depending on if they are selected
  getSelectedCategories = () => {
    const selectedCategories = Object.entries(this.state.categories).filter(el => {
      return el[1] !== false;
    });
    return selectedCategories;
  };
  // Convert input and filters to a query string in order to call API and return the results
  getEvents = () => {
    const { range_start, range_end, location, event, locationLat, locationLong } = this.state;
    const selectedCategories = this.getSelectedCategories();
    let locationAddress;
    if (
      range_start.value ||
      range_end.value ||
      location ||
      event.value ||
      selectedCategories.length !== 0 ||
      locationLat.value ||
      locationLong.value
    ) {
      if (location) {
        locationAddress = locationLat.value && locationLong.value ? '' : location.value;
      }
      this.toggle('spinner');
      this.toggle('eventSearch');
      const categoryArray = selectedCategories.map(el => {
        return el[0];
      });
      // Pass in all parameters for eventbrite's api search query however wrap each value as an array
      const queryObject = {
        high_affinity_categories: categoryArray,
        q: [encodeURI(event.value)],
        'start_date.range_start': [range_start.value],
        'start_date.range_end': [range_end.value],
        'location.latitude': [locationLat.value],
        'location.longitude': [locationLong.value],
        'location.address': [locationAddress]
      };
      // queryString package will convert the queryObject into a querystring, separating each element
      // in the array with commas as well as removing the array brackets. If array is empty, the key
      // and value of the object will not be included in the query
      const query = queryString.stringify(queryObject, { arrayFormat: 'comma', encode: false });
      getEventSearch(query, this.props.token).then(result => {
        this.toggle('spinner');
        console.log(result.data);
        this.setState({ searchResults: result.data.events });
      });
    } else {
      // If there is no search input, display error to user
      this.getError('Please enter a search!');
    }
  };
  // Pass in any string to display a notification alert
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
      if (event) {
        return (
          <EventCard
            eventData={event}
            key={event.id}
            clicked={this.handleEventButtonClick}
            {...event}
            {...this.props}
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
            isCurrentLocationOn={this.state.isCurrentLocationSelected}
            locationValue={this.state.location}
            handleLocationValue={this.handleLocationValue}
            locationName="location"
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
        <Row className="ml-auto mr-auto">
          <Col md="7">
            {this.state.loading ? (
              <div className="event-search-spinner">
                <Spinner />
              </div>
            ) : null}
            {searchedEvents}
            {/* {this.state.selectedEvent ? (
            <ModalForm event={this.state.selectedEvent} {...this.props} />
          ) : null} */}
          </Col>
          <Maps />
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
