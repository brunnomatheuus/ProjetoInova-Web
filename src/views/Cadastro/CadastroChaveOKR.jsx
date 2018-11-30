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
import TextInputMask from 'react-masked-text';


import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";


class CadastroChaveOKR extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            nome: 'Cadastrar 5 empresas',
            idObjetivo: '',
            error: '',
            objetivos: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(getBaseUrl('local') + '/objetivosOKR')
        .then( response => {
            this.setState({objetivos: response.data})         
        })
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
            idObjetivo: this.state.idObjetivo
        }
        console.log(this.state.idObjetivo)
        axios.post(getBaseUrl('local') + '/objetivosOKR/' + this.state.idObjetivo + "/chaves", dados)
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
        let optionObjetivos = this.state.objetivos.map((objetivo, i) =>
            <option key={i} value={objetivo.id}>{objetivo.nome}</option>
        );

        return (
        <div className="content">
            <Grid fluid>
                <Card
                title="Cadastrar resultados chave"
                content={
                    <form onSubmit={this.handleSubmit}>
                        {this.state.error && <p><Label bsStyle="danger">{this.state.error}</Label></p>}

                        <FormGroup controlId="idObjetivo">
                            <ControlLabel>Objetivo<span className="text-danger"> *</span></ControlLabel>
                            <FormControl componentClass="select" name="idObjetivo" onChange={this.handleChange}>
                            <option>Escolha um objetivo...</option>
                            {optionObjetivos}
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId="nome">
                            <ControlLabel>Nome<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="text" name="nome" value={this.state.nome} onChange={this.handleChange} required/>
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

export default CadastroChaveOKR;
