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
  Dropdown
} from 'reactstrap';

import EventCard from '../../components/EventCard/EventCard';
import EventSearch from '../../components/Input/SearchInput/EventSearch';
import LocationSearch from '../../components/Input/SearchInput/LocationSearch';
import DateSearch from '../../components/Input/SearchInput/DateSearch';
import Checkbox from '../../components/Input/SearchInput/Checkbox';

import categories from '../../data/event-categories.json';
import './Search.css';
import CustomizableSelect from '../../components/Input/SearchInput/test';

class Search extends Component {
  state = { categories: categories, categoriesIsOpen: false };

  toggleCategories = () => {
    this.setState(prevState => ({
      categoriesIsOpen: !prevState.categoriesIsOpen
    }));
  };

  render() {
    const checkboxes = this.state.categories.map((category, index) => {
      return <Checkbox key={category.id} name={category.name} />;
    });

    return (
      <div className="content">
        <Row className="search-cards">
          <EventSearch />
          <LocationSearch />
          <DateSearch />
          <Col xs={12} sm={2} className="btn-search">
            <Button>
              <i className="tim-icons icon-zoom-split" />
            </Button>
          </Col>
        </Row>
        <Row className="filter-search-row">
          <Dropdown isOpen={this.state.categoriesIsOpen} toggle={this.toggleCategories}>
            <DropdownToggle caret color="neutral">
              Categories
            </DropdownToggle>
            <DropdownMenu>
              {/* <DropdownItem> */}

              <Row> {checkboxes}</Row>
              {/* </DropdownItem> */}
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
