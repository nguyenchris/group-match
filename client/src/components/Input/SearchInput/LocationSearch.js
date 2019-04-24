import React from 'react';
import { Col, Input, Card, CardHeader, CardBody, FormGroup, CardTitle } from 'reactstrap';
// import * as actions from '../../../store/actions/index';
// import { connect } from 'react-redux';

const LocationSearch = props => {
  return (
    <Col xs={6} sm={3}>
      <Card>
        <CardHeader>
          <CardTitle>In</CardTitle>
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Input
              placeholder="Location"
              name="location"
              id="location"
              value={props.locationValue}
              onChange={props.changed}
            />
            <button onClick={props.onCurrentLocation}>Current Location</button>
          </FormGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LocationSearch;
