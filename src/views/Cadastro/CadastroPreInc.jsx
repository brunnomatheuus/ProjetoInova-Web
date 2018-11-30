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


class CadastroPreInc extends Component {
    constructor(props) {
        super(props);

        console.log(props)

        if(props.editarIsOpen){
            this.state = {
                nome: props.propriedades[0].nome,
                dataIngresso: props.propriedades[0].dataIngresso,
                edital: props.propriedades[0].idEdital,
                matricula: props.propriedades[0].preInc.matricula,
                descricao: props.propriedades[0].preInc.descricao,
                ddd: props.propriedades[0].contatoEmpresarial.telefone,
                telefone: props.propriedades[0].contatoEmpresarial.telefone,
                email: props.propriedades[0].contatoEmpresarial.email,
                site: props.propriedades[0].contatoEmpresarial.site,
                error: '',
                editais: []
            };
        }else{
            this.state = {
                nome: 'Projeto X',
                dataIngresso: '29-03-2018',
                edital: '',
                matricula: 20182,
                descricao: 'Projeto da empresa X, que tem como objetivo:',
                ddd: '',
                telefone: '',
                email: 'email@email.com',
                site: '',
                error: '',
                editais: [],
                qtdParticipantes: 1,
                nomeParticipantes: []
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

    onChangeData(text) {
        this.setState({dataIngresso : text})
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });

        var a = this.state.matricula;
        
        if(evt.target.name === 'matricula'){
            a = evt.target.value;
        }

        if(a <= 0)
            this.setState({error: 'Não é possível preencher com valores menores/iguais a zero'})
        else if(a > 0)
            this.setState({error: ''})
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
            dataIngresso: this.state.dataIngresso,
            idEdital: this.state.edital,
            tipoPrograma: "preInc",
            status: "Ativa",
            preInc: {
                matricula: this.state.matricula,
                descricao: this.state.descricao
            },
            contatoEmpresarial: {
                telefone: this.state.ddd + this.state.telefone,
                email: this.state.email,
                site: this.state.site
            }
        }
        
        if(this.props.editarIsOpen){
            axios.put(getBaseUrl('local') + '/programas/' + this.props.id, dados)
            .then(res => {        
                if(res.status === 200){
                    window.location.reload();
                }
            })
            .catch(error => {
                this.setState({
                    error: error.response.data.error.message
                });
            })
        }else{
            axios.post(getBaseUrl('local') + '/programas', dados)
                .then(res => {        
                    if(res.status === 200){
                        for(let i = 0; i < this.state.qtdParticipantes; i++) {
                            const participante = {
                                nome: this.state.nomeParticipantes[i],
                                tipo: "participante",
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
                                contatoPessoal: {
                                    telefone: '-',
                                    email: '',
                                    site: ''
                                }
                            }

                            axios.post(getBaseUrl('local') + '/programas/' + res.data.id + '/participantes', participante)
                            .then(res => {
                                if(res.status === 200){
                                    //
                                }
                            })
                            .catch(error => {
                                this.setState({
                                    error: error.response.data.error.message
                                });
                            })
                        }

                        window.location.reload();
                    }
                })
                .catch(error => {
                    this.setState({
                    error: error
                    });
                })
        }
    }

    componentDidMount() {
        axios.get(getBaseUrl('local') + '/editais?filter={"where":{"tipoEdital":"preInc"}}')
        .then( response => {
            this.setState({editais: response.data})
        })

        if(this.props.editarIsOpen){
            let ddd = this.state.ddd;
            ddd = ddd.slice(0, 2);
            let telefone = this.state.telefone;
            telefone = telefone.slice(2);
            this.setState({ddd: ddd, telefone: telefone})
        }
    }

    handleChangeParticipantes = (index, e) => {
        var newParticipantes = [...this.state.nomeParticipantes]
        newParticipantes[index] = e.target.value
        this.setState({nomeParticipantes: newParticipantes})
     }

