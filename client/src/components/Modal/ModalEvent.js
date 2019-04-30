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
  NavLink
} from 'reactstrap';
// import { Link } from 'react-router-dom';
import Interweave from 'interweave';

class ModalEvent extends Component {
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

  changeActiveTab = (e, tabState, tadName) => {
    e.preventDefault();
    this.setState({
      [tabState]: tadName
    });
  };
  render() {
    console.log(this.props.eventData);
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
              <CardTitle className="text-center mt-1" tag="h4">
                {this.props.name}
              </CardTitle>
              <img src={this.props.hdImage} alt={this.props.name} />
            </CardHeader>
            <CardBody>
              {/* color-classes: "nav-pills-primary", "nav-pills-info", "nav-pills-success", "nav-pills-warning","nav-pills-danger" */}
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
                  <div>
                    <a href={this.props.url} target="_blank" rel="noopener noreferrer">
                      Event Link
                    </a>
                  </div>
                  <div>Category: {this.props.category.name}</div>
                  <div>Event Type: {this.props.format.name}</div>
                  <div>Organizer: {this.props.name}</div>
                  <div>Venue: {this.props.venue.name}</div>
                  <div>Address: {this.props.venue.address.localized_address_display}</div>
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

export default ModalEvent;
