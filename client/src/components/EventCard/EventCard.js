import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import './EventCard.css';
import ModalForm from '../../components/Modal/ModalForm';
import ModalEvent from '../../components/Modal/ModalEvent';

class EventCard extends Component {
  state = {
    isModalCreateOpen: false,
    isModalDetailsOpen: false
  };

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

  render() {
    return (
      <div className="event-card-wrapper">
        <Card className="event-card card-plain">
          <CardImg top src={this.props.lowImage} alt="..." />
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardText>{this.props.summary}</CardText>
            <CardText>Start: {this.props.start.timeDisplay}</CardText>
            <CardText>End: {this.props.end.timeDisplay}</CardText>
            <Button color="secondary" name="info" onClick={this.toggleModalDetails}>
              Details
            </Button>
            {this.state.isModalDetailsOpen ? (
              <ModalEvent
                isOpen={this.state.isModalDetailsOpen}
                toggle={this.toggleModalDetails}
                {...this.props}
              />
            ) : null}
            <Button color="secondary" name="create" onClick={this.toggleModalCreate}>
              Create Meetup
            </Button>
            {this.state.isModalCreateOpen ? (
              <ModalForm
                isOpen={this.state.isModalCreateOpen}
                toggle={this.toggleModalCreate}
                {...this.props}
              />
            ) : null}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default EventCard;
