import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './EventCard.css';
class EventCard extends Component {
  state = {};
  render() {
    console.log(this.props);
    return (
      <div className="event-card">
        <Card style={{ width: '20rem' }}>
          <CardImg top src={this.props.image} alt="..." />
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardText>{this.props.summary}</CardText>
            <CardText>Start: {this.props.start}</CardText>
            <Link to={this.props.url}>
              <Button color="secondary">Go to Event</Button>
            </Link>
            {console.log(this.props.match)}
            <Button color="secondary">Create Event</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default EventCard;
