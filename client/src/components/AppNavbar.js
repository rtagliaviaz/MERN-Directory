import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';

class AppNavbar extends React.Component {
    state = {
      isOpen: false
    }

    toggle = ()  => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    render() {
      return(
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <div className="container">
            <NavbarBrand href="/">Directorio</NavbarBrand>
            <NavbarToggler Onclick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/rtagliaviaz">github</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
    }

}


export default AppNavbar;
