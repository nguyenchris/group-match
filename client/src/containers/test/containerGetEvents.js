import React, { Component } from 'react';
import axios from 'axios';
import EventCard from '../../components/EventCard/EventCard';
import { connect } from 'react-redux';

class DevContainerEvents extends Component {
  state = {
    events: []
  };
  componentDidMount() {
    axios
      .get('/api/event/dev', { headers: { Authorization: `Bearer ${this.props.token}` } })
      .then(result => {
        this.setState({
          events: result.data.events
        });
      })
      .catch(err => {
        if (err) throw err;
        console.log(err);
      });
  }
  render() {
    const searchedEvents = this.state.events.map((event, index) => {
      if (event) {
        return <EventCard eventData={event} key={event.id} {...event} {...this.props} />;
      }
    });
    return <div className="content">{searchedEvents}</div>;
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
