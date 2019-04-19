import React, { Component } from 'react';
import { Col, Input, Card, CardHeader, CardBody, FormGroup, CardTitle } from 'reactstrap';

class LocationSearch extends Component {
  render() {
    return (
      <Col xs={6} sm={3}>
        <Card>
          <CardHeader>
            <CardTitle>In</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Input placeholder="Location" />
            </FormGroup>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default LocationSearch;
