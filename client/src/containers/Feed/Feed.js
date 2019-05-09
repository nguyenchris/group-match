import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions';
import { getSocket } from '../../store/sockets';
import { Row, Col } from 'reactstrap';
import Post from './Post';
import SinglePost from './SinglePost';
import { getPosts, createPost, createLike, deleteLike } from '../../utils/api';
import Spinner from '../../components/UI/Spinner';
import moment from 'moment';
import './Feed.css';
import NotificationAlertPopUp from '../../components/NotificationAlert/NotificationAlertPopUp';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postsLoading: true,
      postsPageAmount: null,
      error: null
    };
  }

  componentDidMount() {
    this.loadPosts();
    getSocket().on('posts', ({ action, post }) => {
      switch (action) {
        case 'create':
          return this.addPost(post);
        default:
          return;
      }
    });
    getSocket().on('like', ({ action, post, like }) => {
      // switch (action) {
      //   case 'create':
      //     return this.addLike(post);
      //   default:
      //     return;
      // }
      this.addLike(post);
    });
  }

  addPost = newPost => {
    this.setState(prevState => {
      const updatedPosts = [...prevState.posts];
      updatedPosts.unshift(newPost);
      return {
        posts: updatedPosts
      };
    });
  };

  addLike = post => {
    const updatedPosts = [...this.state.posts];
    const indexOfLikedPost = this.state.posts.findIndex(elem => elem._id === post._id);
    updatedPosts[indexOfLikedPost] = post;
    this.setState({
      posts: updatedPosts
    });
  };

  // Update like button and send data to db
  updateLike = (postId, likeObj) => {
    console.log(likeObj);
    if (!likeObj) {
      createLike(postId, this.props.userState.token)
        .then(({ data }) => {
          return data;
        })
        .catch(err => this.displayError('An error occurred creating your like!'));
    } else {
      deleteLike(likeObj._id, postId, this.props.userState.token)
        .then(({ data }) => {
          return data;
        })
        .catch(err => this.displayError('An error occurred removing your like!'));
    }
  };

  handlePost(content) {
    const newPost = {
      content: content,
      creator: this.props.userState.userId
    };
    createPost(newPost, this.props.userState.token)
      .then(post => {
        return post;
      })
      .catch(err => this.displayError('An error occurred creating your !'));
  }

  submitComment = e => {};

  loadPosts = () => {
    this.setState({ postsLoading: true });
    getPosts(this.props.userState.token)
      .then(({ data }) => {
        this.setState({ posts: data.posts, postsLoading: false });
      })
      .catch(err => this.displayError('An error occurred getting the News Feed'));
  };

  displayError = error => {
    this.setState({
      error: error
    });
    setTimeout(() => {
      this.setState({
        error: null
      });
    }, 4500);
  };

  render() {
    return (
      <div className="content">
        <Row>
          {this.state.posts.length === 0 && !this.state.postsLoading ? (
            <Col className="text-center">
              <h1>No Posts found</h1>
            </Col>
          ) : null}
          {this.state.postsLoading ? (
            <Col>
              <div className="feed-spinner">
                <Spinner />
              </div>
            </Col>
          ) : null}
          {this.state.posts.map(post => (
            <SinglePost
              key={post._id}
              id={post._id}
              tooltipId={`tooltip${post._id}`}
              tooltipId2={`toolTip${post._id}2`}
              post={post}
              updateLike={this.updateLike}
              time={moment(post.createdAt)
                .startOf()
                .fromNow()}
            />
          ))}
        </Row>
        <Post onPost={post => this.handlePost(post)} />
        {this.state.error ? <NotificationAlertPopUp message={this.state.error} /> : null}
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
