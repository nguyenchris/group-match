import React, { Component } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from 'reactstrap';

class Signup extends Component {
  state = {};

  render() {
    return (
      <div className="section-signup">
        <Container>
          <Col className="mb-lg-auto" lg="6">
            <Card className="card-register">
              <CardHeader>
                <CardTitle className="text-center">Register</CardTitle>
              </CardHeader>
            </Card>
          </Col>
        </Container>
      </div>
    );
  }
}

export default Signup;
