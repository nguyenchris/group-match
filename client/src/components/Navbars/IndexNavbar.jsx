import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from 'reactstrap';

class ComponentsNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: 'navbar-transparent'
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.changeColor);
    console.log(this.props);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.changeColor);
  }
  changeColor = () => {
    if (document.documentElement.scrollTop > 99 || document.body.scrollTop > 99) {
      this.setState({
        color: 'bg-info'
      });
    } else if (document.documentElement.scrollTop < 100 || document.body.scrollTop < 100) {
      this.setState({
        color: 'navbar-transparent'
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle('nav-open');
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: 'collapsing-out'
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ''
    });
  };
  scrollToDownload = () => {
    document.getElementById('download-section').scrollIntoView({ behavior: 'smooth' });
  };
  render() {
    return (
      <Navbar className={'fixed-top ' + this.state.color} color-on-scroll="100" expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              to="/"
              rel="noopener noreferrer"
              title="Designed and Coded by Creative Tim"
              tag={Link}
            >
              <span>Group </span>
              Match
            </NavbarBrand>
            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={'justify-content-end ' + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                </Col>
                <Col className="collapse-close text-right">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <i className="fa fa-cogs d-lg-none d-xl-none" />
                  Account
                </DropdownToggle>
                <DropdownMenu className="dropdown-with-icons">
                  <DropdownItem tag={Link} to="/login">
                    <i className="tim-icons icon-single-02" />
                    Login
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/signup">
                    <i className="tim-icons icon-bullet-list-67" />
                    Sign Up
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default ComponentsNavbar;
