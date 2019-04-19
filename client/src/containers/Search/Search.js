import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import EventCard from '../../components/EventCard/EventCard';
import EventSearch from '../../components/Input/SearchInput/EventSearch';
import LocationSearch from '../../components/Input/SearchInput/LocationSearch';
import DateSearch from '../../components/Input/SearchInput/DateSearch';

import './Search.css';

class Search extends Component {
  state = {};

  render() {
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
        <Row>
          <UncontrolledDropdown group>
            <DropdownToggle caret color="neutral" data-toggle="dropdown">
              Categories
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Row>
        <Row>
          <Col sm={4}>
            <EventCard />
          </Col>
          <Col sm={4}>
            <EventCard />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;
