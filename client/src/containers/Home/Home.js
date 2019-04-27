import React, { Component } from "react";

import { Container, Row } from "reactstrap";

import AdminFooter from "../../components/Footer/AdminFooter";

import "./Home.css";

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        <Container>
          <Row />
        </Container>

        <img
          alt="..."
          className="img-background"
          src={require("../../assets/img/snow.jpg")}
        />

        <div className="about">
          <Container>
            <Row />
            <p>
              Group Match is a unique and low pressure way for you and friends
              to meet new people with similar interests by attending local
              events!
            </p>
          </Container>
        </div>
        <AdminFooter />
      </div>
    );
  }
}

export default Home;
