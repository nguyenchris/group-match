import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Label,
  Input,
  Dropdown,
  Form,
  Badge,
  UncontrolledDropdown,
  UncontrolledCollapse,
  Card,
  CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';

import EventCard from '../../components/EventCard/EventCard';
import EventSearch from '../../components/Input/SearchInput/EventSearch';
import LocationSearch from '../../components/Input/SearchInput/LocationSearch';
import DateSearch from '../../components/Input/SearchInput/DateSearch';
import Checkbox from '../../components/Input/SearchInput/Checkbox';

import './Search.css';
import CustomizableSelect from '../../components/Input/SearchInput/test';
import categories from '../../data/event-categories.json';

import { getEventSearch } from '../../utils/api';
import axios from 'axios';

// create an object where each category id is the key with an inital value of false for checkboxes
const categoriesWithCheckedState = categories.reduce((categoriesObj, categoryObj) => {
  return { ...categoriesObj, [categoryObj.id]: false };
}, {});

// console.log(queryString.stringify(testobj, { arrayFormat: 'comma' }));

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
    }
  };

  toggleCategories = () => {
    if (this.state.categoriesIsOpen) {
      console.log('call API');
    }
    this.setState(prevState => ({
      categoriesIsOpen: !prevState.categoriesIsOpen
    }));
  };

  createCategoryCheckbox = category => {
    return <Checkbox>key={}</Checkbox>;
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
    if (e.key === 'Enter') {
      const name = e.target.name.toLowerCase();
      console.log('Enter Key Pressed for Event Input');
      this.getEvents();
    }
  };

  handleInput = e => {
    const name = e.target.name.toLowerCase();
    const updatedInput = {
      ...this.state,
      [name]: {
        ...this.state[name],
        value: e.target.value
      }
    };
    this.setState(updatedInput);
  };

  getEvents = () => {
    let categoryArray = [];
    const selectedCategories = Object.entries(this.state.categories).filter(el => {
      return el[1] !== false;
    });

    categoryArray = selectedCategories.map(el => {
      return el[0];
    });
    const queryObject = {
      categories: categoryArray,
      q: this.state.event.value
    };
    const query = queryString.stringify(queryObject, { arrayFormat: 'comma' });
    getEventSearch(query, this.props.token).then(result => {
      console.log(result.data);
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

    let isCategoriesSelected = Object.values(this.state.categories).some(value => value === true);

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
          <DateSearch />
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

          <Badge pill color="primary">
            Hi
          </Badge>
        </Row>
        <Row>
          <Col sm={4}>
            <EventCard />
          </Col>
          <Col sm={4}>
            <EventCard />
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomizableSelect />
          </Col>
        </Row>
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
