import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, CardTitle } from 'reactstrap';
import Datetime from 'react-datetime';

class DateSearch extends Component {
  render() {
    return (
      <Col xs={12} sm={4}>
        <Card>
          <CardHeader>
            <CardTitle>On</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Row>
                <Col sm={12} md={6} className="date-picker-search">
                  <Datetime timeFormat={false} inputProps={{ placeholder: 'Start' }} />
                </Col>
                <Col sm={12} md={6} className="date-picker-search">
                  <Datetime timeFormat={false} inputProps={{ placeholder: 'End' }} />
                </Col>
              </Row>
            </FormGroup>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default DateSearch;
