import React, { Component } from "react";

import { Jumbotron, Container, Row } from "reactstrap";

class Profile extends Component {
  state = {};

  render() {
    return (
      <div className="content">
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">About</h1>
            <p className="lead">
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
          </Container>
        </Jumbotron>
        <div />
      </div>
    );
  }
}

export default Profile;
