import React from 'react';
import { Nav, Navbar, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import './index.css';

export default (props) => (
  <Navbar color="dark" className="hg-sidebar holy-grail-sidebar-1">
    <Nav className="navbar text-light navbar-expand-lg" vertical>
      <Link className="navbar-brand" to="#">Issue Tracker</Link>
      <NavItem>
        <Link className="nav-link" to="#">Hello World</Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="#">Hello World</Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="#">Hello World</Link>
      </NavItem>
    </Nav>
  </Navbar>
);
