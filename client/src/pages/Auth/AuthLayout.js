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
// import NotificationAlert from '../../components/NotificationAlert/NotificaitonAlert'
import { Link, withRouter } from 'react-router-dom'

import './Auth.css';

const AuthLayout = props => { 
  return (
  <div className="section-signup">
    <Container>
      <Col className="mb-lg-auto" lg="6">
        <Card className="card-register">
          <CardHeader>
            <CardImg alt="..." src={require('../../assets/img/square2.png')} />
            <CardTitle tag="h4">{props.title}</CardTitle>
          </CardHeader>
          <CardBody>{props.children}</CardBody>
          <Link to={props.isLogin} replace>{props.title}</Link>
        </Card>
        {props.alert}
      </Col>
    </Container>
  </div>
)};

export default AuthLayout;
