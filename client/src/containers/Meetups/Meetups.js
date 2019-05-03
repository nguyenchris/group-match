import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import MeetupCard from '../../components/MeetupCard/MeetupCard';

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
        console.log(result.data.meetups);
        this.setState({
          meetups: result.data.meetups
        });
      })
      .catch(err => {
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
                <MeetupCard key={meetup._id} meetup={meetup} id={meetup._id} />
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
