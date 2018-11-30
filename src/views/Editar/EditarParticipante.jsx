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


class EditarParticipante extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        let id = ''

        if(props.cadastroParticipantesIsOpen === true){
            Object.values(props.id).map((pro, key) => {
                id += pro
            })

            this.state = {
                nome: '',
                tipo: 'participante',
                cpf: '',
                rg: '',
                orgaoEmissor: '',
                dataNascimento: '',
                escolaridade: '',
                curso: '',
                estadoCivil: '',
                naturalidade: '',
                profissao: '',
                endereco: '',
                ddd: '',
                telefone: '',
                email: '',
                site: ''
            };
        }else {
            this.state = {
                nome: props.nome,
                tipo: 'participante',
                cpf: props.cpf,
                rg: props.rg,
                orgaoEmissor: props.orgaoEmissor,
                dataNascimento: props.dataNascimento,
                escolaridade: props.escolaridade,
                curso: props.curso,
                estadoCivil: props.estadoCivil,
                naturalidade: props.naturalidade,
                profissao: props.profissao,
                endereco: props.endereco,
                ddd: props.contatoPessoal.telefone,
                telefone: props.contatoPessoal.telefone,
                email: props.contatoPessoal.email,
                site: props.contatoPessoal.site
            };
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getValidationNumber(number) {
        
        if (number <= 0) return 'error';
        else if(number > 0) return 'success';
        return null;
    }

    onChangeCpf(text) {
        this.setState({cpf : text})
    }
    onChangeData(text) {
        this.setState({dataNascimento : text})
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const dadosPessoa = {
            tipo: 'participante',
            nome: this.state.nome,
            cpf: this.state.cpf,
            rg: this.state.rg,
            orgaoEmissor: this.state.orgaoEmissor,
            dataNascimento: this.state.dataNascimento,
            escolaridade: this.state.escolaridade,
            curso: this.state.curso,
            estadoCivil: this.state.estadoCivil,
            naturalidade: this.state.naturalidade,
            profissao: this.state.profissao,
            endereco: this.state.endereco,
            idEmpresa: this.props.idEmpresa,
            contatoPessoal: {
                telefone: this.state.ddd + this.state.telefone,
                email: this.state.email,
                site: this.state.site
            }
        }

        if(this.props.cadastroParticipantesIsOpen === true){
            axios.post(getBaseUrl('local') + '/programas/' + this.props.id + "/participantes/", dadosPessoa)
            .then(res => {        
                if(res.status === 200){
                    window.location.reload();
                }
            })
            .catch(error => {
                console.log(error)
            })
        }else{
            axios.put(getBaseUrl('local') + '/pessoas/' + this.props.id, dadosPessoa)
            .then(res => {        
                if(res.status === 200){
                    window.location.reload();
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    componentDidMount() {
        let ddd = this.state.ddd;
        ddd = ddd.slice(0, 2);
        let telefone = this.state.telefone;
        telefone = telefone.slice(2);
        this.setState({ddd: ddd, telefone: telefone})
    }

    render() {
        return (
        <div className="content">
            <Grid fluid>
                <Card
                title = "Participante"
                content={
                    <form onSubmit={this.handleSubmit}>

                        <FormGroup controlId="nome">
                            <ControlLabel>Nome<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="text" name="nome" value={this.state.nome} onChange={this.handleChange} required/>
                        </FormGroup>

                        <FormGroup controlId="cpf">
                            <ControlLabel>CPF</ControlLabel>

                            <TextInputMask
                                name="cpf" className="mask" value={this.state.cpf} onChangeText={this.onChangeCpf.bind(this)}
                                
                                kind={'cpf'}/>
                        </FormGroup>

                        <FormGroup controlId="rg">
                            <ControlLabel>RG (sem pontos)</ControlLabel>
                            <FormControl type="text" name="rg" value={this.state.rg} onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="orgaoEmissor">
                            <ControlLabel>Órgão Emissor</ControlLabel>
                            <FormControl type="text" name="orgaoEmissor" value={this.state.orgaoEmissor} onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="dataNascimento">
                            <ControlLabel>Data de nascimento</ControlLabel>

                            <TextInputMask
                                name="dataNascimento" className="mask" value={this.state.dataNascimento} onChangeText={this.onChangeData.bind(this)}
                                kind={'datetime'}
                                options={{
                                    format: 'DD-MM-YYYY'
                                }} />
                        </FormGroup>

                        <FormGroup controlId="escolaridade">
                            <ControlLabel>Escolaridade</ControlLabel>
                            <FormControl type="text" name="escolaridade" value={this.state.escolaridade} onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="curso">
                            <ControlLabel>Curso</ControlLabel>
                            <FormControl type="text" name="curso" value={this.state.curso} onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="estadoCivil">
                            <ControlLabel>Estado Civil</ControlLabel>
                            <FormControl type="text" name="estadoCivil" value={this.state.estadoCivil} onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="naturalidade">
                            <ControlLabel>Naturalidade</ControlLabel>
                            <FormControl type="text" name="naturalidade" value={this.state.naturalidade} onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="profissao">
                            <ControlLabel>Profissão</ControlLabel>
                            <FormControl type="text" name="profissao" value={this.state.profissao} onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="endereco">
                            <ControlLabel>Endereço</ControlLabel>
                            <FormControl type="text" name="endereco" value={this.state.endereco} onChange={this.handleChange}/>
                        </FormGroup>

                        <hr></hr>

                        <FormGroup controlId="ddd" validationState={this.getValidationNumber(this.state.ddd)}>
                            <ControlLabel>DDD<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="number" name="ddd" value={this.state.ddd} onChange={this.handleChange} required/>
                        </FormGroup>
                        <FormGroup controlId="telefone" validationState={this.getValidationNumber(this.state.telefone)}>
                            <ControlLabel>Telefone<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="number" name="telefone" value={this.state.telefone} onChange={this.handleChange} required/>
                        </FormGroup>
                        <FormGroup controlId="email">
                            <ControlLabel>Email<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                        </FormGroup>
                        <FormGroup controlId="site">
                            <ControlLabel>Site</ControlLabel>
                            <FormControl type="text" name="site" value={this.state.site} onChange={this.handleChange} />
                        </FormGroup>

                        <hr></hr>

                        <Button pullRight fill type="submit">
                            Concluir
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

export default EditarParticipante;
