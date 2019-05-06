import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions';
import { getSocket } from '../../store/sockets';

import Comment from './Comment';
import FeedItems from './FeedItems';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedItems: []
    };
  }

  componentDidMount() {
    // getSocket().emit('messageToServer', {
    //   message: 'hi'
    // });
  }

  handlePost(comment) {
    this.setState(prevState => {
      return prevState.feedItems.push({
        type: 'comment',
        value: comment,
        userName: this.props.userState.name
      });
    });
  }

  render() {
    return (
      <div className="content">
        <Comment onPost={comment => this.handlePost(comment)} />
        <FeedItems items={this.state.feedItems} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userState: state.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(Feed);
