import React from 'react';
import ReactWizard from 'react-bootstrap-wizard';
import { Container, Row, Col } from 'reactstrap';


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
      </div>
    );
  }
}

const steps = [
  { stepName: 'settings', stepIcon: 'tim-icons icon-settings-gear-63', component: },
  { stepName: 'description', stepIcon: 'tim-icons icon-pencil', component:  },
  { stepName: 'confirm', stepIcon: 'tim-icons icon-check-2', component: ThirdStep }
];
class ProfileForm extends React.Component {
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

export default ProfileForm;
