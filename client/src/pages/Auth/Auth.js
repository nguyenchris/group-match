import React, { Component } from 'react';
import { Form } from 'reactstrap';
import InputField from '../../components/Input/InputField';
import AuthLayout from './AuthLayout';

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
    }
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
    const data = {};
    for (let element in this.state.controls) {
      data[element] = this.state.controls[element].value;
    }
  };

  // Depending on which input field is selected, determine the characters inputed and update state for its value
  inputHandler = (e, key) => {
    const updatedForm = {
      ...this.state.controls
    };
    const updatedFormElement = { ...updatedForm[key] };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkIfValid(
      updatedFormElement.value,
      updatedFormElement.rules
    );
    updatedFormElement.touched = true;
    updatedForm[key] = updatedFormElement;
    this.setState({ controls: updatedForm });
  };

  // Determines if user has clicked an input field. If so, change state for that input to be true
  focusHandler = (isFocus, key) => {
    const updatedForm = { ...this.state.controls };
    const updatedFormElement = { ...updatedForm[key] };
    updatedFormElement.focus = isFocus;
    updatedForm[key] = updatedFormElement;
    this.setState({ controls: updatedForm });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementsArray.map(formElement => (
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
    ));

    return (
      <AuthLayout title="Signup">
        <Form className="form" onSubmit={e => this.formSubmitHandler(e)}>
          {form}
        </Form>
      </AuthLayout>
    );
  }
}

export default Auth;
