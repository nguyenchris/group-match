import React, { Component } from 'react';
import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import InputField from '../../components/Input/InputField';
import AuthLayout from '../Layouts/Auth/AuthLayout';
import Spinner from '../../components/UI/Spinner';
import NotificationAlert from '../../components/NotificationAlert/NotificationAlert';

import * as actions from '../../store/actions/index';
import { checkIfValid } from '../../utils/helpers';

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null,
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (data, isLogin) => dispatch(actions.auth(data, isLogin))
  };
};

class Login extends Component {
  state = {
    controls: {
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
      }
    },
    isLogin: true,
    formSubmitted: false
  };

  submitHandler = e => {
    e.preventDefault();
    const data = {};
    for (let element in this.state.controls) {
      data[element] = this.state.controls[element].value;
    }
    this.props.onAuth(data, this.state.isLogin);
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
    updatedForm[key].valid = checkIfValid(updatedForm[key].value, updatedForm[key].rules);
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

    let loginRedirect = null;
    if (this.props.isLoggedIn) {
      loginRedirect = <Redirect to="/" />;
    }

    const form = formElementsArray.map(formElement => {
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
      );
    });
    return (
      <AuthLayout
        title="Login"
        alert={this.props.error ? <NotificationAlert alert={this.props.error} /> : null}
      >
        <Form className="form" onSubmit={this.submitHandler} noValidate>
          {form}
          <Button className="btn-round" color="success" disabled={this.props.loading} block>
            {this.props.loading ? <Spinner /> : 'Submit'}
          </Button>
        </Form>
        {loginRedirect}
      </AuthLayout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
