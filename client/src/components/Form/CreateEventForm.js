import React from 'react';
import ReactWizard from 'react-bootstrap-wizard';
import { Container, Row, Col } from 'reactstrap';
import FirstStep from './CreateEventSteps/Step1';
import SecondStep from './CreateEventSteps/Step2';

class ThirdStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: 'third step here'
    };
  }

  render() {
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
          <strong>Max Attendees: </strong>
          {this.props.wizardData.settings ? this.props.wizardData.settings.maxAttendees : null}
        </p>
        <p>
          <strong>Preference: </strong>
          {this.props.wizardData.settings ? this.props.wizardData.settings.preference : null}
        </p>
        <p>
          <strong>Event Name: </strong>
          {this.props.wizardData.eventData.name}
        </p>
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
  { stepName: 'settings', stepIcon: 'tim-icons icon-settings-gear-63', component: FirstStep },
  { stepName: 'description', stepIcon: 'tim-icons icon-pencil', component: SecondStep },
  { stepName: 'confirm', stepIcon: 'tim-icons icon-check-2', component: ThirdStep }
];
class CreateEventForm extends React.Component {
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
              finishButtonClick={e => this.props.finishButtonClick(e)}
              wizardData={{ eventData: this.props.eventData }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CreateEventForm;
