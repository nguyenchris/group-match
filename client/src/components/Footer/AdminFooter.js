/*eslint-disable*/
import React from 'react';

// reactstrap components
import { Container, Row, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

class AdminFooter extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink href="javascript:void(0)">Group Match</NavLink>
            </NavItem>
          </Nav>
          <div className="copyright">
            © {new Date().getFullYear()} made with <i className="tim-icons icon-heart-2" /> by{' '}
            <a href="https://github.com/nguyenchris" rel="noopener noreferrer" target="_blank">
              Chris Nguyen
            </a>
            {', '}
            <a href="https://github.com/DanielLott" rel="noopener noreferrer" target="_blank">
              Dan Lott
            </a>
            {', '}
            <a href="https://github.com/DylanBarton1856" rel="noopener noreferrer" target="_blank">
              Dylan Barton
            </a>
          </div>
        </Container>
      </footer>
    );
  }
}

export default AdminFooter;
