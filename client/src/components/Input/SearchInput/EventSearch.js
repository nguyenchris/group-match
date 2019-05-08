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
          <Input
            placeholder="Event"
            onKeyPress={props.keyPressed}
            value={props.value}
            name={props.name}
            onChange={props.changed}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

export default EventSearch;
