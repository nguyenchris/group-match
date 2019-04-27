import React from 'react';
import ReactWizard from 'react-bootstrap-wizard';
import { Container, Row, Col, Input } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'react-bootstrap-wizard/dist/react-wizard.scss';
// import AsyncSelect from 'react-select/lib/Async';

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstStep: 'first step here'
    };
  }
  render() {
    return (
      <div>
        <Input />
      </div>
    );
  }
}
class SecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondStep: 'second step here'
    };
  }
  isValidated() {
    // do some validations
    // decide if you will
    return true;
    // or you will
    // return false;
  }
  render() {
    return <div>Hey from Second</div>;
  }
}
class ThirdStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thirdStep: 'third step here'
    };
  }
  render() {
    return <div>Hey from Third</div>;
  }
}

var steps = [
  // this step hasn't got a isValidated() function, so it will be considered to be true
  { stepName: 'First', stepIcon: 'tim-icons icon-single-02', component: FirstStep },
  // this step will be validated to false
  { stepName: 'Second', component: SecondStep },
  // this step will never be reachable because of the seconds isValidated() steps function that will always return false
  { stepName: 'Third', component: ThirdStep }
];

class CreateEventForm extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Container fluid>
        <Row>
          <Col xs={12} md={8} className="mr-auto ml-auto">
            <ReactWizard
              steps={steps}
              navSteps
              title={`Meetup for ${this.props.eventData.name}`}
              description={`Go ahead and fill out this form in order to create your meetup. You're just moments away from creating your next new experience!`}
              headerTextCenter
              validate
              color="primary"
              progressbar={true}
              finishButtonClick={e => this.finishButtonClick(e, this.props.closeModal)}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CreateEventForm;
