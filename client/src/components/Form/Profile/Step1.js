import React, { Fragment } from 'react';
import { Input, FormGroup, Label } from 'reactstrap';

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutMe: '',
      aboutMeState: ''
    };
  }

  handleInput = e => {
    const { value, id } = e.target;

    this.setState({
      [id]: value.trim(),
      [id + 'State']: 'has-success'
    });
  };

  isValidated() {
    if (this.state.aboutMe.length >= 10) {
      return true;
    } else {
      this.setState({
        aboutMeState: 'has-danger'
      });
      return false;
    }
  }
  render() {
    return (
      <Fragment>
        <FormGroup>
          <Label for="description">Please provide a brief description about yourself!</Label>
          <Input
            type="textarea"
            name="text"
            id="aboutMe"
            onChange={this.handleInput}
            placeholder="Required"
          />
          {this.state.aboutMeState === 'has-danger' ? (
            <label className="error text-danger">
              Your About Me must be at least 10 characters long!
            </label>
          ) : null}
        </FormGroup>
      </Fragment>
    );
  }
}

export default FirstStep;
