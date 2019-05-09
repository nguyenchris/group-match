import React, { Component, Fragment } from 'react';
import { Row, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

class Comments extends Component {
  state = {};

  render() {
    return (
      <Row className="comment-wrapper">
        <div className="comment-user-info">
          <div className="comment-image">
            <img src={this.props.post.creator.imageUrl} alt="" />
          </div>
        </div>
        <div className="comment-text-wrapper">
          <p className="comment-text">
            <span className="comment-name">
              <Link
                to={{
                  pathname: `/user/profile/${this.props.post.creator._id}`
                }}
              >
                {this.props.post.creator.name}
              </Link>
            </span>
            {/* <FormGroup>
                            <Input
                              type="textarea"
                              className="comment-edit-input"
                              value="hi this is a comment. how much as laksgasngajn q tqn q toqj tuiqwtiqntn
                          ast ast"
                            />
                          </FormGroup> */}
            {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
            hi this is a comment. how much as laksgasngajn q tqn q toqj tuiqwtiqntn ast ast
          </p>
        </div>
        <div className="comment-time">
          <p className="text-muted">10 hours ago</p>
        </div>
      </Row>
    );
  }
}

export default Comments;
