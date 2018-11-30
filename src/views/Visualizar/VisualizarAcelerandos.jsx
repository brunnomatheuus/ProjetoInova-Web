import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';

import Card from "components/Card/Card.jsx";

import getBaseUrl from "./../../services/api";
import axios from 'axios';

import Button from "components/CustomButton/CustomButton.jsx";

class VisualizarAcelerandos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            acelerandos: []
        };
    
    }

    componentDidMount() {
        axios.get(getBaseUrl('local') + '/programas?filter={ "where":{"tipoPrograma":"acelera", "status": "Ativa"} }')
        .then( response => {
            let res = response.data

            response.data.map((prop, key) => {

                axios.get(getBaseUrl('local') + '/editais/' + res[key].idEdital)
                .then( response => {
                    res[key].idEdital = response.data.numeroEdital + " - Acelera";
                    this.setState({acelerandos: res})
                })
                .catch(error => {
                    //
                })
            })
            
        })
    }

    async delete(acelera) {
        if (window.confirm(`Você deseja realmente excluir este programa?`)) {
            axios.delete(getBaseUrl('local') + '/programas/' + acelera.id)
            .then( response => {
                window.location.reload();
            })
        }
    }

    render() {
        let titulos = [
            'Data de ingresso', 'Edital', 'Nome', 'Telefone', 'Email', 'Site'
        ]

        return (
        <div className="content">
            <Grid fluid>
            <Row>
                <Col md={12}>
                <Card
                    title="Aceleras cadastrados e ativos"
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
                        {this.state.acelerandos.map((prop, key) => {
                            return (
                            <tr key={key}>
                                {
                                    Object.keys(prop).map((key) => {
                                        if(key !== 'contatoEmpresarial')
                                        {
                                            if(key === 'dataIngresso'){
                                                let data = prop[key];
                                                data = data.slice(0, 10);
                                                return <td key={key}>{data}</td>
                                            }else if(key === 'id' || key === 'acelera' || key === 'tipoPrograma' || key === 'status'){
                                                if(key === 'acelera'){
                                                    Object.keys(prop[key]).map((prop, key) => {
                                                        if(prop === 'matricula'){
                                                            //TO-DO
                                                        }
                                                    })
                                                }
                                            }else{
                                                return <td key={key}>{prop[key]}</td>
                                            }
                                        }else {
                                            let aux = Object.values(prop[key]);
                                            let retorno = [];
                                            {aux.map((prop, key) => {
                                                if(prop !== null && prop !== undefined)
                                                    retorno.push(<td key={key}>{prop}</td>)
                                            })}

                                            return retorno;
                                        }
                                    })
                                }
                                <td>
                                    <Link to={`/visualizar/acelera/${this.state.acelerandos[key].id}`}>
                                        <Button className="btn-primary">
                                            Ver
                                        </Button>
                                    </Link>
                                    <Button className="btn-danger" onClick={() => this.delete(this.state.acelerandos[key])}>
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

export default VisualizarAcelerandos;
