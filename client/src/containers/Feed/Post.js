import React, { Component } from 'react';
// import { CardBody, Card, CardImg, CardTitle, CardText, Button } from 'reactstrap';
import { getSocket } from '../../store/sockets';
import { Row } from 'reactstrap';
import { connect } from 'react-redux';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
    this.handlePost = this.handlePost.bind(this);
  }

  handlePost() {
    this.props.onPost(this.state.comment);
  }

  handleCommentChange(e) {
    this.setState({ comment: e.target.value });
  }

  render() {
    return (
      <Row>
        Comment: <input value={this.state.comment} onChange={e => this.handleCommentChange(e)} />{' '}
        <button onClick={this.handlePost}>Post</button>
      </Row>
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
)(Comment);
