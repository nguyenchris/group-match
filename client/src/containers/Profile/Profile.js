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
    console.log(this.props);
    if (this.props.match.params.id) {
      id = this.props.match.params.id;
    } else {
      id = this.props.userState.userId;
    }
    getUser(id, this.props.userState.token).then(user => {
      this.setState({
        name: user.data.name,
        aboutMe: user.data.aboutMe,
        imageUrl: user.data.imageUrl,
        status: user.data.status,
        lastSignIn: user.data.lastSignIn,
        createdOn: user.data.createdOn,
        friends: user.data.friends
      });
    });
  }

  render() {
    return (
      <div className="content">
        {/* User Main Profile */}
        <Jumbotron fluid>
          <Container fluid>
            {/* <Row>
              <Col md={1}>
                <img className="imgclass" src={'https://www.jetphotos.com/assets/img/user.png'} />
              </Col>
              <Col md={8}>
                <h1 className="display-3">User Profile</h1>
              </Col>
            </Row> */}
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
                      <p>Status: {this.state.status ? 'Online' : 'Offline'}</p>
                      <p>Last Sign In: {this.state.lastSignIn}</p>
                      <p>Member Since: {this.state.createdOn}</p>
                    </div>
                    <div className="card-description">
                      <h5 className="text-left">About Me</h5>
                      {this.state.aboutMe}
                    </div>
                  </CardBody>
                  {this.props.location.user ? (
                    <Button onClick={e => e.preventDefault()}>Send Friend Request</Button>
                  ) : null}
                </Card>
              </Col>
            </Row>

            {/* <p className="lead">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p> */}
          </Container>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              {/* Interests */}
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
              {/* Events Attended */}
              <Card>
                <CardBody>
                  <CardTitle>Previously Attended Events:</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of the
                    card's content.
                  </CardText>
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
    userState: state.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(Profile);
