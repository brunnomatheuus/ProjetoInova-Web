import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';

import Card from "components/Card/Card.jsx";

import getBaseUrl from "./../../services/api";
import axios from 'axios';

import Button from "components/CustomButton/CustomButton.jsx";

class VisualizarDesativos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            programas: []
        };
    
    }

    componentDidMount() {
        axios.get(getBaseUrl('local') + '/programas?filter={ "where":{"status": "Desativada"} }')
        .then( response => {
            let res = response.data
            this.setState({programas: res})
            
            response.data.map((prop, key) => {

                axios.get(getBaseUrl('local') + '/editais/' + res[key].idEdital)
                .then( response => {
                    if(response.data.tipoEdital === 'acelera')
                        res[key].idEdital = response.data.numeroEdital + " - Acelera";
                    else if(response.data.tipoEdital === 'preInc')
                        res[key].idEdital = response.data.numeroEdital + " - Pré-Incubada";
                    else if(response.data.tipoEdital === 'Inc')
                        res[key].idEdital = response.data.numeroEdital + " - Incubada";
                        
                    this.setState({programas: res})
                })
            })
        })
    }

    async delete(programa) {
        if (window.confirm(`Você deseja realmente excluir este programa?`)) {
            axios.delete(getBaseUrl('local') + '/programas/' + programa.id)
            .then( response => {
                window.location.reload();
            })
        }
    }

    async ativar(programa) {
        if (window.confirm(`Você deseja realmente ativar este programa?`)) {
            const dado = {
                status: "Ativa"
            }
            axios.patch(getBaseUrl('local') + '/programas/' + programa.id, dado)
            .then( response => {
                if(response.status === 200){
                    window.location.reload();
                }
            })
        }
    }

    render() {
        let titulos = [
            'Data de ingresso', 'Edital', 'Nome', 'Ações'
        ]

        return (
        <div className="content">
            <Grid fluid>
            <Row>
                <Col md={12}>
                <Card
                    title="Programas desativados"
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
                        {this.state.programas.map((prop, key) => {
                            return (
                            <tr key={key}>
                                {
                                    Object.keys(prop).map((key) => {
                                        if(key !== 'contatoEmpresarial')
                                        {
                                            if(key === 'id' || key === 'acelera' || key === 'preInc' || key === 'Inc' || key === 'tipoPrograma' || key === 'status'){
                                                if(key === 'acelera'){
                                                    Object.keys(prop[key]).map((prop, key) => {
                                                        if(prop === 'matricula'){
                                                            //TO-DO
                                                        }
                                                    })
                                                }else if(key === 'preInc'){
                                                    Object.keys(prop[key]).map((prop, key) => {
                                                        //TO-DO
                                                    })
                                                }else if(key === 'Inc'){
                                                    Object.keys(prop[key]).map((prop, key) => {
                                                        //TO-DO
                                                    })
                                                }

                                            }else{
                                                return <td key={key}>{prop[key]}</td>
                                            }
                                        }
                                    })
                                }
                                <td>
                                    <Button className="btn-primary" onClick={() => this.ativar(this.state.programas[key])}>
                                        Ativar
                                    </Button>
                                    <Button className="btn-danger" onClick={() => this.delete(this.state.programas[key])}>
                                        Deletar
                                    </Button>
                                </td>
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

export default VisualizarDesativos;
