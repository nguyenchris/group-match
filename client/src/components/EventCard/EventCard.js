import React, { Component } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';

class EventCard extends Component {
  state = {};
  render() {
    return (
      <div>
        <Card style={{ width: '20rem' }}>
          <CardImg top src="img-src" alt="..." />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up the bulk of the card's
              content.
            </CardText>
            <Button color="primary">Go somewhere</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default EventCard;
