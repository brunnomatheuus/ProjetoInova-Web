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

class CadastroMeta extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            nome: 'Meta x',
            tipo: 'Anual',
            ano: '2018',
            periodo: '',
            error: '',
            modalIsOpen: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.error !== ''){
            console.log("deu ruim")
            return;
        }else {
            console.log("tudo ok")
        }
    
        const dados = {
            nome: this.state.nome,
            tipo: this.state.tipo,
            ano: this.state.ano,
            periodo: this.state.periodo
        }

        axios.post(getBaseUrl('local') + '/objetivosOKR', dados)
        .then(res => {        
            if(res.status === 200){
                this.props.history.push("/metas/visualizar");
            }
        })
        .catch(error => {
            this.setState({
                error: error.response.data.error.message
            });
        })
    }

    render() {
        return (
        <div className="content">
            <Grid fluid>
                <Card
                title="Cadastrar Meta"
                content={
                    <form onSubmit={this.handleSubmit}>
                        {this.state.error && <p><Label bsStyle="danger">{this.state.error}</Label></p>}

                        <FormGroup controlId="nome">
                            <ControlLabel>Nome<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="text" name="nome" value={this.state.nome} onChange={this.handleChange} required/>
                        </FormGroup>
                        
                        <FormGroup controlId="tipo">
                            <ControlLabel>Tipo<span className="text-danger"> *</span></ControlLabel>
                            <FormControl componentClass="select" name="tipo" onChange={this.handleChange}>
                                <option value="Anual">Anual</option>
                                <option value="Trimestral">Trimestral</option>
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId="ano">
                            <ControlLabel>Selecione o ano<span className="text-danger"> *</span></ControlLabel>
                            <FormControl componentClass="select" name="ano" onChange={this.handleChange}>
                                <option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option>
                            </FormControl>
                        </FormGroup>

                        {
                            this.state.tipo === 'Trimestral' ?
                            (
                                <FormGroup controlId="trimestre">
                                    <ControlLabel>Selecione o trimestre<span className="text-danger"> *</span></ControlLabel>
                                    <FormControl componentClass="select" name="trimestre" onChange={this.handleChange}>
                                        <option value="1">1º Trimestre</option><option value="2">2º Trimestre</option><option value="3">3º Trimestre</option><option value="4">4º Trimestre</option>
                                    </FormControl>
                                </FormGroup>
                            )
                            :
                            (
                                <span></span>
                            ) 
                        }

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

export default CadastroMeta;