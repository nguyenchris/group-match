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
  Form
} from 'reactstrap';
import { Link } from 'react-router-dom';

import EventCard from '../../components/EventCard/EventCard';
import EventSearch from '../../components/Input/SearchInput/EventSearch';
import LocationSearch from '../../components/Input/SearchInput/LocationSearch';
import DateSearch from '../../components/Input/SearchInput/DateSearch';
import Checkbox from '../../components/Input/SearchInput/Checkbox';

import './Search.css';
import CustomizableSelect from '../../components/Input/SearchInput/test';
import categories from '../../data/event-categories.json';

// create an object where each category id is the key to initiate the checkbox state
const categoriesWithCheckedState = categories.reduce((categoriesObj, categoryObj) => {
  return { ...categoriesObj, [categoryObj.id]: false };
}, {});

class Search extends Component {
  state = {
    categories: categoriesWithCheckedState,
    categoriesIsOpen: false,
    eventInput: {
      value: ''
    },
    locationInput: {
      value: ''
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.categories !== this.state.categories) {
    //   console.log('changed state');
    // }
    console.log(prevState);
  }

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

  handleEventInputKeySearch = e => {
    if (e.key === 'Enter') {
      console.log('Enter Key Pressed for Event Input');
    }
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
          <EventSearch keyPressed={this.handleEventInputKeySearch} />
          <LocationSearch />
          <DateSearch />
          <Col xs={12} sm={2} className="btn-search">
            <Button color="primary">
              <i className="tim-icons icon-zoom-split" />
            </Button>
          </Col>
        </Row>
        <Row className="filter-search-row">
          <Dropdown isOpen={this.state.categoriesIsOpen} toggle={this.toggleCategories}>
            <DropdownToggle
              caret
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

export default Search;
