import React from 'react';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./Components.css"

const NavBar = () => {

    return (
        <Navbar expand="lg" className="sticky-nav nav">
          <Navbar.Brand href="#">
          <i class="fa-solid fa-envelope"></i>
                Inkwell
            </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/logout">Logout</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
}


export default NavBar;