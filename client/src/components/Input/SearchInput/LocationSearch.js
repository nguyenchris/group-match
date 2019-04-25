import React from 'react';
import { Col, Input, Card, CardHeader, CardBody, FormGroup, CardTitle } from 'reactstrap';
import AsyncSelect from 'react-select/lib/Async';
// import * as actions from '../../../store/actions/index';
// import { connect } from 'react-redux';

const LocationSearch = props => {
  // const locationOptions = inputValue => {
  //   // return new Promise(resolve => {
  //   return getLocations(inputValue, token).then(result => {
  //     console.log(result.data.locations);
  //     return result.data.locations;
  //   });
  //   // });
  // };
  console.log(props);
  return (
    <Col xs={6} sm={3}>
      <Card>
        <CardHeader>
          <CardTitle>In</CardTitle>
        </CardHeader>
        <CardBody>
          <FormGroup className="location-search">
            {/* <AsyncSelect
              className="react-select info"
              classNamePrefix="react-select"
              blurInputOnSelect={true}
              // isClearable={true}
              onChange={this.handleValue}
              defaultOptions
              placeholder={'Location'}
              openMenuOnClick={false}
              loadOptions={locationOptions}
              value={this.state.location}
              name="location"
              noOptionsMessage={() => 'No locations found'}
            /> */}
            <Input
              placeholder="Location"
              name="location"
              id="location"
              value={props.locationValue}
              onChange={props.changed}
            />
            {/* <button onClick={props.onCurrentLocation}>Current Location</button> */}
            <i
              className="fas fa-location-arrow current-location"
              alt="Current Location"
              onClick={props.onCurrentLocation}
            />
          </FormGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LocationSearch;
