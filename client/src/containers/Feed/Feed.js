import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions';
import { getSocket } from '../../store/sockets';
import { Row, Col } from 'reactstrap';
import Post from './Post';
import SinglePost from './SinglePost';
import { getPosts, createPost, createLike } from '../../utils/api';
import Spinner from '../../components/UI/Spinner';
import moment from 'moment';
import './Feed.css';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postsLoading: true,
      postsPageAmount: null
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
      switch (action) {
        case 'create':
          return this.addLike(post, like);
        default:
          return;
      }
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

  addLike = (post, like) => {
    this.setState(prevState => {
      const updatedPosts = [...prevState.posts];
      const indexOfLikedPost = this.state.posts.findIndex(elem => elem._id === post._id);
      updatedPosts[indexOfLikedPost] = post;
      return {
        posts: updatedPosts
      };
    });
  };

  createLike = postId => {
    createLike(postId, this.props.userState.token)
      .then(result => {
        console.log('json', result);
      })
      .catch(err => console.log(err.message));
  };

  handlePost(content) {
    const newPost = {
      content: content,
      creator: this.props.userState.userId
    };
    createPost(newPost, this.props.userState.token).then(post => {
      console.log(post.data);
    });
  }

  loadPosts = () => {
    this.setState({ postsLoading: true });
    getPosts(this.props.userState.token).then(({ data }) => {
      this.setState({ posts: data.posts, postsLoading: false });
      console.log(data);
    });
  };

  render() {
    console.log(this.state.posts);
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
              addLike={this.createLike}
              time={moment(post.createdAt)
                .startOf()
                .fromNow()}
            />
          ))}
        </Row>
        <Post onPost={post => this.handlePost(post)} />
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
