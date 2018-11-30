import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          {/* <nav className="pull-left">
            <ul>
              <li>
                <a href="#pablo">Home</a>
              </li>
              <li>
                <a href="#pablo">Company</a>
              </li>
              <li>
                <a href="#pablo">Portfolio</a>
              </li>
              <li>
                <a href="#pablo">Blog</a>
              </li>
            </ul>
          </nav> */}
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://inova.imd.ufrn.br/parque/inova/">Inova Metrópole</a>, Desenvolvido por Bruno Cabral
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
