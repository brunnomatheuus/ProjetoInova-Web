import React, { Component } from "react";
import { ButtonToolbar, ButtonGroup, Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import getBaseUrl from "./../../services/api";
import axios from 'axios';

import Button from "components/CustomButton/CustomButton.jsx";
import EditarParticipante from "../Editar/EditarParticipante.jsx"
import CadastroUsuario from "../Cadastro/CadastroUsuario.jsx"


class Participantes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idPrograma: props[0].id,
            participantes: [],
            editarIsOpen: false,
            cadastroUsuarioIsOpen: false,
            participanteEscolhido: ''
        };
    
    }

    componentDidMount() {
        axios.get(getBaseUrl('local') + '/programas/' + this.state.idPrograma + "/participantes/")
        .then( response => {
            this.setState({participantes: response.data})
        })
    }

    async delete(participante) {
        if (window.confirm(`Você deseja realmente excluir este participante? `)) {
            axios.delete(getBaseUrl('local') + '/pessoas/' + participante.id)
                .then( response => {
                    if(response.status === 200){
                        window.location.reload();
                    }
                })
        }
    }

    async abreEditar(key){
        if(this.state.editarIsOpen === false){
            this.setState({editarIsOpen: true, participanteEscolhido: key})
        }else{
            this.setState({editarIsOpen: false})
        }
    }

    async abreCadastroUsuario(key){
        if(this.state.cadastroUsuarioIsOpen === false){
            this.setState({cadastroUsuarioIsOpen: true, editarIsOpen: false, participanteEscolhido: key})
        }else{
            this.setState({cadastroUsuarioIsOpen: false})
        }
    }

    render() {
        let titulos = [
            'Nome', 'CPF', 'RG', 'Órgão emissor', 'Data de nascimento', 'Escolaridade', 'Curso', 'Estado civil', 'Naturalidade', 'Profissão', 'Endereço', 'Telefone', 'Email', 'Site', 'Ações'
        ]

        return (
        <div className="content">
            <Grid fluid>
            <Row>
                <Col md={12}>
                <Card
                    title="Participantes"
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
                        {this.state.participantes.map((prop, key) => {
                            return (
                                <tr key={key}>
                                    {
                                        Object.keys(prop).map((key) => {
                                            if(key !== 'id' && key !== 'idEmpresa' && key !== 'tipo' && key !== 'contatoPessoal'){
                                                if(key === 'dataNascimento'){
                                                    let data = prop[key];
                                                    data = data.slice(0, 10);
                                                    return <td key={key}>{data}</td>
                                                }
                                                else if(prop[key] === '')
                                                {
                                                    return <td key={key}> </td>
                                                }else{
                                                    return <td key={key}>{prop[key]}</td>
                                                }
                                            }else if(key === 'contatoPessoal'){
                                                let aux = Object.values(prop[key]);
                                                let retorno = [];
                                                {aux.map((prop, key) => {
                                                    if(prop !== null)
                                                        retorno.push(<td key={key}>{prop}</td>)
                                                })}

                                                return retorno;
                                            }
                                        })
                                    }
                                    <td>
                                        <ButtonToolbar>
                                            <ButtonGroup bsSize="xsmall">
                                                <Button className="btn-primary" onClick={() => this.abreCadastroUsuario(key)}>
                                                    Cadastrar Usuário
                                                </Button>
                                                <Button className="btn-primary" onClick={() => this.abreEditar(key) }>
                                                    Editar
                                                </Button>
                                                <Button className="btn-danger" onClick={() => this.delete(this.state.participantes[key])}>
                                                    Del
                                                </Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                    }
                />
                </Col>

                <Col md={12} >
                    { this.state.editarIsOpen && <EditarParticipante {...this.state.participantes[this.state.participanteEscolhido]}/> }
                        
                </Col>

                <Col md={12} >
                    { this.state.cadastroUsuarioIsOpen && <CadastroUsuario {...this.state.participantes[this.state.participanteEscolhido]}/> }
                        
                </Col>
            </Row>
            </Grid>
        </div>
        );
    }
}

export default Participantes;
