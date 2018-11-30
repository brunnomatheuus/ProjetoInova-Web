import React, { Component } from "react";
import { Image } from 'react-bootstrap';
import { Link, Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import ca from "assets/img/atalhos/icons_bruno-01.svg";
import cp from "assets/img/atalhos/icons_bruno-02.svg";
import ci from "assets/img/atalhos/icons_bruno-03.svg";
import ce from "assets/img/atalhos/icons_bruno-04.svg";
import crc from "assets/img/atalhos/icons_bruno-05.svg";
import va from "assets/img/atalhos/icons_bruno-06.svg";
import vp from "assets/img/atalhos/icons_bruno-07.svg";
import vi from "assets/img/atalhos/icons_bruno-08.svg";
import cm from "assets/img/atalhos/icons_bruno-09.svg";
import vm from "assets/img/atalhos/icons_bruno-10.svg";

import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";

import { style } from "variables/Variables.jsx";

import routes from "routes/routes.jsx";
import Helmet from 'react-helmet'

class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    var routeComponents = [];
    routes.map((prop, key) => { 
      if(prop.name === 'Home'){}
      else if(!prop.routes) {
        return routeComponents.push(<Route path={prop.path} component={prop.component} key={key} />)
      }
      else if(prop.routes){
        prop.routes.map((props, key) => {
          return routeComponents.push(<Route path={prop.path + props.path} component={props.component} key={key} />)
        })
      }

      return null;
    });

    return (
      <div className="content">
        <div className="">
          <Helmet title="Inova Metrópole" />
          <NotificationSystem ref="notificationSystem" style={style} />
          <Sidebar {...this.props} />
          <div id="main-panel" className="main-panel" ref="mainPanel">
            <Header {...this.props} />
            <Switch>

              {routeComponents}

            </Switch>
          </div>
          
        </div>

        <div className="col-md-6 col-md-offset-4  text-center container">
          <Link to={`/cadastro/acelera/`}>
            <Image src={ca} height="150" width="150"  circle style={{padding:"20px"}} title="Cadastrar Acelera">
            </Image>
          </Link>
          <Link to={`/cadastro/preinc/`}>
            <Image src={cp} height="150" width="150" circle style={{padding:"20px"}} title="Cadastrar Pré-Incubada">
            </Image>
          </Link>
          <Link to={`/cadastro/inc/`}>
            <Image src={ci} height="150" width="150" circle style={{padding:"20px"}} title="Cadastrar Incubada">
            </Image>
          </Link>
          <Link to={`/cadastro/edital/`}>
            <Image src={ce} height="150" width="150" circle style={{padding:"20px"}} title="Cadastrar Edital">
            </Image>
          </Link>
          <Link to={`/metas/cadastrar/`}>
            <Image src={cm} height="150" width="150" circle style={{padding:"20px"}} title="Cadastrar Meta">
            </Image>
          </Link>
          <Link to={`/metas/cadastroChave/`}>
            <Image src={crc} height="150" width="150" circle style={{padding:"20px"}} title="Cadastrar Resultado Chave">
            </Image>
          </Link>
          <Link to={`/visualizar/acelera/`}>
            <Image src={va} height="150" width="150" circle style={{padding:"20px"}} title="Visualizar Aceleras">
            </Image>
          </Link>
          <Link to={`/visualizar/preinc/`}>
            <Image src={vp} height="150" width="150" circle style={{padding:"20px"}} title="Visualizar Pré-Incubadas">
            </Image>
          </Link>
          <Link to={`/visualizar/inc/`}>
            <Image src={vi} height="150" width="150" circle style={{padding:"20px"}} title="Visualizar Incubadas">
            </Image>
          </Link>
          <Link to={`/metas/visualizar/`}>
            <Image src={vm} height="150" width="150" circle style={{padding:"20px"}} title="Visualizar Metas">
            </Image>
          </Link>
          
          
        </div>
      </div>
    );
  }
}

export default Home;
