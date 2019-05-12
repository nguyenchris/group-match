import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ModalEvent from '../../components/Modal/ModalEvent';
import { joinMeetup } from '../../utils/api';
import ModalMeetupDetails from '../Modal/ModalMeetupUsers';
import NotificationAlertPopUp from '../NotificationAlert/NotificationAlertPopUp';
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
        const newAttendees = data.meetup.attendees;
        this.setState(prevState => ({
          ...prevState,
          attendees: newAttendees
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let attendees = 'No Attendees yet.';
    if (this.state.attendees.length > 0) {
      attendees = this.state.attendees.map((attendee, i) => {
        let user = <Link to={{ pathname: `/user/profile/${attendee._id}` }}>{attendee.name}</Link>;
        return (
          <li className="list-inline-item" key={i}>
            {user}
          </li>
        );
      });
    }

    const isJoined = this.state.attendees.some(attendee => attendee._id === this.props.userId);

    if (this.state.attendees.length >= parseInt(this.props.meetup.maxAttendees)) {
    }

    return (
      <div className="event-card-wrapper meetup-wrapper">
        <CardTitle tag="h2" className="text-center">
          {this.props.meetup.name}
        </CardTitle>
        <Card className="event-card card-plain meetup-card">
          <CardImg top src={this.props.meetup.event.lowImage} alt="..." />
          <CardBody>
            <CardTitle>
              <strong className="meetup-label">Creator: </strong>
              <Link
                to={{
                  pathname: `/user/profile/${this.props.meetup.creator._id}`
                }}
              >
                {this.props.meetup.creator.name}
              </Link>
            </CardTitle>
            <CardTitle>
              <strong className="meetup-label">Event: </strong>
              {this.props.meetup.event.name}
            </CardTitle>
            <CardTitle>
              <strong className="meetup-label">Meetup Description: </strong>
              {this.props.meetup.description}
            </CardTitle>
            <CardTitle>
              <strong className="meetup-label">Max Allowed Attendees: </strong>
              {this.props.meetup.maxAttendees}
            </CardTitle>
            <CardTitle>
              <strong className="meetup-label">Current amount of attendees: </strong>
              {this.props.meetup.attendees.length}
            </CardTitle>

            <CardTitle>
              <strong className="meetup-label">Time: </strong>
              {this.props.meetup.event.start.timeDisplay} -{' '}
              {this.props.meetup.event.end.timeDisplay}
            </CardTitle>
            <CardTitle>
              <strong className="meetup-label">Users Joining: </strong>
              <ul className="list-inline">{attendees}</ul>
            </CardTitle>
            <Button
              color="twitter"
              className="btn-simple"
              name="info"
              onClick={this.toggleModalDetails}
            >
              Details
            </Button>
            {this.state.isModalDetailsOpen ? (
              <ModalMeetupDetails
                isOpen={this.state.isModalDetailsOpen}
                toggle={this.toggleModalDetails}
                meetup={this.props.meetup}
                userId={this.props.userId}
                {...this.props.meetup.event}
              />
            ) : null}
            {this.props.userId !== this.props.meetup.creator._id ? (
              this.state.attendees.length >= parseInt(this.props.meetup.maxAttendees) ? (
                <Button color="twitter" className="btn-simple" disabled={!isJoined}>
                  {isJoined ? 'Leave' : 'Meetup Full'}
                </Button>
              ) : (
                <Button
                  color="twitter"
                  className="btn-simple"
                  name="create"
                  onClick={e => this.handleJoin(e)}
                >
                  {isJoined ? 'Leave' : 'Join'}
                </Button>
              )
            ) : null}
            {/* {this.state.attendees.length >= parseInt(this.props.meetup.maxAttendees) ? (
              <Button color="twitter" className="btn-simple" disabled={!isJoined}>
                {isJoined ? 'Leave' : 'Meetup Full'}
              </Button>
            ) : (
              <Button
                color="twitter"
                className="btn-simple"
                name="create"
                onClick={e => this.handleJoin(e)}
              >
                {isJoined ? 'Leave' : 'Join'}
              </Button>
            )} */}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default MeetupCard;
