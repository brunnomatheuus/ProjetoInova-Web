import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import HeaderLinks from "./HeaderLinks.jsx";

import routes from "routes/routes.jsx";

class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  getBrand() {
    var name;
    routes.map((prop, key) => { 
      if(!prop.routes) {
        if (prop.path === this.props.location.pathname) {
          name = prop.name;
        }
      }
      else if(prop.routes){
        prop.routes.map((props, key) => {
          if (prop.path + props.path === this.props.location.pathname) {
            name = props.name;
          }
          return name;
        })
      }

      return name;
    });
    return name;




    
  }
  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <span>{this.getBrand()}</span>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <HeaderLinks />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
