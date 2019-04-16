import React, { Component } from "react";

import { Container, Row, Col, Button } from "reactstrap";

import "../../assets/css/homepage.css";

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        {/* <ExamplesNavbar /> */}
        <Container>
          <Row />
        </Container>
        <img
          alt="..."
          className="img-background"
          src={require("../../assets/img/snow.jpg")}
          // style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }
}

export default Home;
