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
              <CardTitle tag="h4" className="text-secondary">
                {props.title}
              </CardTitle>
            </CardHeader>
            <CardBody>{props.children}</CardBody>
          </Card>
          {props.alert}
        </Col>
      </Container>
    </div>
  );
};

export default AuthLayout;
