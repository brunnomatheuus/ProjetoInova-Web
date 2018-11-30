import React, { Component } from "react";
import {  ButtonToolbar, ButtonGroup, Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import logo from "assets/img/LOGO_Inova-02.png";
import Helmet from 'react-helmet'

import getBaseUrl from "./../../services/api";
import axios from 'axios';

import Button from "components/CustomButton/CustomButton.jsx";
import CadastroPreInc from "../../views/Cadastro/CadastroPreInc";
import Participantes from "../../views/Visualizar/Participantes";
import EditarParticipante from "../../views/Editar/EditarParticipante";

class PreInc extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            propriedades: [],
            edital: '',
            editarIsOpen: false,
            cadastroParticipantesIsOpen: false,
            participantesIsOpen: false,
        };
    
    }

    componentDidMount() {
        let filter = {
            where: {
                id: this.state.id
            }            
        };

        axios.get(getBaseUrl('local') + '/programas?filter=' + JSON.stringify(filter))
        .then( response => {
            this.setState({propriedades: response.data})

            axios.get(getBaseUrl('local') + '/editais/' + this.state.propriedades[0].idEdital)
            .then( response => {
                this.setState({edital: response.data.numeroEdital + ' - Pré-Incubada'})
            })
        })      
        
    }

    async desativar() {
        if (window.confirm(`Você deseja realmente desativar este programa?`)) {
            const dado = {
                status: "Desativada"
            }
            axios.patch(getBaseUrl('local') + '/programas/' + this.state.id, dado)
            .then( response => {
                if(response.status === 200){
                    this.props.history.push("/visualizar/acelera");
                }
            })
        }
    }

    async incubar() {
        if (window.confirm(`Você deseja realmente pré-incubar este programa?`)) {

            axios.delete(getBaseUrl('local') + '/programas/' + this.state.id)
            .then( response => {
                if(response.status === 200 && response.data.count === 1){
                    const dados = {
                        dataIngresso: this.state.propriedades[0].dataIngresso,
                        idEdital: 'Escolha um novo edital',
                        tipoPrograma: 'inc',
                        nome: this.state.propriedades[0].nome,
                        status: 'Ativa',
                        Inc: {
                            matricula: this.state.propriedades[0].preInc.matricula,
                        },
                        contatoEmpresarial: {
                            telefone: this.state.propriedades[0].contatoEmpresarial.telefone,
                            email: this.state.propriedades[0].contatoEmpresarial.email,
                            site: this.state.propriedades[0].contatoEmpresarial.site
                        }
                    }

                    axios.post(getBaseUrl('local') + '/programas/', dados)
                    .then( res => {
                        if(res.status === 200){
                            let filter = {
                                where: {
                                    idEmpresa: this.state.propriedades[0].id
                                }
                            }

                            axios.get(getBaseUrl('local') + '/pessoas?filter=' + JSON.stringify(filter))
                            .then(response => {
                                if(response.status === 200){
                                    
                                    const dado = {
                                        idEmpresa: res.data.id
                                    }
                                    response.data.map((prop, key) => {
                                        axios.patch(getBaseUrl('local') + '/pessoas/' + prop.id, dado)
                                        .then(response => {
                                            if(response.status === 200){
                                                //
                                            }
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                    })
                                }
                            })

                            console.log(res)
                            this.props.history.push("/visualizar/inc");
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    async abreEditar(){
        if(this.state.editarIsOpen === false){
            this.setState({editarIsOpen: true,  cadastroParticipantesIsOpen: false, participantesIsOpen: false})
        }else{
            this.setState({editarIsOpen: false})
        }
    }

    async abreCadastrarParticipantes(){
        if(this.state.cadastroParticipantesIsOpen === false){
            this.setState({ cadastroParticipantesIsOpen: true, editarIsOpen: false,  participantesIsOpen: false})
        }else{
            this.setState({ cadastroParticipantesIsOpen: false})
        }
    }

    async abreParticipantes(){
        if(this.state.participantesIsOpen === false){
            this.setState({ participantesIsOpen: true, editarIsOpen: false, cadastroParticipantesIsOpen: false})
        }else{
            this.setState({ participantesIsOpen: false})
        }
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
        return (
            <div className="content">
            <Helmet title="Inova Metrópole" />
            <Grid fluid>
                <Row>
                    <Col md={12}>
                    <Card
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                        <div className="content">

                            <div className="logo">
                                <div className="logo-img" style={{width:'14em', marginBottom:'1em'}}>
                                    <img src={logo} alt="logo_image" height="35" />
                                </div>
                            </div>

                            {this.state.propriedades.map((prop, key) => {
                                return (
                                    <div key={key}>
                                        {
                                            Object.keys(prop).map((key) => {
                                                if(key !== 'contatoEmpresarial' && key !== 'preInc')
                                                {
                                                    if(key === 'dataIngresso'){
                                                        return <h5 key={key}><strong key={key}>Data de ingresso: </strong>{prop[key]}</h5>
                                                    }else if(key === 'idEdital'){
                                                        return <h5 key={key}><strong key={key}>Edital: </strong>{this.state.edital}</h5>
                                                        
                                                    }else if(key === 'id' || key == 'tipoPrograma'){
                                                        //TO-DO
                                                    }else{
                                                        return <h5 key={key}><strong key={key}>{this.titleize(key)}: </strong>{prop[key]}</h5>
                                                    }
                                                }else {
                                                    let auxValues = Object.values(prop[key]);
                                                    let auxKeys = Object.keys(prop[key]);
                                                    let retorno = [];
                                                    {auxValues.map((props, key) => {
                                                        if(auxKeys[key] !== 'id')
                                                            retorno.push(<h5 key={key}><strong key={key}>{this.titleize(auxKeys[key])}: </strong>{props}</h5>)
                                                    })}

                                                    return retorno;
                                                }

                                            })
                                        }
                                        <ButtonToolbar>
                                            <ButtonGroup >
                                                <Button className="btn-primary" onClick={this.props.history.goBack}>
                                                    Voltar
                                                </Button>
                                                <Button className="btn-primary" onClick={() => this.abreEditar()}>
                                                    Editar dados cadastrais
                                                </Button>
                                                <Button className="btn-primary" onClick={() => this.abreCadastrarParticipantes()}>
                                                    Cadastrar participante
                                                </Button>
                                                <Button className="btn-primary" onClick={() => this.abreParticipantes()}>
                                                    Ver participante(s)
                                                </Button>
                                                <Button onClick={() => this.incubar()}>
                                                    Incubar
                                                </Button>
                                                <Button className="btn-danger" onClick={() => this.desativar()}>
                                                    Desligar
                                                </Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                        
                                    </div>
                                );
                            })}
                        </div>
                    }
                    />
                    </Col>

                    <Col md={12} >
                        { this.state.editarIsOpen && <CadastroPreInc {...this.state}/> }
                            
                    </Col>

                    <Col md={12} >
                        { this.state.cadastroParticipantesIsOpen && <EditarParticipante {...this.state}/> }
                            
                    </Col>

                    <Col md={12} >
                        { this.state.participantesIsOpen && <Participantes {...this.state.propriedades}/> }
                            
                    </Col>                 

                    
                </Row>
            </Grid>
            </div>
        );
    }
}

export default PreInc;
