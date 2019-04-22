import React, { Component, Fragment } from 'react';
import { Row, Col, Button, DropdownToggle, DropdownMenu, Dropdown, Form, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import moment from 'moment';

import EventCard from '../../components/EventCard/EventCard';
import EventSearch from '../../components/Input/SearchInput/EventSearch';
import LocationSearch from '../../components/Input/SearchInput/LocationSearch';
import DateSearch from '../../components/Input/SearchInput/DateSearch';
import Checkbox from '../../components/Input/SearchInput/Checkbox';

import './Search.css';
import categories from '../../data/event-categories.json';

import { getEventSearch } from '../../utils/api';
import Maps from '../Maps/Maps';
// import axios from 'axios';
import DateSearchLayout from '../Layouts/Search/DateSearchLayout';

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
    range_start: {
      value: '',
      name: 'range_start'
    },
    range_end: {
      value: '',
      name: 'range_end'
    },
    searchResults: [],
    page: null
  };

  toggleCategories = () => {
    if (this.state.categoriesIsOpen) {
      console.log('call API');
    }
    this.setState(prevState => ({
      categoriesIsOpen: !prevState.categoriesIsOpen
    }));
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
    // const name = e.target.name.toLowerCase();
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

  // Convert input and filters to a query string to call API and return the results
  getEvents = () => {
    const events = [];
    const selectedCategories = Object.entries(this.state.categories).filter(el => {
      return el[1] !== false;
    });
    const categoryArray = selectedCategories.map(el => {
      return el[0];
    });
    const queryObject = {
      categories: categoryArray,
      q: encodeURI(this.state.event.value),
      'start_date.range_start': [this.state.range_start.value],
      'start_date.range_end': [this.state.range_end.value]
    };

    const query = queryString.stringify(queryObject, { arrayFormat: 'comma', encode: false });
    console.log(queryObject);
    getEventSearch(query, this.props.token).then(result => {
      console.log(result.data.events);
      this.setState({ searchResults: result.data.events });
    });
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

    const searchedEvents = this.state.searchResults.map(event => {
      if (event.logo) {
        return (
          <Col>
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
            />
          </Col>
        );
      }
    });

    let isCategoriesSelected = Object.values(this.state.categories).some(value => value === true);
    console.log(this.state);
    return (
      <div className="content">
        <Row className="search-cards">
          <EventSearch
            keyPressed={this.handleKeypress}
            value={this.state.event.value}
            changed={this.handleInput}
            name={this.state.event.name}
          />
          <LocationSearch />
          <DateSearchLayout>
            <Col sm={12} md={6} className="date-picker-search">
              <DateSearch
                inputProps={{ placeholder: 'Start' }}
                changed={this.handleInput}
                value={this.state.range_start.value}
                name={this.state.range_start.name}
              />
            </Col>
            <Col sm={12} md={6} className="date-picker-search">
              <DateSearch
                inputProps={{
                  placeholder: 'End',
                  disabled: this.state.range_start.value ? false : true
                }}
                changed={this.handleInput}
                value={this.state.range_end.value}
                name={this.state.range_end.name}
              />
            </Col>
          </DateSearchLayout>
          <Col xs={12} sm={2} className="btn-search">
            <Button color="primary" className="animation-on-hover">
              <i className="tim-icons icon-zoom-split" />
            </Button>
          </Col>
        </Row>
        <Row className="filter-search-row">
          <Dropdown isOpen={this.state.categoriesIsOpen} toggle={this.toggleCategories}>
            <DropdownToggle
              caret
              data-toggle="dropdown"
              className="animation-on-hover"
              color={this.state.categoriesIsOpen || isCategoriesSelected ? 'primary' : 'neutral'}
            >
              Categories
            </DropdownToggle>
            <DropdownMenu>
              <Form>
                <Row>{checkboxes}</Row>
                <Row>
                  <Link>Apply</Link>
                </Row>
              </Form>
            </DropdownMenu>
          </Dropdown>
        </Row>
        <Row>{searchedEvents}</Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  null
)(Search);
