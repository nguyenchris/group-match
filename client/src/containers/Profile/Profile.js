import React, { Component } from 'react';

import {
  Jumbotron,
  Container,
  Row,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Col,
  Button
} from 'reactstrap';

import './Profile.css';
import { getUser } from '../../utils/api';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions';

class Profile extends Component {
  state = {
    name: '',
    aboutMe: '',
    imageUrl: '',
    lastSignIn: '',
    createdOn: '',
    friends: []
  };

  componentDidMount() {
    let id = null;
    if (this.props.match.params.id) {
      id = this.props.match.params.id;
    }
    getUser(id, this.props.userState.token).then(user => {
      this.setState({
        name: user.data.name,
        aboutMe: user.data.aboutMe,
        imageUrl: user.data.imageUrl,
        status: user.data.status,
        lastSignIn: user.data.lastSignIn,
        createdOn: user.data.createdOn,
        friends: user.data.friends,
        id: user.data.userId
      });
    });
  }

  sendFriendRequest = id => {};

  render() {
    let isOnline = false;
    if (this.props.usersOnline) {
      isOnline = this.props.usersOnline.some(user => user._id === this.state.id);
    }
    return (
      <div className="content">
        <Jumbotron fluid>
          <Container fluid>
            <Row>
              <Col sm="6" lg="6" className="ml-auto mr-auto">
                <Card className="card-user">
                  <CardBody>
                    <CardText />
                    <div className="author">
                      <div className="block block-one" />
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img alt="..." className="avatar" src={this.state.imageUrl} />
                        <h5 className="title">{this.state.name}</h5>
                      </a>
                      <p>
                        Status:{' '}
                        {isOnline ? (
                          <span className="text-success">Online</span>
                        ) : (
                          <span className="text-danger">Offline</span>
                        )}
                      </p>
                      <p>Last Sign In: {this.state.lastSignIn}</p>
                      <p>Member Since: {this.state.createdOn}</p>
                    </div>
                    <div className="card-description">
                      <h5 className="text-left">About Me</h5>
                      {this.state.aboutMe}
                    </div>
                  </CardBody>
                  {this.state.id !== this.props.userState.userId ? (
                    <Button onClick={e => e.preventDefault()}>
                      Send Friend Request (Feature currently unavailable)
                    </Button>
                  ) : null}
                </Card>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>Friends</CardTitle>
                  <CardText>
                    {this.state.friends.length > 0 ? 'map friends' : 'No friends yet.'}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>Previously Attended Events:</CardTitle>
                  <CardText>Feature not available yet.</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <div />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userState: state.auth,
    usersOnline: state.feed.usersOnline
  };
};

export default connect(
  mapStateToProps,
  null
)(Profile);
