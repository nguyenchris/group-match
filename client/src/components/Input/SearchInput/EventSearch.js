import React from 'react';
import { Col, Input, Card, CardHeader, CardBody, FormGroup, CardTitle } from 'reactstrap';

const EventSearch = props => {
  return (
    <Col xs={6} sm={3}>
      <Card>
        <CardHeader>
          <CardTitle>Looking for</CardTitle>
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Input placeholder="Event" />
          </FormGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

export default EventSearch;
