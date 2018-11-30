import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { Link } from 'react-router-dom';

import getBaseUrl from "./../../services/api";
import axios from 'axios';

import Button from "components/CustomButton/CustomButton.jsx";

class VisualizarInc extends Component {
    constructor(props) {
        super(props);

        this.state = {
            incs: []
        };
    
    }

    componentDidMount() {

        let filter = {
            where: {
                tipoPrograma: 'inc',
                status: "Ativa"
            }            
        };


        axios.get(getBaseUrl('local') + '/programas?filter=' + JSON.stringify(filter))
        .then( response => {
            let res = response.data
            this.setState({incs: res})
            
            response.data.map((prop, key) => {
                
                axios.get(getBaseUrl('local') + '/editais/' + res[key].idEdital)
                .then( response => {
                    res[key].idEdital = response.data.numeroEdital + " - Incubada";
                    this.setState({incs: res})
                })
                .catch(error => {
                    //
                })
            })
            
        })
    }

    async delete(inc) {
        if (window.confirm(`Você deseja realmente excluir este programa?`)) {
            axios.delete(getBaseUrl('local') + '/programas/' + inc.id)
            .then( response => {
                window.location.reload();
            })
        }
    }

    render() {
        let titulos = [
            'Data de ingresso', 'Edital', 'Nome da empresa', 'Telefone', 'Email', 'Site'
        ]

        return (
        <div className="content">
            <Grid fluid>
            <Row>
                <Col md={12}>
                <Card
                    title="Incubadas cadastradas e ativas"
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                    <Table striped responsive hover>
                        <thead>
                        <tr>
                            {titulos.map((prop, key) => {
                                return <th key={key}>{prop}</th>;
                            })}
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.incs.map((prop, key) => {
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
                                            }else if(key === 'id' || key === 'Inc' || key === 'tipoPrograma' || key === 'status'){
                                                if(key === 'Inc'){
                                                    Object.keys(prop[key]).map((prop, key) => {
                                                        if(prop === 'matricula' || prop === 'areaAtuacao' || prop === 'cnpj' || prop === 'porte' || prop === 'produto' || prop === 'razaoSocial' || prop === 'representanteLegal'){
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
                                    <Link to={`/visualizar/inc/${this.state.incs[key].id}`}>
                                        <Button className="btn-primary">
                                            Ver
                                        </Button>
                                    </Link>
                                    <Button className="btn-danger" onClick={() => this.delete(this.state.incs[key])}>
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

export default VisualizarInc;
