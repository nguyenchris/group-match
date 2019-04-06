import React from 'react';
import classnames from 'classnames';
// reactstrap components
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

class Signup extends React.Component {
  state = {};
  render() {
    return (
      <div className="section section-signup">
        <Container>
          <Col className="mb-lg-auto" lg="6">
            <Card className="card-register">
              <CardHeader>
                <CardImg
                  alt="..."
                  src={require('assets/img/square-purple-1.png')}
                />
                <CardTitle tag="h4">Register</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="form">
                  <InputGroup
                    className={classnames({
                      'input-group-focus': this.state.fullNameFocus
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Full Name"
                      type="text"
                      onFocus={e => this.setState({ fullNameFocus: true })}
                      onBlur={e => this.setState({ fullNameFocus: false })}
                    />
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      'input-group-focus': this.state.emailFocus
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="text"
                      onFocus={e => this.setState({ emailFocus: true })}
                      onBlur={e => this.setState({ emailFocus: false })}
                    />
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      'input-group-focus': this.state.passwordFocus
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-lock-circle" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="text"
                      onFocus={e => this.setState({ passwordFocus: true })}
                      onBlur={e => this.setState({ passwordFocus: false })}
                    />
                  </InputGroup>
                  <FormGroup check className="text-left">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign" />I agree to the{' '}
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        terms and conditions
                      </a>
                      .
                    </Label>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-round" color="primary" size="lg">
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          </Col>
          {/* <div className="squares square-1" />
          <div className="squares square-2" />
          <div className="squares square-3" />
          <div className="squares square-4" /> */}
          <Row className="row-grid justify-content-between align-items-center">
            <Col lg="6">
              <div className="btn-wrapper">
                <Button color="primary" to="register-page">
                  Register Page
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Signup;
