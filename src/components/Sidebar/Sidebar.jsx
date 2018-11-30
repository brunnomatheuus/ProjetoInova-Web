import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

import HeaderLinks from "../Header/HeaderLinks.jsx";

import imagine from "assets/img/IMD_fachada.jpg";
import logo from "assets/img/LOGO_Inova-04.png";

import {Collapse} from "react-bootstrap"

import routes from "routes/routes.jsx";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      activeTab: new Map(),
    };
  }

  toogle(tab){
    this.state.activeTab.set(tab, !this.state.activeTab.get(tab));
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  handleChange(index) {
    var newActiveTab = this.state.activeTab.map()
    newActiveTab[index] = false
    this.setState({activeTab: newActiveTab})
  }
  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + imagine + ")"
    };
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color="black"
        data-image={imagine}
      >
        <div className="sidebar-background" style={sidebarBackground} />
        <div className="logo">
          <div className="logo-img" style={{width:'14em', marginBottom:'1em'}}>
            <img src={logo} alt="logo_image" height="35" />
          </div>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <HeaderLinks /> : null}
            {routes.map((prop, key) => {
              if (!prop.redirect){
                return (
                  <li
                    className={
                      !prop.routes
                      ? this.activeRoute(prop.path)
                      : ""
                    }
                    key={key}

                    
                  >
                    { !prop.routes ? 
                    ( <NavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="active"
                      >
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </NavLink>
                    ) 
                    : 
                    (
                      <Link to={this.props.history.location}>
                        <i className={prop.icon} />
                        <p onClick={() => this.toogle(key)}>{prop.name}<b className="caret"></b></p>
                        
                        <Collapse in={this.state.activeTab.get(key)}>
                          <ul className="nav">
                            {prop.routes.map((props, key) => {
                              return (
                                <li
                                  className={
                                    this.activeRoute(props.path)
                                  }
                                  key={key}
                                >
                                  <Link
                                    to={prop.path + props.path}
                                    className="nav-link"
                                    activeclassname="active"
                                  >
                                    <i className={props.icon} />
                                    <p>{props.name}</p>
                                  </Link>
                                </li>
                              );
                            })} 
                          </ul>
                        </Collapse>
                      </Link>
                    )}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
