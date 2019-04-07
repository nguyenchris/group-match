import React, { Component } from 'react';
import {
  Button,
  // Card,
  // CardHeader,
  // CardBody,
  // CardFooter,
  // CardTitle,
  // Label,
  // FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  // Container,
  Row,
  Col
} from 'reactstrap';

class Auth extends Component {
  state = {
    controls: {
      name: {
        type: 'text',
        value: '',
        icon: 'single-02',
        placeholder: 'Name',
        validation: {
          required: true,
          isName: true
        }
      },
      email: {
        type: 'email',
        value: '',
        icon: 'email-85',
        placeholder: 'Email',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        type: 'password',
        value: '',
        icon: 'lock-circle',
        placeholder: 'Password',
        validation: {
          required: true,
          minLength: 5
        },
        valid: false,
        touched: false
      }
    }
  };

  submitHandler = e => {
    const data = {};
    for (let element in this.state.controls) {
      data[element] = this.state.controls[element].value;
    }
  };

  inputHandler = (e, key) => {
    const updatedForm = {
      ...this.state.controls
    };
    const updatedFormElement = { ...updatedForm[key] };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkIfValid(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    console.log(updatedFormElement);
    updatedForm[key] = updatedFormElement;
    this.setState({ controls: updatedForm });
  };

  // Pass in value of input field and validation property to check
  checkIfValid(value, rules) {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== '';
    }
    if (rules.minLength) return isValid;
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <InputGroup key={formElement.id}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className={`tim-icons icon-${formElement.config.icon}`} />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          type={formElement.config.type}
          value={formElement.config.value}
          placeholder={formElement.config.placeholder}
          onChange={e => this.inputHandler(e, formElement.id)}
        />
      </InputGroup>
    ));

    return (
      <Form onSubmit={e => this.formSubmitHandler(e)}>
        {form}
        <Row className="row-grid justify-content-between align-items-center">
          <Col lg="6">
            <div className="btn-wrapper">
              <Button color="success">Register Page</Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Auth;
