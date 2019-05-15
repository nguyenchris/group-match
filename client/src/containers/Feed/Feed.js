import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions';
import { getSocket } from '../../store/sockets';
import { Row, Col } from 'reactstrap';
import Post from './Post';
import SinglePost from './SinglePost';
import { getPosts, createPost, createLike, deleteLike, createComment } from '../../utils/api';
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
      error: null,
      commentValue: ''
    };
  }

  componentDidMount() {
    this.loadPosts();
    getSocket().on('posts', ({ action, post }) => {
      switch (action) {
        case 'create':
          return this.updatePostState(post);
        default:
          return;
      }
    });
    getSocket().on('like', ({ action, post, like }) => {
      this.updateLikeState(post);
    });
    getSocket().on('comment', ({ action, post, comment }) => {
      this.updateCommentState(post);
    });
  }

  updatePostState = newPost => {
    this.setState(prevState => {
      const updatedPosts = [...prevState.posts];
      updatedPosts.unshift(newPost);
      return {
        posts: updatedPosts
      };
    });
  };

  updateLikeState = post => {
    const updatedPosts = [...this.state.posts];
    const indexOfLikedPost = this.state.posts.findIndex(elem => elem._id === post._id);
    updatedPosts[indexOfLikedPost] = post;
    this.setState({
      posts: updatedPosts
    });
  };

  updateCommentState = post => {
    const updatedPosts = [...this.state.posts];
    const indexOfCommentPost = this.state.posts.findIndex(elem => elem._id === post._id);
    updatedPosts[indexOfCommentPost] = post;
    this.setState({
      posts: updatedPosts
    });
  };

  // Update like button and send data to db
  updateLike = (postId, likeObj, creatorId) => {
    if (this.props.userState.userId !== creatorId) {
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
    } else {
      this.displayError('You cannot like your own post!');
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
      .catch(err => this.displayError('An error occurred creating your post!'));
  }

  handleInput = e => {
    this.setState({
      ...this.state,
      commentValue: e.target.value
    });
  };

  submitComment = (e, isEdit) => {
    const value = e.target.value.trim();
    const postId = e.target.id;
    if (e.key === 'Enter' && value.length !== 0) {
      createComment(value, postId, this.props.userState.token)
        .then(({ data }) => {
          this.setState(prevState => ({
            ...prevState,
            commentValue: ''
          }))
          return data;
        })
        .catch(err => this.displayError('Oops, there was an error creating your comment!'));
    }
  };

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
          <div className="ml-auto mr-auto">
            <Post onPost={post => this.handlePost(post)} />
          </div>
        </Row>

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
          {/* <Col> */}
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
              submitComment={this.submitComment}
              commentValue={this.state.commentValue}
              handleCommentInput={this.handleInput}
            />
          ))}
          {/* </Col> */}
        </Row>
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
