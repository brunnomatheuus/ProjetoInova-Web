import React, { Component } from 'react';
import logo from "assets/img/LOGO_Inova-02.png";
import getBaseUrl from "./../../services/api";
import { loginLocal, getToken, loginSession } from "./../../services/auth";
import axios from 'axios';
import Helmet from 'react-helmet'
import Footer from "../../components/Footer/Footer"

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      salvar: true,
      error: ''
    };

    this.handleLoggedInState = this.handleLoggedInState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLoggedInState = (event) => {
    this.setState({salvar: !this.state.salvar});
  }

  handleChange = (event) => {
    let change = {};

    change[event.target.name] = event.target.value;

    this.setState(change);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const credenciais = {
      username: this.state.username,
      password: this.state.password
    }

    axios.post(getBaseUrl('local') + '/usuarios/login', credenciais)
      .then(res => {        
        if(res.status === 200){
          if(this.state.salvar === true){
            loginLocal(res.data.id);
          }else{
            loginSession(res.data.id);
          }
          
          axios.get(getBaseUrl('local') + '/usuarios/' + res.data.userId)
            .then(res => {
              if(res.data.tipo === 'adm'){
                this.props.history.push('/');
              }
            })
        }
      })
      .catch(err => {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais."
        });
      })
  }


  render() {
    return (
      <div className="col-md-6 col-md-offset-3 card text-center container">
        <Helmet title="Login - Inova Metrópole" />
        <form name="form" onSubmit={this.handleSubmit}>
            <img className="img" src={logo} alt="LOGO" height="42"/>

            <div className='form-group'>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" value={this.state.login} placeholder="Seu login" onChange={this.handleChange} required />
            </div>
            <div className='form-group'>
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" placeholder="Senha" value={this.state.senha} onChange={this.handleChange} required />
            </div>

            <div className='form-group'>
              <input
                type="checkbox"
                name="btnSalvar"
                label="Manter Logado"
                checked={this.state.salvar}
                onChange={this.handleLoggedInState}
              />
              <label className="btnSalvar" for="btnSalvar">Mantenha-me logado</label>
            </div>

            {this.state.error && <p className="text-warning">{this.state.error}</p>}
            <div className="form-group">
                <button className="btn btn-primary">Login</button>
            </div>
        </form>
        <Footer/>
      </div>

      // <div className="card text-center container" id="login">
      //   <Helmet title="Login - Inova Metrópole" />

      //   <form onSubmit={this.handleSubmit} >
      //     <img className="img" src={logo} alt="LOGO" height="42"/>
      //     <h1 className="h3">Faça login</h1>

      //     <input type="text" name="username" value={this.state.login}
      //     onChange={this.handleChange} className="form-control" placeholder="Seu login" required autofocus/>

      //     <input type="password" name="password" value={this.state.senha}
      //     onChange={this.handleChange} className="form-control" placeholder="Senha" required/>

      //     <input
      //       type="checkbox"
      //       name="btnSalvar"
      //       label="Manter Logado"
      //       checked={this.state.salvar}
      //       onChange={this.handleLoggedInState}
      //     />
      //     <label className="btnSalvar" for="btnSalvar">Mantenha-me logado</label>

      //     {this.state.error && <p className="text-danger">{this.state.error}</p>}

      //     <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
      //   </form>

      //   <Footer/>
      // </div>
    );
  }
}

export default Login;
