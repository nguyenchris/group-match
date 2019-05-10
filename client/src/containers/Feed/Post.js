import React, { Component } from 'react';
// import { CardBody, Card, CardImg, CardTitle, CardText, Button } from 'reactstrap';
import { getSocket } from '../../store/sockets';
import { Row, Modal, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      modalOpen: false
    };
    this.handlePost = this.handlePost.bind(this);
  }

  handlePost(e) {
    if (e.key === 'Enter') {
      this.props.onPost(this.state.comment);
      this.setState(prevState => ({
        modalOpen: false,
        comment: ''
      }));
    }
  }

  handleCommentChange(e) {
    this.setState({ comment: e.target.value });
  }

  toggleModalPost = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  };

  render() {
    return (
      <Row>
        <Button size="lg" className="btn-simple" color="twitter" onClick={this.toggleModalPost}>
          Create New Post
        </Button>

        <Modal modalClassName="modal-search" isOpen={this.state.modalOpen}>
          <div className="modal-header">
            <Input
              id="inlineFormInputGroup"
              placeholder="I'm thinking about..."
              type="text"
              onKeyPress={this.handlePost}
              onChange={e => this.handleCommentChange(e)}
              value={this.state.comment}
            />
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleModalPost}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </div>
        </Modal>
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
