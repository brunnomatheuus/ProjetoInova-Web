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

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";



class CadastroEdital extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prazo: 12,
            tipoEdital: 'acelera',
            numeroEdital: 20182,
            valores: 150,
            error: ''
        };

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
        var a = this.state.prazo;
        var b = this.state.numeroEdital;
        var c = this.state.valores;
        
        if(evt.target.name === 'prazo'){
            a = evt.target.value;
            b = this.state.numeroEdital;
            c = this.state.valores;

        }else if(evt.target.name === 'numeroEdital'){
            a = this.state.prazo;
            b = evt.target.value;
            c = this.state.valores;

        }else if(evt.target.name === 'valores'){
            a = this.state.prazo;
            b = this.state.numeroEdital;
            c = evt.target.value;
        }
        if(a <= 0 || b <= 0 || c <= 0)
            this.setState({error: 'Não é possível preencher com valores menores/iguais a zero'})
        else if(a > 0 && b > 0 && c > 0)
            this.setState({error: ''})
       
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.error !== ''){
            console.log("deu ruim")
            return;
        }else {
            const dados = {
                prazo: this.state.prazo,
                tipoEdital: this.state.tipoEdital,
                numeroEdital: this.state.numeroEdital,
                valores: this.state.valores,
            }
        
            axios.post(getBaseUrl('local') + '/editais', dados)
            .then(res => {        
                if(res.status === 200){
                    window.location.reload();
                }
            })
            .catch(err => {
                this.setState({
                    error: err
                });
            })
        }        
    }

    render() {
        return (
        <div className="content">
            <Grid fluid>
                <Card
                title="Cadastro Edital"
                content={
                    <form onSubmit={this.handleSubmit}>
                        {this.state.error && <p><Label bsStyle="danger">{this.state.error}</Label></p>}
                        <FormGroup controlId="prazo" validationState={this.getValidationNumber(this.state.prazo)}>
                            <ControlLabel>Prazo em meses<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="number" name="prazo" placeholder={this.state.prazo} onChange={this.handleChange} required/>
                        </FormGroup>

                        <FormGroup controlId="tipoEdital">
                            <ControlLabel>Tipo Edital<span className="text-danger"> *</span></ControlLabel>
                            <FormControl componentClass="select" name="tipoEdital" value={this.state.value} onChange={this.handleChange} required>
                                <option value="acelera" defaultValue>Acelera</option>
                                <option value="preInc">Pré-Incubada</option>
                                <option value="Inc">Incubada</option>
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId="numeroEdital" validationState={this.getValidationNumber(this.state.numeroEdital)}>
                            <ControlLabel>Número do edital<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="number" name="numeroEdital" placeholder={this.state.numeroEdital} onChange={this.handleChange} required/>
                        </FormGroup>

                        <FormGroup controlId="valores" validationState={this.getValidationNumber(this.state.valores)}>
                            <ControlLabel>Valor<span className="text-danger"> *</span></ControlLabel>
                            <FormControl type="number" name="valores" placeholder={this.state.valores} onChange={this.handleChange} required/>
                        </FormGroup>

                        
                        <Button pullRight fill type="submit">
                            Cadastrar
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

export default CadastroEdital;
