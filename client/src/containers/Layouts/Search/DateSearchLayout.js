import React from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, CardTitle } from 'reactstrap';
const DateSearchLayout = props => {
  return (
    <Col xs={12} sm={4}>
      <Card>
        <CardHeader>
          <CardTitle>On</CardTitle>
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Row>{props.children}</Row>
          </FormGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

export default DateSearchLayout;
