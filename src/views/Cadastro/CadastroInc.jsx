import React, { Component } from "react";
import {
  Grid,
  FormGroup,
  ControlLabel,
  FormControl,
  Label
} from "react-bootstrap";

import TextInputMask from 'react-masked-text';

import getBaseUrl from "./../../services/api";
import axios from 'axios';

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import './../../assets/css/demo.css';

class CadastroInc extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        if(props.editarIsOpen){
            this.state = {
                nome: props.propriedades[0].nome,
                dataIngresso: props.propriedades[0].dataIngresso,
                edital: '',
                matricula: props.propriedades[0].Inc.matricula,
                produto: props.propriedades[0].Inc.produto,
                razaoSocial: props.propriedades[0].Inc.razaoSocial,
                cnpj: props.propriedades[0].Inc.cnpj,
                areaAtuacao: props.propriedades[0].Inc.areaAtuacao,
                representanteLegal: props.propriedades[0].Inc.representanteLegal,
                porte: props.propriedades[0].Inc.porte,
                ddd: props.propriedades[0].contatoEmpresarial.telefone,
                telefone: props.propriedades[0].contatoEmpresarial.telefone,
                email: props.propriedades[0].contatoEmpresarial.email,
                site: props.propriedades[0].contatoEmpresarial.site,
                error: '',
                editais: []
            };
        }else{
            this.state = {
                nome: 'Empresa X',
                dataIngresso: '29-03-2018',
                edital: '',
                matricula: 20182,
                produto: 'Produto Y',
                razaoSocial: 'Empresa X S.A',
                cnpj: '',
                areaAtuacao: 'Tecnologia',
                representanteLegal: 'Marcelao',
                porte: '',
                ddd: '',
                telefone: '',
                email: 'email@email.com',
                site: '',
                editais: [],
                qtdParticipantes: 1,
                nomeParticipantes: [],
                error: ''
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

    onChangeText(text) {
        this.setState({cnpj : text})
    }
    onChangeData(text) {
        this.setState({dataIngresso : text})
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
            tipoPrograma: "inc",
            status: "Ativa",
            Inc: {
                matricula: this.state.matricula,
                produto: this.state.produto,
                razaoSocial: this.state.razaoSocial,
                cnpj: this.state.cnpj,
                areaAtuacao: this.state.areaAtuacao,
                representanteLegal: this.state.representanteLegal,
                porte: this.state.porte
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
                                    error: error
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
        axios.get(getBaseUrl('local') + '/editais?filter={"where":{"tipoEdital":"Inc"}}')
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
                title="Cadastro Incubada"
                content={
                    <form onSubmit={this.handleSubmit}>
                        {this.state.error && <p><Label bsStyle="danger">{this.state.error}</Label></p>}
                        <FormGroup controlId="nome">
                            <ControlLabel>Nome da empresa<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="text" name="nome" value={this.state.nome} onChange={this.handleChange} required/>
                        </FormGroup>

                        <FormGroup controlId="produto">
                            <ControlLabel>Produto<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="text" name="produto" value={this.state.produto} onChange={this.handleChange} required/>
                        </FormGroup>

                        <FormGroup controlId="razaoSocial">
                            <ControlLabel>Razão Social<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="text" name="razaoSocial" value={this.state.razaoSocial} onChange={this.handleChange} required/>
                        </FormGroup>

                        <FormGroup controlId="cnpj">
                            <ControlLabel>CNPJ<span className="text-danger"> *</span></ControlLabel>

                            <TextInputMask
                                name="cnpj" className="mask" value={this.state.cnpj} onChangeText={this.onChangeText.bind(this)} required
                                
                                kind={'cnpj'}/>
                        </FormGroup>

                        <FormGroup controlId="areaAtuacao">
                            <ControlLabel>Área de Atuação<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="text" name="areaAtuacao" value={this.state.areaAtuacao} onChange={this.handleChange} required/>
                        </FormGroup>

                        <FormGroup controlId="representanteLegal">
                            <ControlLabel>Representante legal<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="text" name="representanteLegal" value={this.state.representanteLegal} onChange={this.handleChange} required/>
                        </FormGroup>

                        <FormGroup controlId="porte">
                            <ControlLabel>Porte<span className="text-danger"> *</span></ControlLabel>
                            <FormControl componentClass="select" name="porte" value={this.state.porte} onChange={this.handleChange} required>
                                <option>Escolha...</option>
                                <option value="Microempreendedor Individual">Microempreendedor Individual (MEI) - Faturamento anual o valor de R$81 mil</option>
                                <option value="Micro Empresa">Micro Empresa (ME) - Receita bruta anual inferior ou igual a R$ 360 mil</option>
                                <option value="Empresa de Pequeno Porte">Empresa de Pequeno Porte (EPP) - Limite de faturamento anual de R$ 4,8 milhões</option>
                                <option value="Empresa Normal">Empresa Normal - Receita bruta anual acima de R$ 4,8 milhões</option>
                            </FormControl>
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

export default CadastroInc;