    cadastroParticipantes = (qtdParticipantes) => {
        let table = []
    
        for (let i = 0; i < qtdParticipantes; i++) {
          let children = []

          children.push(
            <FormGroup controlId={`Nome ${i}`}>
                <ControlLabel>{`Nome participante ${i + 1}`}</ControlLabel>
                <FormControl type="text" name={`Nome ${i}`} value={this.state.nomeParticipantes[i]} 
                onChange={(e) => this.handleChangeParticipantes(i, e)} />
            </FormGroup>
            )

          table.push(children)
        }
        
        return table
    }

    render() {
        let optionEditais = this.state.editais.map((edital, i) =>
            <option key={i} value={edital.id}>{edital.tipoEdital} - {edital.numeroEdital}</option>
        );

        return (
        <div className="content">
            <Grid fluid>
                <Card
                title="Cadastro Pré-Incubação"
                content={
                    <form onSubmit={this.handleSubmit}>
                        {this.state.error && <p><Label bsStyle="danger">{this.state.error}</Label></p>}
                        <FormGroup controlId="nome">
                            <ControlLabel>Nome do projeto<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="text" name="nome" value={this.state.nome} onChange={this.handleChange} required/>
                        </FormGroup>

                        <FormGroup controlId="descricao">
                            <ControlLabel>Descrição do projeto<span className="text-danger"> *</span></ControlLabel>
                            <FormControl componentClass="textarea" rows="3" name="descricao" value={this.state.descricao} onChange={this.handleChange} required/>
                        </FormGroup>

                        <FormGroup controlId="dataIngresso">
                            <ControlLabel>Data de ingresso</ControlLabel>

                            <TextInputMask
                                name="dataIngresso" className="mask" value={this.state.dataIngresso} onChangeText={this.onChangeData.bind(this)}
                                kind={'datetime'}
                                options={{
                                    format: 'DD-MM-YYYY'
                                }} />
                        </FormGroup>

                        <FormGroup controlId="edital">
                            <ControlLabel>Editais<span className="text-danger"> *</span></ControlLabel>
                            <FormControl componentClass="select" name="edital" onChange={this.handleChange}>
                                <option>Escolha...</option>
                                {optionEditais}
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId="matricula" validationState={this.getValidationNumber(this.state.matricula)}>
                            <ControlLabel>Matrícula<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="number" name="matricula" value={this.state.matricula} onChange={this.handleChange} required/>
                        </FormGroup>

                        <hr></hr>

                        <FormGroup controlId="ddd" validationState={this.getValidationNumber(this.state.ddd)}>
                            <ControlLabel>DDD<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="number" name="ddd" value={this.state.ddd} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup controlId="telefone" validationState={this.getValidationNumber(this.state.telefone)}>
                            <ControlLabel>Telefone<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="number" name="telefone" value={this.state.telefone} onChange={this.handleChange} />
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

                        {this.props.editarIsOpen ? 
                            (
                                ""
                            ) 
                            : 
                            (
                                <FormGroup controlId="qtdParticipantes" validationState={this.getValidationNumber(this.state.qtdParticipantes)}>
                                    <ControlLabel>Quantidade de participantes</ControlLabel>
                                    <FormControl type="number" name="qtdParticipantes" value={this.state.qtdParticipantes} onChange={this.handleChange} />
                                </FormGroup>
                            )
                        }
                        {this.props.editarIsOpen ? ("") : (this.cadastroParticipantes(this.state.qtdParticipantes))}
                        
                        
                        {this.props.editarIsOpen ? 
                        (
                            <Button pullRight fill type="submit">
                                Editar
                            </Button>
                        ) 
                        : 
                        (
                            <Button pullRight fill type="submit">
                                Cadastrar
                            </Button>
                        )
                        }
                        <div className="clearfix" />
                        
                    </form>
                }
                />
            </Grid>
        </div>
        );
    }
}

export default CadastroPreInc;
