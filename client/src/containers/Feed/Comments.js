import React, { Component, Fragment } from 'react';
import { Row, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { editComment } from '../../utils/api';
import { getSocket } from '../../store/sockets';

class Comments extends Component {
  state = {
    comments: [],
    isEdit: false,
    isEditComments: [],
    commentValue: null
  };

  componentDidMount() {
    getSocket().on('comment', ({ action, post, comment }) => {
      if (this.props.postId === post._id && action === 'edit') {
        this.setState(prevState => {
          return {
            ...prevState,
            comments: prevState.comments.map((oldComment, index) => {
              if (oldComment._id === comment._id) {
                return {
                  ...oldComment,
                  content: comment.content
                };
              }
              return oldComment;
            })
          };
        });
      }
    });
    const updatedComments = this.props.comments.map(comment => ({
      ...comment,
      isEdit: false
    }));
    this.setState({
      ...this.state,
      comments: updatedComments
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.comments !== this.props.comments) {
      const newComments = this.filterNewComments(this.props.comments, prevProps.comments);
      const updatedComments = prevState.comments.concat(newComments);
      this.setState({
        ...this.state,
        comments: updatedComments
      });
    }
  }

  filterNewComments = (newArray, prevArray) => {
    return newArray.reduce((acc, obj) => {
      if (!prevArray.find(element => element._id === obj._id)) {
        let newObj = {
          ...obj,
          isEdit: false
        };
        acc.push(newObj);
      }
      return acc;
    }, []);
  };

  handleInputChange = e => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        comments: prevState.comments.map((comment, index) => {
          if (comment._id === id) {
            return {
              ...comment,
              content: value
            };
          }
          return comment;
        })
      };
    });
  };

  handleEditSubmit = e => {
    const id = e.target.id;
    const value = e.target.value;
    if (e.key === 'Enter' && value.length !== 0) {
      this.toggleEdit(id);
      editComment(value, id, this.props.postId, this.props.token)
        .then(comment => {
          return comment;
        })
        .catch(err => console.log(err));
    }

    // const updatedComment = this.state.comments.find(value, id);
  };

  toggleEdit = id => {
    this.setState(prevState => {
      return {
        ...prevState,
        comments: prevState.comments.map((comment, index) => {
          if (comment._id === id) {
            return {
              ...comment,
              isEdit: !comment.isEdit
            };
          }
          return comment;
        })
      };
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.comments.length > 0
          ? this.state.comments.map(comment => {
              return (
                <Row key={comment._id} className="comment-wrapper">
                  <div className="comment-user-info">
                    <Link
                      to={{
                        pathname: `/user/profile/${comment.creator._id}`
                      }}
                    >
                      <div className="comment-image">
                        <img src={comment.creator.imageUrl} alt="" />
                      </div>
                    </Link>
                  </div>
                  <div className="comment-text-wrapper">
                    <p className="comment-text">
                      <span className="comment-name">
                        <Link
                          to={{
                            pathname: `/user/profile/${comment.creator._id}`
                          }}
                        >
                          {comment.creator.name}
                        </Link>
                      </span>

                      {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
                      {!comment.isEdit ? comment.content : null}
                    </p>
                    {comment.isEdit ? (
                      <FormGroup>
                        <Input
                          type="textarea"
                          className="comment-edit-input"
                          id={comment._id}
                          value={comment.content}
                          onChange={this.handleInputChange}
                          onKeyPress={e => this.handleEditSubmit(e)}
                        />
                      </FormGroup>
                    ) : null}
                  </div>
                  <div className="comment-time">
                    <p className="text-muted">
                      {moment(comment.createdAt)
                        .startOf()
                        .fromNow()}
                    </p>
                    <p className="comment-actions">
                      {this.props.userId === comment.creator._id ? (
                        !comment.isEdit ? (
                          <span
                            className="comment-edit"
                            onClick={() => this.toggleEdit(comment._id)}
                          >
                            Edit
                          </span>
                        ) : null
                      ) : null}
                      {/* {!comment.isEdit ? (
                        <span className="comment-edit" onClick={() => this.toggleEdit(comment._id)}>
                          Edit
                        </span>
                      ) : null} */}

                      {/* <span className="comment-delete">Delete</span> */}
                    </p>
                  </div>
                </Row>
              );
            })
          : 'No Comments.'}
      </Fragment>
    );
  }
}

export default Comments;
