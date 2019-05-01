import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import ModalEvent from '../../components/Modal/ModalEvent';

class DevContainerEvents extends Component {
  state = {
    meetups: [],
    isModalCreateOpen: false,
    isModalDetailsOpen: false
  };
  componentDidMount() {
    axios
      .get('/api/event/', { headers: { Authorization: `Bearer ${this.props.token}` } })
      .then(result => {
        this.setState({
          meetups: result.data.meetups
        });
      })
      .catch(err => {
        // if (err) throw err;
        console.log(err);
      });
  }

  toggleModalCreate = () => {
    this.setState(prevState => ({
      ...prevState,
      isModalCreateOpen: !prevState.isModalCreateOpen
    }));
  };
  toggleModalDetails = () => {
    this.setState(prevState => ({
      ...prevState,
      isModalDetailsOpen: !prevState.isModalDetailsOpen
    }));
  };

  render() {
    return (
      <div className="content">
        <Row>
          {this.state.meetups.length > 0
            ? this.state.meetups.map(meetup => (
                <div className="event-card-wrapper">
                  <Card className="event-card card-plain">
                    <CardImg top src={meetup.event.lowImage} alt="..." />
                    <CardBody>
                      <CardTitle>Meetup Name: {meetup.name}</CardTitle>
                      <CardTitle>
                        Creator:{' '}
                        <Link to={{ pathname: '/user/profile', user: meetup.creator }}>
                          {meetup.creator.name}
                        </Link>
                      </CardTitle>
                      <CardTitle>Meetup Description: {meetup.description}</CardTitle>
                      <CardTitle>Max allowed attendees: {meetup.maxAttendees}</CardTitle>
                      <CardTitle>Current amount of attendees: {meetup.attendees.length}</CardTitle>
                      <CardTitle>Event: {meetup.event.name}</CardTitle>
                      <CardText>
                        Time: {meetup.event.start.timeDisplay} - {meetup.event.end.timeDisplay}
                      </CardText>
                      <Button color="secondary" name="info" onClick={this.toggleModalDetails}>
                        Details
                      </Button>
                      {this.state.isModalDetailsOpen ? (
                        <ModalEvent
                          isOpen={this.state.isModalDetailsOpen}
                          toggle={this.toggleModalDetails}
                          {...meetup.event}
                        />
                      ) : null}
                      <Button color="secondary" name="create" onClick={e => e.preventDefault()}>
                        Request Join
                      </Button>
                    </CardBody>
                    {/* {this.state.notification ? ( */}
                    {/* <NotificationAlertPopUp message={this.state.notification} />
            ) : null} */}
                  </Card>
                </div>
              ))
            : 'No Meetups'}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token
  };
};
export default connect(
  mapStateToProps,
  null
)(DevContainerEvents);
