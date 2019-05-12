import React, { Component } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
  Row,
  Col,
  CardText
} from 'reactstrap';
import Interweave from 'interweave';
import { Link } from 'react-router-dom';
class ModalMeetupDetails extends Component {
  state = {
    isOpen: false,
    eventDescription: null,
    horizontalTabs: 'profile',
    verticalTabs: 'profile',
    verticalTabsIcons: 'general',
    pageTabs: 'general'
  };

  // componentDidMount() {
  //   this.setState({
  //     eventDescription: this.props.description.html
  //   });
  // }

  changeActiveTab = (e, tabState, tabName) => {
    e.preventDefault();
    this.setState({
      [tabState]: tabName
    });
  };
  render() {
    let attendees = 'No Attendees yet.';
    if (this.props.meetup.attendees.length > 0) {
      attendees = this.props.meetup.attendees.map((attendee, i) => {
        let name = attendee.name;
        if (attendee._id === this.props.userId) {
          name = 'You';
        }
        let user = <Link to={{ pathname: `/user/profile/${attendee._id}` }}>{name}</Link>;
        return (
          <li className="list-inline-item" key={i}>
            {user}
          </li>
        );
      });
    }
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        modalClassName="modal-black modal-long"
        // modalClassName="modal-long"
        size="lg"
        scrollable={true}
      >
        <div className="modal-header modal-details-header justify-content-center">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={this.props.toggle}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
        <ModalBody>
          <Card className="card-plain">
            <CardHeader>
              <CardTitle className="text-center mt-1" tag="h3">
                {this.props.meetup.name}
              </CardTitle>
              <img src={this.props.hdImage} alt={this.props.name} />
            </CardHeader>
            <CardBody>
              <Nav className="nav-pills-info justify-content-center" pills>
                <NavItem>
                  <NavLink
                    data-toggle="tab"
                    href="#"
                    className={this.state.pageTabs === 'general' ? 'active' : ''}
                    onClick={e => this.changeActiveTab(e, 'pageTabs', 'general')}
                  >
                    General
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    data-toggle="tab"
                    href="#"
                    className={this.state.pageTabs === 'description' ? 'active' : ''}
                    onClick={e => this.changeActiveTab(e, 'pageTabs', 'description')}
                  >
                    Description
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent className="tab-space tab-subcategories" activeTab={this.state.pageTabs}>
                <TabPane tabId="general">
                  <Row>
                    <Col>
                      <Card className="card-plain">
                        <CardTitle tag="h3" className="text-center">
                          Event Details
                        </CardTitle>
                        <CardBody>
                          <CardText>
                            <a href={this.props.url} target="_blank" rel="noopener noreferrer">
                              Event Link
                            </a>
                          </CardText>
                          <CardTitle>
                            <span className="meetup-label">Category: </span>
                            {this.props.category.name}
                          </CardTitle>
                          <CardTitle>
                            <span className="meetup-label">Type: </span>
                            {this.props.format.name}
                          </CardTitle>
                          <CardTitle>
                            <span className="meetup-label">Organizer </span>
                            {this.props.name}
                          </CardTitle>
                          <CardTitle>
                            <span className="meetup-label">Venue: </span> {this.props.venue.name}
                          </CardTitle>
                          <CardTitle>
                            <span className="meetup-label">Address: </span>
                            {this.props.venue.address.localized_address_display}
                          </CardTitle>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col>
                      <CardTitle tag="h3" className="text-center">
                        Meetup Details
                      </CardTitle>
                      <CardTitle>
                        <strong className="meetup-label">Name: </strong>
                        {this.props.meetup.name}
                      </CardTitle>
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
                        <strong className="meetup-label">Description: </strong>
                        {this.props.meetup.description}
                      </CardTitle>
                      <CardTitle>
                        <strong className="meetup-label">Max Allowed Attendees: </strong>
                        {this.props.meetup.maxAttendees}
                      </CardTitle>
                      <CardTitle>
                        <strong className="meetup-label">Current Amount of Attendees: </strong>
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
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="description">
                  <Interweave content={this.props.description.html} />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter />
      </Modal>
    );
  }
}

export default ModalMeetupDetails;
