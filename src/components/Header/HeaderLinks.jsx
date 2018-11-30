import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {logout} from "../../services/auth.js";

class HeaderLinks extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = (e) => {
    e.preventDefault();
    logout();
  
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <Nav pullRight>
          <NavItem onClick={this.handleLogout}>
            Sair
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default withRouter(HeaderLinks);
