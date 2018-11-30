import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

import getBaseUrl from "./../../services/api";
import axios from 'axios';

import Button from "components/CustomButton/CustomButton.jsx";


class VisualizarEditais extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editais: []
        };
    
    }

    componentDidMount() {
        axios.get(getBaseUrl('local') + '/editais')
        .then( response => {
            this.setState({editais: response.data})
        })
    }

    async delete(edital) {
        let filter = {
            where: {
                idEdital: edital.id
            }
        };

        if (window.confirm(`Você deseja realmente excluir este edital? Você irá excluir todos os programas cadastrados com este edital!`)) {
            let programas = []
            axios.get(getBaseUrl('local') + '/programas/?filter=' + JSON.stringify(filter))
            .then( response => {
                if(response.status === 200){
                    programas = response.data

                    programas.map((prop, key) => {
                        axios.delete(getBaseUrl('local') + '/programas/' + prop.id)
                        .then(response => {
                        })
                    })

                    axios.delete(getBaseUrl('local') + '/editais/' + edital.id)
                    .then( response => {
                        window.location.reload();
                    })
                }
            })

            

            
        }
    }

    render() {
        let titulos = [
            'Prazo em meses', 'Tipo do edital', 'Número do edital', 'Valor pago no edital'
        ]

        return (
        <div className="content">
            <Grid fluid>
            <Row>
                <Col md={12}>
                <Card
                    title="Editais cadastrados"
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                    <Table striped hover>
                        <thead>
                        <tr>
                            {titulos.map((prop, key) => {
                                return <th key={key}>{prop}</th>;
                            })}
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.editais.map((prop, key) => {
                            return (
                                <tr key={key}>
                                    {
                                        Object.keys(prop).map((key) => {
                                            if(key !== 'id')
                                                return <td key={key}>{prop[key]}</td>
                                        })
                                    }
                                    <td>
                                        <Button className="btn-danger" onClick={() => this.delete(this.state.editais[key])}>
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

export default VisualizarEditais;
