import React, { Component } from "react";
import ReactSpeedometer from "react-d3-speedometer"
import { Label, Row, Col, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import getBaseUrl from "./../../services/api";
import axios from 'axios';
import Modal from 'react-responsive-modal';
import TextInputMask from 'react-masked-text';


class MetasAnuais extends Component {
    constructor(props) {
        super(props);

        this.state = {
            metasAnuais: [],
            ano: '2018',
            resultadosChave: [],
            responsavel: '',
            porcentagem: '',
            data: '',
            observacoes: '',
            idObjetivo: '',
            idResultadoChave: '',
            open: false,
            error: ''
        }

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };
      
    onChangeData(text) {
        this.setState({data : text})
    }

    getValidationNumber(number) {
        
        if (number <= 0) return 'error';
        else if(number > 0) return 'success';
        return null;
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });

        if(evt.target.name === 'idObjetivo'){
            axios.get(getBaseUrl('local') + '/objetivosOKR/' + evt.target.value + '/chaves')
            .then( response => {
                this.setState({resultadosChave: response.data})
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({error: ''})

        if(this.state.error !== ''){
            console.log("deu ruim")
            return;
        }else {
            console.log("tudo ok")
        }
    
        const dadosAtt = {
            porcentagem: this.state.porcentagem,
            data: this.state.data,
            responsavel: this.state.responsavel,
            observacoes: this.state.observacoes
        }
        //Cadastra nova atualização
        axios.post(getBaseUrl('local') + '/resultadosChaveOKR/' + this.state.idResultadoChave + "/attResultadoChave", dadosAtt)
        .then(res => {        
            if(res.status === 200){
                const dadosPatchChave = {
                    porcentagem: this.state.porcentagem
                }
                //Atualiza o valor da porcentagem do resultado chave
                axios.patch(getBaseUrl('local') + '/resultadosChaveOKR/' + this.state.idResultadoChave, dadosPatchChave)
                .then(res => {
                    if(res.status === 200){
                        axios.get(getBaseUrl('local') + '/objetivosOKR/' + this.state.idObjetivo + '/chaves')
                        .then(res => {
                            if(res.status === 200){
                                let porcentagem = 0
                                let qtdChaves = 0

                                res.data.map((chave, key) => {
                                    porcentagem += chave.porcentagem,
                                    qtdChaves++
                                });
                                console.log(qtdChaves)
                                const dadosPatchObjetivo = {
                                    porcentagem: porcentagem / qtdChaves
                                }

                                //Atualiza o valor da porcentagem do objetivo
                                axios.patch(getBaseUrl('local') + '/objetivosOKR/' + this.state.idObjetivo, dadosPatchObjetivo)
                                .then(res => {
                                    if(res.status === 200){
                                        window.location.reload();
                                    }
                                })
                                .catch(error => {
                                    console.log(error)
                                    this.setState({
                                        error: error.response.data.error.message
                                    });
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            this.setState({
                                error: error.response.data.error.message
                            });
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        error: error.response.data.error.message
                    });
                })
            }
        })
        .catch(error => {
            this.setState({
                error: error.response.data.error.message
            });
        })
    }

    componentDidMount() {
        axios.get(getBaseUrl('local') + '/objetivosOKR?filter={ "where":{"tipo": "Anual"} }')
        .then( response => {
            this.setState({metasAnuais: response.data})
        })
    }

    render() {
        let optionObjetivos = this.state.metasAnuais.map((objetivo, i) =>
            <option key={i} value={objetivo.id}>{objetivo.nome}</option>
        );

        let optionChaves = this.state.resultadosChave.map((chave, i) =>
            <option key={i} value={chave.id}>{chave.nome}</option>
        );

        return (
            <div className="content">
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Selecione o ano</ControlLabel>
                    <FormControl componentClass="select" name="ano" onChange={this.handleChange}>
                        <option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option>
                    </FormControl>
                </FormGroup>

                <Button fill onClick={this.onOpenModal}>Cadastrar atualização</Button>
                <Modal open={this.state.open} onClose={this.onCloseModal} >
                    <h2>Atualizar objetivo</h2>
                    <form onSubmit={this.handleSubmit}>
                        {this.state.error && <p><Label bsStyle="danger">{this.state.error}</Label></p>}

                        <FormGroup controlId="idObjetivo">
                            <ControlLabel>Objetivo<span className="text-danger"> *</span></ControlLabel>
                            <FormControl componentClass="select" name="idObjetivo" onChange={this.handleChange}>
                            <option>Escolha um objetivo...</option>
                            {optionObjetivos}
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId="idResultadoChave">
                            <ControlLabel>Resultados Chave<span className="text-danger"> *</span></ControlLabel>
                            <FormControl componentClass="select" name="idResultadoChave" onChange={this.handleChange}>
                            <option>Escolha uma chave...</option>
                            {optionChaves}
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId="responsavel">
                            <ControlLabel>Responsável<span className="text-danger"> *</span></ControlLabel>
                            <FormControl componentClass="select" name="responsavel" onChange={this.handleChange}>
                                <option>Escolha um responsável...</option>
                                <option value="iris">Iris</option>
                                <option value="marcelo">Marcelo</option>
                                <option value="raquel">Raquel</option>
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId="porcentagem" validationState={this.getValidationNumber(this.state.porcentagem)}>
                            <ControlLabel>Resultado %<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="number" name="porcentagem" value={this.state.porcentagem} onChange={this.handleChange} min="0" max="100" required/>
                        </FormGroup>

                        <FormGroup controlId="data">
                            <ControlLabel>Data</ControlLabel>

                            <TextInputMask
                                name="data" className="mask" value={this.state.data} onChangeText={this.onChangeData.bind(this)}
                                kind={'datetime'}
                                options={{
                                    format: 'DD-MM-YYYY'
                                }} />
                        </FormGroup>

                        <FormGroup controlId="observacoes">
                            <ControlLabel>Observações</ControlLabel>
                            <FormControl componentClass="textarea" name="observacoes" value={this.state.observacoes} onChange={this.handleChange}/>
                        </FormGroup>

                        <Button pullRight fill type="submit">
                            Cadastrar
                        </Button>

                        <div className="clearfix" />
                    </form>
                </Modal>

                <Card
                    title={this.state.ano}
                    content={
                        <div>
                            <Row>
                                {this.state.metasAnuais.map((prop, key) => {
                                    if(prop.ano === this.state.ano){
                                        let porcentagem = "Porcentagem Atual: " + prop.porcentagem;
                                        return (
                                            <Col md={4}>
                                                <p className="text-dark">{prop.nome}</p>
                                                <ReactSpeedometer
                                                    maxValue={100}
                                                    value={prop.porcentagem}
                                                    needleTransitionDuration={4000}
                                                    needleTransition="easeElastic"
                                                    currentValueText={porcentagem}
                                                    segments={3}
                                                    key={key}
                                                />
                                            </Col>
                                        )
                                    }
                                })}

                            </Row>                            
                        </div>
                    }
                />

            </div>
        )
    }
            
}

export default MetasAnuais;
