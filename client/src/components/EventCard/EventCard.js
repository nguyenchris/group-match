import React, { Component, Fragment } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class EventCard extends Component {
  state = {};
  render() {
    console.log(this.props);
    return (
      <Fragment>
        <Card style={{ width: '20rem' }}>
          <CardImg top src={this.props.image} alt="..." />
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardText>{this.props.summary}</CardText>
            <CardText>Start: {this.props.start}</CardText>
            <Link to={this.props.url}>
              <Button color="secondary">Go to Event</Button>
            </Link>
            <Button color="secondary">Create Event</Button>
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

export default EventCard;
