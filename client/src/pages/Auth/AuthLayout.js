import React from 'react';
import {
  Container,
  Col,
  Card,
  CardHeader,
  CardTitle,
  Button,
  CardBody,
  CardFooter,
  CardImg
} from 'reactstrap';

import './Auth.css';

const AuthLayout = props => (
  <div className="section-signup">
    <Container>
      <Col className="mb-lg-auto" lg="6">
        <Card className="card-register">
          <CardHeader>
            <CardImg alt="..." src={require('assets/img/square2.png')} />
            <CardTitle tag="h4">{props.title}</CardTitle>
          </CardHeader>
          <CardBody>{props.children}</CardBody>
          <CardFooter>
            <Button className="btn-round" color="success" size="lg">
              Signup
            </Button>
          </CardFooter>
        </Card>
      </Col>
    </Container>
  </div>
);

export default AuthLayout;
