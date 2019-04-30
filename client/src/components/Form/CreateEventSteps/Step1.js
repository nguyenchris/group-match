import React, { Fragment } from 'react';
import { Row, Col, Input, FormGroup, Label } from 'reactstrap';

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preference: '',
      maxAttendees: '',
      numberState: '',
      radioState: ''
    };
  }
  handleInput = e => {
    const { name, value } = e.target;
    if (name === 'number') {
      const isValid = this.verifyNumber(value);
      if (!isValid && value.length !== 0) {
        return this.setState({
          numberState: 'has-danger',
          maxAttendees: value
        });
      } else if (!isValid && value.length === 0) {
        return this.setState({
          numberState: '',
          maxAttendees: value
        });
      } else {
        return this.setState({
          numberState: 'has-success',
          maxAttendees: value
        });
      }
    }
    this.setState({
      ...this.state,
      [name]: value,
      radioState: 'has-success'
    });
  };

  isValidated() {
    if (
      this.state.numberState === 'has-success' &&
      this.state.preference &&
      this.state.radioState === 'has-success'
    ) {
      return true;
    } else {
      if (this.state.radioState !== 'has-success') {
        this.setState({
          radioState: 'has-danger'
        });
      }
      if (this.state.numberState !== 'has-success') {
        this.setState({
          numberState: 'has-danger'
        });
      }
      return false;
    }
  }

  verifyNumber = e => {
    if (e < 1) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <Fragment>
        <h5 className="info-text">Set your preferences </h5>
        <Row className="justify-content-center mt-2">
          <Col sm="6">
            <p>Looking For:</p>
            <FormGroup check className="form-check-radio">
              <Label check>
                <Input
                  defaultValue="Friends"
                  id="preference"
                  name="preference"
                  type="radio"
                  onChange={this.handleInput}
                />
                <span className="form-check-sign" />
                Friends
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-radio">
              <Label check>
                <Input
                  defaultValue="Relationship"
                  id="preference"
                  name="preference"
                  type="radio"
                  onChange={this.handleInput}
                />
                <span className="form-check-sign" />
                Relationship
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-radio">
              <Label check>
                <Input
                  defaultValue="No Preference"
                  id="preference"
                  name="preference"
                  type="radio"
                  onChange={this.handleInput}
                />
                <span className="form-check-sign" />
                No Preference
              </Label>
            </FormGroup>
            {this.state.radioState === 'has-danger' ? (
              <label className="error text-danger">Please select an option!</label>
            ) : null}
          </Col>
          <Col sm="6">
            <p>Max Attendees:</p>
            <FormGroup>
              <Input
                name="number"
                id="maxAttendees"
                type="number"
                placeholder="Enter max amount of people"
                onChange={this.handleInput}
                value={this.state.maxAttendees}
              />
              {this.state.numberState === 'has-danger' ? (
                <label className="error text-danger">Please enter a valid max amount!</label>
              ) : null}
            </FormGroup>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default FirstStep;
