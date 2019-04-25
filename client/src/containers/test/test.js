import React from 'react';
import ReactWizard from 'react-bootstrap-wizard';
import { Container, Row, Col, Input, Card, CardBody, FormGroup } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'react-bootstrap-wizard/dist/react-wizard.scss';
import AsyncSelect from 'react-select/lib/Async';
import { getLocations } from '../../utils/api';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNocmlzbmd1eWVuYXpAZ21haWwuY29tIiwidXNlcklkIjoiNWNiNDZjNGM0MDhlZmZhN2NmMTZkNzBmIiwiaWF0IjoxNTU2MTg5NTI2LCJleHAiOjE1NTYxOTMxMjZ9.ww1xtOwmn3vbapVPyxSKACzUeNj5H1VIaG7nwyZDo8k';

const locationOptions = inputValue => {
  // return new Promise(resolve => {
  return getLocations(inputValue, token).then(result => {
    console.log(result.data.locations);
    return result.data.locations;
  });
  // });
};

class WizardExample extends React.Component {
  state = {
    // location: {
    //   value: ''
    // }
    location: ''
  };

  handleInput = value => {
    console.log(value.value);
    // this.setState({
    //   inputValue: value
    // });
  };

  handleValue = value => {
    console.log(value);
    this.setState({
      // ...this.state,
      location: value
    });
  };

  getCurrentLocation = e => {
    e.preventDefault();
    this.setState({
      location: { value: 'ya', label: 'Current Location' }
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="content">
        <Row>
          <Col md={4}>
            <Card>
              <CardBody>
                <FormGroup className="location-search">
                  <AsyncSelect
                    className="react-select info"
                    classNamePrefix="react-select"
                    blurInputOnSelect={true}
                    // isClearable={true}
                    onChange={this.handleValue}
                    defaultOptions
                    placeholder={'Location'}
                    openMenuOnClick={false}
                    loadOptions={locationOptions}
                    value={this.state.location}
                    name="location"
                    noOptionsMessage={() => 'No locations found'}
                  />
                  <i
                    className="fas fa-location-arrow current-location"
                    alt="Current Location"
                    onClick={e => this.getCurrentLocation(e)}
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

// class FirstStep extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstStep: 'first step here'
//     };
//   }
//   render() {
//     return (
//       <div>
//         <Input />
//       </div>
//     );
//   }
// }
// class SecondStep extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       secondStep: 'second step here'
//     };
//   }
//   isValidated() {
//     // do some validations
//     // decide if you will
//     return true;
//     // or you will
//     // return false;
//   }
//   render() {
//     return <div>Hey from Second</div>;
//   }
// }
// class ThirdStep extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       thirdStep: 'third step here'
//     };
//   }
//   render() {
//     return <div>Hey from Third</div>;
//   }
// }

// var steps = [
//   // this step hasn't got a isValidated() function, so it will be considered to be true
//   { stepName: 'First', stepIcon: 'tim-icons icon-single-02', component: FirstStep },
//   // this step will be validated to false
//   { stepName: 'Second', component: SecondStep },
//   // this step will never be reachable because of the seconds isValidated() steps function that will always return false
//   { stepName: 'Third', component: ThirdStep }
// ];

// class WizardExample extends React.Component {
//   finishButtonClick = (allStates, callback) => {
//     console.log(allStates);
//     // Callback is the paramter to close the modal
//     callback();
//   };
//   render() {
//     console.log(this.props);
//     return (
//       <Container fluid>
//         <Row>
//           <Col xs={12} md={8} className="mr-auto ml-auto">
//             <ReactWizard
//               steps={steps}
//               navSteps
//               title="react-wizard"
//               description="This will help you split a complicated flow or a complicated form in multiple steps."
//               headerTextCenter
//               validate
//               color="primary"
//               progressbar={true}
//               finishButtonClick={e => this.finishButtonClick(e, this.props.closeModal)}
//             />
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }

export default WizardExample;
