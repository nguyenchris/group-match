import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col, Button } from 'reactstrap';

import AdminFooter from '../../components/Footer/AdminFooter';

import background from '../../assets/img/snow.jpg';
import './Home.css';

class Home extends Component {
  state = {};

  render() {
    return (
      <div className="home-background">
        <div class="img-background" style={{ backgroundImage: `url(${background})` }}>
          <div className="about">
            <Container>
              <Row>
                <Col>
                  <p>
                    Group Match is a unique and low pressure way for you and friends to meet new
                    people with similar interests by attending local events!
                  </p>
                  <Row>
                    <Col>
                    <Link to="/login">
                      <Button color="success">Login</Button>
                    </Link>
                    <Link to="/signup">
                      <Button color="success">Sign up</Button>
                    </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
        </div>

        <AdminFooter />
      </div>
    );
  }
}

export default Home;
