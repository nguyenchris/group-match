import React, { Component } from 'react';
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  Row,
  Badge,
  UncontrolledTooltip,
  Collapse,
  Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Comments from './Comments';

class SinglePost extends Component {
  state = {
    openedCollapses: [],
    likeObj: null,
    commentValue: ''
  };

  componentDidMount() {
    this.checkIfLiked();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.post.likes.length !== this.props.post.likes.length) {
      this.checkIfLiked();
    }
  }

  handleInput = e => {
    this.setState({
      ...this.state,
      commentValue: e.target.value
    });
  };

  collapsesToggle = (e, collapse) => {
    e.preventDefault();

    let openedCollapses = [...this.state.openedCollapses];
    if (openedCollapses.includes(collapse)) {
      this.setState({
        openedCollapses: openedCollapses.filter(item => item !== collapse)
      });
    } else {
      openedCollapses.push(collapse);
      this.setState({
        openedCollapses: openedCollapses
      });
    }
  };

  checkIfLiked = () => {
    const likeIndex = this.props.post.likes.findIndex(like => like.user === this.props.userId);
    if (likeIndex !== -1) {
      const likeObj = this.props.post.likes[likeIndex];
      this.setState({
        likeObj: likeObj
      });
    } else {
      this.setState({
        likeObj: null
      });
    }
  };
  render() {
    let isOnline = false;
    if (this.props.usersOnline) {
      isOnline = this.props.usersOnline.some(user => user._id === this.props.post.creator._id);
    }
    return (
      <Col md="6" className="post-card-wrapper">
        <Card className="card-testimonial post-card">
          <CardHeader className="card-header-avatar">
            <Link
              to={{
                pathname: `/user/profile/${this.props.post.creator._id}`
              }}
            >
              <img
                alt={this.props.post.creator.name}
                className="img img-raised"
                id={this.props.tooltipId}
                src={this.props.post.creator.imageUrl}
              />
            </Link>
          </CardHeader>
          <CardBody>
            <CardTitle tag="h4">{this.props.post.content}</CardTitle>
          </CardBody>
          <CardFooter className="post-footer">
            <hr />
            <Link
              to={{
                pathname: `/user/profile/${this.props.post.creator._id}`
              }}
            >
              <h6 id={this.props.tooltipId2}>{this.props.post.creator.name}</h6>
            </Link>
            <h6>
              {isOnline ? (
                <span className="text-success">Online</span>
              ) : (
                <span className="text-danger">Offline</span>
              )}
            </h6>
            <h6 className="text-muted post-time">Posted {this.props.time}</h6>
            <Row>
              <Col>
                <Button
                  color={this.state.likeObj ? 'primary' : 'info'}
                  className="btn-link"
                  type="button"
                  onClick={() =>
                    this.props.updateLike(
                      this.props.post._id,
                      this.state.likeObj,
                      this.props.post.creator._id
                    )
                  }
                >
                  <i className="tim-icons icon-heart-2" /> {'  '}
                  {this.state.likeObj ? 'Liked' : 'Likes'}{' '}
                  <Badge className="badge-like" color={this.state.likeObj ? 'primary' : 'info'}>
                    {this.props.post.likes.length}
                  </Badge>
                </Button>
              </Col>
              <Col>
                <Button
                  color="info"
                  className="btn-link"
                  type="button"
                  onClick={e => this.collapsesToggle(e, 'collapseOne')}
                >
                  Comments{'  '}
                  <Badge className="badge-comments" color="info">
                    {this.props.post.comments.length}
                  </Badge>
                </Button>
              </Col>
            </Row>
            <div
              aria-multiselectable={false}
              className="card-collapse"
              id="accordion"
              role="tablist"
            >
              <Card className="card-plain view-comments-card">
                <Collapse
                  role="tabpanel"
                  isOpen={this.state.openedCollapses.includes('collapseOne')}
                >
                  <CardBody className="view-comments-body">
                    <Row className="comment-input-row">
                      <div className="comment-image-user">
                        <img src={this.props.userImg} alt="" />
                      </div>
                      <Input
                        className="comment-input"
                        type="text"
                        id={this.props.post._id}
                        placeholder="Write a comment..."
                        color="info"
                        value={this.state.commentValue}
                        onChange={this.handleInput}
                        onKeyPress={e => this.props.submitComment(e)}
                      />
                    </Row>
                    {console.log(this.props.post.comments)}
                    <Comments
                      userId={this.props.userId}
                      token={this.props.token}
                      comments={this.props.post.comments}
                      postId={this.props.post._id}
                    />
                  </CardBody>
                </Collapse>
              </Card>
            </div>
          </CardFooter>
          <UncontrolledTooltip delay={0} placement="bottom" target={this.props.tooltipId}>
            View Profile
          </UncontrolledTooltip>
          <UncontrolledTooltip delay={0} placement="top" target={`${this.props.tooltipId2}`}>
            View Profile
          </UncontrolledTooltip>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersOnline: state.feed.usersOnline,
    userId: state.auth.userId,
    token: state.auth.token,
    userImg: state.auth.imageUrl
  };
};

export default connect(
  mapStateToProps,
  null
)(SinglePost);
