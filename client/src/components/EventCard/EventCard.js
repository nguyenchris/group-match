import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Col } from 'reactstrap';
import './EventCard.css';
import ModalForm from '../../components/Modal/ModalForm';
import ModalEvent from '../../components/Modal/ModalEvent';

class EventCard extends Component {
  state = {
    isModalCreateOpen: false,
    isModalDetailsOpen: false
  };

  toggleModalCreate = () => {
    this.setState(prevState => ({
      isModalCreateOpen: !prevState.isModalCreateOpen
    }));
  };

  toggleModalDetails = () => {
    this.setState(prevState => ({
      isModalDetailsOpen: !prevState.isModalDetailsOpen
    }));
  };

  render() {
    return (
      <div className="event-card-wrapper">
        <Card className="event-card">
          <CardImg top src={this.props.lowImage} alt="..." />
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardText>{this.props.summary}</CardText>
            <CardText>Start: {this.props.start.timeDisplay}</CardText>
            <CardText>End: {this.props.end.timeDisplay}</CardText>
            <Button color="secondary" name="info" onClick={this.toggleModalDetails}>
              Details
            </Button>
            <ModalEvent
              isOpen={this.state.isModalDetailsOpen}
              toggle={this.toggleModalDetails}
              {...this.props}
            />
            <Button color="secondary" name="create" onClick={this.toggleModalCreate}>
              Create Meetup
            </Button>
            <ModalForm
              isOpen={this.state.isModalCreateOpen}
              toggle={this.toggleModalCreate}
              {...this.props}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default EventCard;
