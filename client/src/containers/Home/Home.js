import React, { Component } from 'react';

import { Container, Row } from 'reactstrap';

import './Home.css';

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        <Container>
          <Row />
        </Container>
        <img alt="..." className="img-background" src={require('../../assets/img/snow.jpg')} />
      </div>
    );
  }
}

export default Home;
