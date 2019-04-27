import React, { Component } from "react";

import {
  Jumbotron,
  Container,
  Row,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Col
} from "reactstrap";

import "./Profile.css";

class Profile extends Component {
  state = {};

  render() {
    return (
      <div className="content">
        {/* User Main Profile */}
        <Jumbotron fluid>
          <Container fluid>
            <Row>
              <Col md={1}>
                <img
                  className="imgclass"
                  src={"https://www.jetphotos.com/assets/img/user.png"}
                />
              </Col>
              <Col md={8}>
                <h1 className="display-3">User Profile</h1>
              </Col>
            </Row>
            <p className="lead">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Container>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              {/* Interests */}
              <Card>
                <CardBody>
                  <CardTitle>Interests:</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
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
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
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

export default Profile;
