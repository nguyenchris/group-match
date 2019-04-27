import React from 'react';
import { Col, Card, CardHeader, CardBody, FormGroup, CardTitle } from 'reactstrap';
import AsyncSelect from 'react-select/lib/Async';
import { getLocations } from '../../../utils/api';
import Spinner from '../../UI/Spinner';

const LocationSearch = props => {
  const locationOptions = inputValue => {
    return getLocations(inputValue, props.token).then(result => {
      return result.data.locations;
    });
  };

  let currentLocationIcon = null;
  if (props.loading && props.isCurrentLocationOn) {
    currentLocationIcon = <Spinner />;
  } else {
    currentLocationIcon = (
      <i
        className={`fas fa-location-arrow current-location ${
          props.isCurrentLocationOn ? 'current-location-selected' : ''
        }`}
        alt="Current Location"
        onClick={props.onCurrentLocation}
      />
    );
  }

  return (
    <Col xs={6} sm={3}>
      <Card>
        <CardHeader>
          <CardTitle>In</CardTitle>
        </CardHeader>
        <CardBody>
          <FormGroup className="location-search">
            <AsyncSelect
              className="react-select info"
              classNamePrefix="react-select"
              blurInputOnSelect={true}
              isClearable={true}
              onChange={e => props.changed(e)}
              defaultOptions
              placeholder={'Location'}
              openMenuOnClick={false}
              loadOptions={locationOptions}
              value={props.loading ? '' : props.value}
              name={props.name}
              noOptionsMessage={() => 'No locations found'}
            />
            {currentLocationIcon}
          </FormGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LocationSearch;
