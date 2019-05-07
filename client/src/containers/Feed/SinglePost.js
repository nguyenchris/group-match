import React, { Component } from 'react';
import { Col, Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

class SinglePost extends Component {
  render() {
    return (
      <Col md="4">
        <Card className="card-testimonial">
          <CardHeader className="card-header-avatar">
            <Link
              to={{
                pathname: `/user/profile/${this.props.post.creator._id}`
              }}
            >
              <img
                alt={this.props.post.creator.name}
                className="img img-raised"
                src={this.props.post.creator.imageUrl}
              />
            </Link>
          </CardHeader>
          <CardBody>
            <p className="card-description">{this.props.post.content}</p>
            <div className="icon icon-primary">
              <i className="fa fa-quote-right" />
            </div>
          </CardBody>
          <CardFooter>
            <Link
              to={{
                pathname: `/user/profile/${this.props.post.creator._id}`
              }}
            >
              <CardTitle tag="h4">{this.props.post.creator.name}</CardTitle>
            </Link>
            <h6>{this.props.post.creator.status ? 'Online' : 'Offline'}</h6>
            <hr />
            <h6>
              <i className="ti-time" />
              {this.props.time}
            </h6>
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

export default SinglePost;
