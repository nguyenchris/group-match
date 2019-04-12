import React, { Component } from 'react';
import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';
import InputField from '../../components/Input/InputField';
import AuthLayout from './AuthLayout';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner'

class Auth extends Component {
  state = {
    controls: {
      name: {
        type: 'text',
        value: '',
        icon: 'single-02',
        placeholder: 'Name',
        rules: {
          required: true,
          isName: true
        },
        valid: false,
        focus: false,
        touched: false
      },
      email: {
        type: 'email',
        value: '',
        icon: 'email-85',
        placeholder: 'Email',
        rules: {
          required: true,
          isEmail: true
        },
        valid: false,
        focus: false,
        touched: false
      },
      password: {
        type: 'password',
        value: '',
        icon: 'lock-circle',
        placeholder: 'Password',
        rules: {
          required: true,
          minLength: 5
        },
        valid: false,
        focus: false,
        touched: false
      },
      confirm: {
        type: 'password',
        value: '',
        icon: 'lock-circle',
        placeholder: 'Confirm password',
        rules: {
          required: true,
          minLength: 5,
          isConfirm: true
        },
        valid: false,
        focus: false,
        touched: false
      }
    },
    isLogin: true
  };

  // Pass in values for input and rules property to check if input isValid, true or false
  checkIfValid(value, rules) {
    let isValid = true;
    if (!rules) return true;
    if (rules && rules.required) {
      isValid = value.trim() !== '' && value.length >= 2 && isValid;
    }
    if (rules && rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules && rules.isEmail) {
      isValid = value.includes('@') && value.includes('.') && isValid;
    }
    if (rules && rules.isConfirm) {
      const password = this.state.controls.password.value;
      isValid = value === password && isValid;
    }
    return isValid;
  }

  submitHandler = e => {
    e.preventDefault();
    const data = {};
    for (let element in this.state.controls) {
      data[element] = this.state.controls[element].value;
    }
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
  };

  // Depending on which input field is selected, determine the characters inputed and update state for its value
  inputHandler = (e, key) => {
    const updatedForm = {
      ...this.state.controls,
      [key]: {
        ...this.state.controls[key],
        value: e.target.value,
        touched: true
      }
    };
    updatedForm[key].valid = this.checkIfValid(updatedForm[key].value, updatedForm[key].rules);
    this.setState({ controls: updatedForm });
  };

  // Determines if user has clicked an input field for the first time in order to prevent invalid red input to trigger at page load.
  focusHandler = (isFocus, key) => {
    const updatedForm = {
      ...this.state.controls,
      [key]: {
        ...this.state.controls[key],
        focus: isFocus
      }
    };
    this.setState({ controls: updatedForm });
  };

  render() {
    // Loop through controls object of this.state to create an array of each input type with their configuration types
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementsArray.map(formElement => {
      // Check whether to render login form or signup form
      if (this.state.isLogin) {
        if (formElement.id === 'name' || formElement.id === 'confirm') {
          return null;
        }
      }
      return (
      <InputField
        id={formElement.id}
        key={formElement.id}
        type={formElement.config.type}
        value={formElement.config.value}
        placeholder={formElement.config.placeholder}
        changed={this.inputHandler}
        icon={formElement.config.icon}
        invalid={formElement.config.valid}
        shouldValidate={formElement.config.rules}
        focus={formElement.config.focus}
        focused={this.focusHandler}
        touched={formElement.config.touched}
      />
    )})

    return (
      <AuthLayout title={this.state.isLogin ? 'Login' : 'Register'}>
        <Form className="form" onSubmit={this.submitHandler} noValidate>
          {form}
          <Button className="btn-round" color="success" block>
          {this.props.loading ? <Spinner/> : 'Submit'}
            </Button>

        </Form>
      </AuthLayout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);
