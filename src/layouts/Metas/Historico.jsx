import React, { Component } from "react";
import { Grid, Row, Col, Table, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { Link } from 'react-router-dom';

import Card from "components/Card/Card.jsx";

import getBaseUrl from "./../../services/api";
import axios from 'axios';

import Button from "components/CustomButton/CustomButton.jsx";

class Historico extends Component {
    constructor(props) {
        super(props);

        this.state = {
            metas: [],
            chaves: [],
            objetivo: '',
            chave: '',
            atualizacoes: []
        };
    
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });

        if(evt.target.name === 'objetivo'){
            axios.get(getBaseUrl('local') + '/objetivosOKR/' + evt.target.value + '/chaves')
            .then( response => {
                if(response.status === 200){
                    this.setState({chaves: response.data})
                }
            })
        }else if(evt.target.name === 'chave'){
            axios.get(getBaseUrl('local') + '/resultadosChaveOKR/' + evt.target.value + '/attResultadoChave')
                .then( response => {
                    if(response.status === 200){
                        this.setState({atualizacoes: response.data})
                    }
                })
        }
    }

    componentDidMount() {
        axios.get(getBaseUrl('local') + '/objetivosOKR')
        .then( response => {
            this.setState({metas: response.data})
        })
    }

    titleize(text) {
        var words = text.toString().toLowerCase().split(" ");
        for (var a = 0; a < words.length; a++) {
            var w = words[a];
            words[a] = w[0].toUpperCase() + w.slice(1);
        }
        return words.join(" ");
    }

    render() {
        let titulos = [
            'Porcentagem %', 'Data', 'Observações', 'Responsável'
        ]

        let optionObjetivos = this.state.metas.map((objetivo, i) =>
            <option key={i} value={objetivo.id}>{objetivo.nome}</option>
        );

        let optionChaves = this.state.chaves.map((chave, i) =>
            <option key={i} value={chave.id}>{chave.nome}</option>
        );

        return (
        <div className="content">
            <FormGroup controlId="objetivo">
                <ControlLabel>Selecione o objetivo</ControlLabel>
                <FormControl componentClass="select" name="objetivo" onChange={this.handleChange}>
                    <option value="selecione">Selecione...</option>
                    {optionObjetivos}
                </FormControl>
            </FormGroup>
            <FormGroup controlId="chave">
                <ControlLabel>Selecione o resultado chave</ControlLabel>
                <FormControl componentClass="select" name="chave" onChange={this.handleChange}>
                    <option value="selecione">Selecione...</option>
                    {optionChaves}
                </FormControl>
            </FormGroup>
            <Grid fluid>
            <Row>
                <Col md={12}>
                <Card
                    title="Histórico"
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                    
                    <Table striped hover>
                        <thead>
                        <tr>
                            {titulos.map((prop, key) => {
                                return <th key={key}>{prop}</th>;
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.atualizacoes.map((prop, key) => {
                            return (
                            <tr key={key}>
                                {
                                    Object.keys(prop).map((key) => {
                                        if(key !== 'idChave' && key !== 'id')
                                        {
                                            if(key === 'responsavel')
                                                return <td key={key}>{this.titleize(prop[key])}</td>     
                                            else
                                                return <td key={key}>{prop[key]}</td>   
                                                          
                                        }
                                    })
                                }
                            </tr>
                            );
                        })}

                        </tbody>
                    </Table>
                    }
                />
                </Col>
            </Row>
            </Grid>
        </div>
        );
    }
}

export default Historico;
