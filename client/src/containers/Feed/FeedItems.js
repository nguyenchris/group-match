import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';

class FeedItems extends Component {
  render() {
    return (
      <Row>
        <Col md="6">
          <Card className="card-testimonial">
            <CardHeader className="card-header-avatar">
              <a href="#pablo" onClick={e => e.preventDefault()}>
                {/* <img alt="..." className="img img-raised" src={} /> */}
              </a>
            </CardHeader>
            <CardBody>
              <p className="card-description">
                The networking at Web Summit is like no other European tech conference.
              </p>
              <div className="icon icon-primary">
                <i className="fa fa-quote-right" />
              </div>
            </CardBody>
            <CardFooter>
              <CardTitle tag="h4">Robert Priscen</CardTitle>
              <p className="category">@robertpriscen</p>
            </CardFooter>
          </Card>
        </Col>
        {/* {this.props.items.map((feedItem, index) => {
          if (feedItem.type === 'comment') {
            return (
              <div className="feedItem" key={index}>
                {' '}
                {feedItem.userName}: "{feedItem.value}"
              </div>
            );
          } else if (feedItem.type === 'attendEvent') {
            return (
              <div className="feedItem" key={index}>
                {' '}
                {feedItem.userName} is attending event "{feedItem.event.eventName}"
              </div>
            );
          }
        })} */}
      </Row>
    );
  }
}

export default FeedItems;
