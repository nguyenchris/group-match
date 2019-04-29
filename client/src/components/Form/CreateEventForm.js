import React, { Fragment } from 'react';
import ReactWizard from 'react-bootstrap-wizard';
import {
  Container,
  Row,
  Col,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  FormGroup,
  Label
} from 'reactstrap';
import classnames from 'classnames';
import Select from 'react-select';
import { postCreateEvent } from '../../utils/api';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'react-bootstrap-wizard/dist/react-wizard.scss';
// import AsyncSelect from 'react-select/lib/Async';

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
    console.log(value);
    console.log(name);
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
    console.log(value);
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
    console.log(this.props);
    return (
      <Fragment>
        <h5 className="info-text">Set your preferences </h5>
        <Row className="justify-content-center mt-2">
          <Col sm="6">
            <p>Looking For:</p>
            <FormGroup check className="form-check-radio">
              <Label check>
                <Input
                  defaultValue="friends"
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
                  defaultValue="relationship"
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
                  defaultValue="both"
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
      if (this.state.description.length < 1) {
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
        {/* <h5 className="info-text">Please provide a brief description about your meetup.</h5> */}
        <FormGroup>
          <Label for="meetupName">Meetup Name</Label>

          <Input
            type="text"
            id="meetupName"
            onChange={this.handleInput}
            placeholder="Enter name of meetup"
          />
          {this.state.meetupNameState === 'has-danger' ? (
            <label className="error text-danger">Please enter a name!</label>
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
            <label className="error text-danger">Please enter a description!</label>
          ) : null}
        </FormGroup>
      </Fragment>
    );
  }
}
class ThirdStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: 'third step here'
    };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h5 className="info-text">Please confirm your Meetup</h5>
        <p>
          <strong>Meetup Name:</strong>{' '}
          {this.props.wizardData.description ? this.props.wizardData.description.meetupName : null}
        </p>
        <p>
          <strong>Meetup Description: </strong>
          {this.props.wizardData.description ? this.props.wizardData.description.description : null}
        </p>
        <p>
          <strong>Event Name: </strong>
          {this.props.wizardData.eventData.name}
        </p>
        {/* Event Name: {this.props.wizardData.eventData.name} */}
        <p>
          <strong> When: </strong>
          {`${this.props.wizardData.eventData.start.timeDisplay} - ${
            this.props.wizardData.eventData.end.timeDisplay
          }`}
        </p>
        <p>
          <strong>Category: </strong>
          {this.props.wizardData.eventData.category.name}
        </p>
        <p>
          <strong>Type: </strong>
          {this.props.wizardData.eventData.format.name}
        </p>
      </div>
    );
  }
}

const steps = [
  // this step hasn't got a isValidated() function, so it will be considered to be true
  { stepName: 'settings', stepIcon: 'tim-icons icon-settings-gear-63', component: FirstStep },
  // this step will be validated to false
  { stepName: 'description', stepIcon: 'tim-icons icon-pencil', component: SecondStep },
  // this step will never be reachable because of the seconds isValidated() steps function that will always return false
  { stepName: 'confirm', stepIcon: 'tim-icons icon-check-2', component: ThirdStep }
];
// {this.props.eventData.name}
class CreateEventForm extends React.Component {
  finishButtonClick = e => {
    const { description, eventData, settings } = e;
    console.log(description);
    console.log(eventData);
    console.log(settings);
    const data = {
      name: description.meetupName,
      description: description.description,
      maxAttendees: settings.maxAttendees,
      preference: settings.preference,
      eventData: eventData
    };
    postCreateEvent(data, this.props.token)
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log(err.data);
      });
  };
  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={12} md={12} className="mr-auto ml-auto">
            <ReactWizard
              steps={steps}
              navSteps
              title={`Meetup Creation Form`}
              description={`${this.props.eventData.name}`}
              headerTextCenter
              validate
              progressbar={true}
              color="blue"
              finishButtonClasses="btn-wd btn-success"
              nextButtonClasses="btn-wd btn-info"
              previousButtonClasses="btn-wd"
              finishButtonClick={e => this.finishButtonClick(e)}
              wizardData={{ eventData: this.props.eventData }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CreateEventForm;
