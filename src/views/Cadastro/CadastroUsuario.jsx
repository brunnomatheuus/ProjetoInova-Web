import React, { Component } from "react";
import {
  Grid,
  FormGroup,
  ControlLabel,
  FormControl,
  Label
} from "react-bootstrap";

import getBaseUrl from "./../../services/api";
import axios from 'axios';

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";


class CadastroUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
        
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.componentDidMount();

        if(this.state.error !== ''){
            console.log("deu ruim")
            return;
        }else {
            console.log("tudo ok")
        }

        const dadosPessoa = {
            tipo: "participante",
            idPessoa: this.props.id,
            username: this.state.username,
            email: this.state.email,
            emailVerified: true,
            password: this.state.password
        }

        axios.post(getBaseUrl('local') + '/usuarios', dadosPessoa)
        .then(res => {        
            if(res.status === 200){
                window.location.reload();
            }
        })
        .catch(error => {
            this.setState({error: error.response.data.error.message})
        })
    }

    componentDidMount(){
        let filter = {
            where: {
                idPessoa: this.props.id
            }
        }

        axios.get(getBaseUrl('local') + '/usuarios?filter=' + JSON.stringify(filter))
        .then(res => {
            if(res.status === 200){
                if(res.data.length !== 0){
                    this.setState({error: "Este participante já possui usuário: " + res.data[0].username})
                }
            }
        })
    }

    render() {
        return (
        <div className="content">
            <Grid fluid>
                <Card
                title = "Cadastrar Usuário"
                content={
                    <form onSubmit={this.handleSubmit}>
                        {this.state.error && <p><Label bsStyle="danger">{this.state.error}</Label></p>}

                        <FormGroup controlId="username">
                            <ControlLabel>Username<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="text" name="username" value={this.state.username} onChange={this.handleChange} required/>
                        </FormGroup>

                        <FormGroup controlId="email">
                            <ControlLabel>Email<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                        </FormGroup>

                        <FormGroup controlId="password">
                            <ControlLabel>Senha<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                        </FormGroup>

                        <hr></hr>

                        <Button pullRight fill type="submit">
                            Cadastrar
                        </Button>
                        <div className="clearfix" />
                        
                    </form>
                }
                />
            </Grid>
        </div>
        );
    }
}

export default CadastroUsuario;
