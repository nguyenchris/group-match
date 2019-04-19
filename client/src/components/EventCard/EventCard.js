import React, { Component, Fragment } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';

class EventCard extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Card style={{ width: '20rem' }}>
          <CardImg
            top
            src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F54955993%2F267876970062%2F1%2Foriginal.20190110-220801?w=800&auto=compress&rect=0%2C60%2C1920%2C960&s=ca8e21e648e2aa6360a35168c872de51"
            alt="..."
          />
          <CardBody>
            <CardTitle>Event</CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up the bulk of the card's
              content.
            </CardText>
            <Button color="secondary">Go somewhere</Button>
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

export default EventCard;
