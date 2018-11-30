import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import { Link } from 'react-router-dom';

import Card from "components/Card/Card.jsx";

import getBaseUrl from "./../../services/api";
import axios from 'axios';

import Button from "components/CustomButton/CustomButton.jsx";

class VisualizarPreInc extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preincs: []
        };
    
    }

    componentDidMount() {
        axios.get(getBaseUrl('local') + '/programas?filter={ "where":{"tipoPrograma":"preInc", "status": "Ativa"} }')
        .then( response => {
            let res = response.data

            this.setState({preincs: res})

            response.data.map((prop, key) => {

                axios.get(getBaseUrl('local') + '/editais/' + res[key].idEdital)
                .then( response => {
                    res[key].idEdital = response.data.numeroEdital + " - Pré-Incubada";
                    this.setState({preincs: res})
                })
                .catch(error => {
                    //
                })
            })
            
        })
    }

    async delete(preinc) {
        if (window.confirm(`Você deseja realmente excluir este programa?`)) {
            axios.delete(getBaseUrl('local') + '/programas/' + preinc.id)
            .then( response => {
                window.location.reload();
            })
        }
    }

    render() {
        let titulos = [
            'Data de ingresso', 'Edital', 'Nome do projeto', 'Telefone', 'Email', 'Site'
        ]

        return (
        <div className="content">
            <Grid fluid>
            <Row>
                <Col md={12}>
                <Card
                    title="Pré-Incubadas cadastradas e ativas"
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
                        {this.state.preincs.map((prop, key) => {
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
                                            }else if(key === 'id' || key === 'preInc' || key === 'tipoPrograma' || key === 'status'){
                                                if(key === 'preInc'){
                                                    Object.keys(prop[key]).map((prop, key) => {
                                                        if(prop === 'matricula' || prop === 'descricao'){
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
                                    <Link to={`/visualizar/preinc/${this.state.preincs[key].id}`}>
                                        <Button className="btn-primary">
                                            Ver
                                        </Button>
                                    </Link>
                                    <Button className="btn-danger" onClick={() => this.delete(this.state.preincs[key])}>
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

export default VisualizarPreInc;
