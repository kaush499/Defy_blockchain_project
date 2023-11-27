import React, { Component } from 'react'
import farmer from '../farmer.png'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

class NavbarHeader extends Component {

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">DeFy Loan Cryptocurrency</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <span className="font-weight-bold">{this.props.account}</span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }



}

export default NavbarHeader;