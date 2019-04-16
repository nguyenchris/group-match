import React from 'react';
import { Container, Col, Card, CardHeader, CardTitle, CardBody } from 'reactstrap';

import './Auth.css';

const AuthLayout = props => {
  return (
    <div className="section-signup">
      <Container>
        <Col className="mb-lg-auto" lg="6">
          <Card className="card-register">
            <CardHeader>
              {/* <CardImg alt="..." src={require('../../assets/img/square2.png')} /> */}
              <CardTitle tag="h4">{props.title}</CardTitle>
            </CardHeader>
            <CardBody>{props.children}</CardBody>
            {/* <Link to={{ pathname: '/auth/login' }}>{props.title}</Link> */}
          </Card>
          {props.alert}
        </Col>
      </Container>
    </div>
  );
};

export default AuthLayout;
