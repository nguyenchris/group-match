<<<<<<< HEAD
import React, { Component } from "react";
=======
import React, { Component } from 'react';
>>>>>>> af1a87c4a8a1e8ca8302dbc6c249cdd5e6c574aa

import { Container, Row, Col, Button } from "reactstrap";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";
import "../../assets/css/homepage.css";

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
<<<<<<< HEAD
        <ExamplesNavbar />
        <Container>
          {/* <Button>Homepage</Button> */}
          <Row />
        </Container>
        <img
          alt="..."
          className="img-background"
          src={require("assets/img/snow.jpg")}
          // style={{ width: "100%", height: "100%" }}
        />
      </div>
=======
        <Container>
        </Container>
      </div>

      // </div>
>>>>>>> af1a87c4a8a1e8ca8302dbc6c249cdd5e6c574aa
    );
  }
}

export default Home;
