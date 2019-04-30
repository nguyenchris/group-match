import React, { Fragment } from 'react';
import { Input, FormGroup, Label } from 'reactstrap';

class SecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      descriptionState: '',
      meetupName: '',
      meetupNameState: ''
    };
  }

  handleInput = e => {
    const { value, id } = e.target;
    this.setState({
      [id]: value,
      [id + 'State']: 'has-success'
    });
  };

  isValidated() {
    if (this.state.description.length >= 1 && this.state.meetupName.length >= 1) {
      return true;
    } else {
      if (this.state.description.length < 6) {
        this.setState({
          descriptionState: 'has-danger'
        });
      }
      if (this.state.meetupName.length < 1) {
        this.setState({
          meetupNameState: 'has-danger'
        });
      }
      return false;
    }
  }
  render() {
    return (
      <Fragment>
        <FormGroup>
          <Label for="meetupName">Meetup Name</Label>

          <Input
            type="text"
            id="meetupName"
            onChange={this.handleInput}
            placeholder="Enter name of meetup"
          />
          {this.state.meetupNameState === 'has-danger' ? (
            <label className="error text-danger">Please enter a name.</label>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label for="description">
            Please provide a brief description why you're creating this meetup.
          </Label>
          <Input
            type="textarea"
            name="text"
            id="description"
            onChange={this.handleInput}
            placeholder="Enter description"
          />
          {this.state.descriptionState === 'has-danger' ? (
            <label className="error text-danger">
              Description must be at least 5 characters long.
            </label>
          ) : null}
        </FormGroup>
      </Fragment>
    );
  }
}

export default SecondStep;
