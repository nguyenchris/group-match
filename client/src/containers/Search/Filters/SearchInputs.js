import React, { Fragment } from 'react';
import { Row, Col, Button } from 'reactstrap';
import EventSearch from '../../../components/Input/SearchInput/EventSearch';
import LocationSearch from '../../../components/Input/SearchInput/LocationSearch';
import DateSearchLayout from '../../Layouts/Search/DateSearchLayout';
import DateSearch from '../../../components/Input/SearchInput/DateSearch';

const SearchInputs = props => {
  return (
    <Fragment>
      <EventSearch
        keyPressed={props.keyPressed}
        value={props.eventValue}
        changed={props.changed}
        name={props.eventName}
      />
      <LocationSearch
        onCurrentLocation={props.onCurrentLocation}
        changed={props.changed}
        value={props.locationValue}
      />
      <DateSearchLayout>
        <Col sm={12} md={6} className="date-picker-search">
          <DateSearch
            inputProps={{ placeholder: 'Start' }}
            changed={props.changed}
            value={props.dateStartValue}
            name={props.dateStartName}
          />
        </Col>
        <Col sm={12} md={6} className="date-picker-search">
          <DateSearch
            inputProps={{
              placeholder: 'End',
              disabled: props.dateStartValue ? false : true
            }}
            changed={props.changed}
            value={props.dateEndValue}
            name={props.dateEndName}
          />
        </Col>
      </DateSearchLayout>
    </Fragment>
  );
};

export default SearchInputs;
