import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';

import ModalEvent from '../../components/Modal/ModalEvent';

import { Link } from 'react-router-dom';
import { joinMeetup } from '../../utils/api';
class MeetupCard extends Component {
  state = {
    isModalCreateOpen: false,
    isModalDetailsOpen: false,
    notification: '',
    attendees: []
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      attendees: this.props.meetup.attendees
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) {
      return true;
    }
    return false;
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

  timeoutNotifcationAlert = () => {
    setTimeout(() => {
      this.setState({
        ...this.state,
        notification: ''
      });
    }, 4000);
  };

  handleJoin = e => {
    e.preventDefault();
    joinMeetup(this.props.id, this.props.token)
      .then(({ data }) => {
        // this.setState(prevState => ({
        //   ...prevState,
        //   attendees: data.meetup.attendees
        // }));
        console.log(data.meetup);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let attendees = this.state.attendees.map((attendee, i) => {
      if (attendee) {
        return <p key={i}>{attendee.name}</p>;
      }
      return;
    });
    return (
      <div className="event-card-wrapper">
        <Card className="event-card card-plain">
          <CardImg top src={this.props.meetup.event.lowImage} alt="..." />
          <CardBody>
            <CardTitle>Meetup Name: {this.props.meetup.name}</CardTitle>
            <CardTitle>
              Creator:{' '}
              <Link
                to={{
                  pathname: `/user/profile/${this.props.meetup.creator._id}`
                }}
              >
                {this.props.meetup.creator.name}
              </Link>
            </CardTitle>
            <CardTitle>Meetup Description: {this.props.meetup.description}</CardTitle>
            <CardTitle>Max allowed attendees: {this.props.meetup.maxAttendees}</CardTitle>
            <CardTitle>Current amount of attendees: {this.props.meetup.attendees.length}</CardTitle>
            <CardTitle>Event: {this.props.meetup.event.name}</CardTitle>
            <CardText>
              Time: {this.props.meetup.event.start.timeDisplay} -{' '}
              {this.props.meetup.event.end.timeDisplay}
            </CardText>
            <CardText>
              Users joining: {this.state.attendees.length > 0 ? attendees : 'No Attendees yet.'}
            </CardText>
            <Button color="secondary" name="info" onClick={this.toggleModalDetails}>
              Details
            </Button>
            {this.state.isModalDetailsOpen ? (
              <ModalEvent
                isOpen={this.state.isModalDetailsOpen}
                toggle={this.toggleModalDetails}
                {...this.props.meetup.event}
              />
            ) : null}
            <Button color="secondary" name="create" onClick={e => this.handleJoin(e)}>
              Join
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default MeetupCard;
