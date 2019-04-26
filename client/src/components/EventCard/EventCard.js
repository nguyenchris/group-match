import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
// import { Link } from 'react-router-dom';
import './EventCard.css';
const EventCard = props => {
  console.log(props);
  return (
    <div className="event-card">
      <Card style={{ width: '20rem' }}>
        <CardImg top src={props.image} alt="..." />
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <CardText>{props.summary}</CardText>
          <CardText>Start: {props.start}</CardText>
          <Button color="secondary" name="info">
            Go to Event
          </Button>
          <Button color="secondary" name="create" onClick={e => props.clicked(e, props)}>
            Create Event
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default EventCard;
