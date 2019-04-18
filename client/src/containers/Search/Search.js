import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Input,
  Card,
  Button,
  CardHeader,
  CardBody,
  FormGroup,
  CardTitle
} from 'reactstrap';
import EventCard from '../../components/EventCard/EventCard';
import Datetime from 'react-datetime';
import './Search.css';

class Search extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <div className="content">
          <Row>
            <Col xs={12} sm={4}>
              <Card>
                <CardHeader>
                  <CardTitle>Date Picker</CardTitle>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Datetime
                      timeFormat={false}
                      inputProps={{ placeholder: 'Datetime Picker Here' }}
                    />
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default Search;
