import React, { Component } from 'react';
import { Col, Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SinglePost extends Component {
  render() {
    let isOnline = false;
    if (this.props.usersOnline) {
      isOnline = this.props.usersOnline.some(user => user._id === this.props.post.creator._id);
    }
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
            <h6>{isOnline ? 'Online' : 'Offline'}</h6>
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

const mapStateToProps = state => {
  return {
    usersOnline: state.feed.usersOnline
  };
};

export default connect(
  mapStateToProps,
  null
)(SinglePost);
