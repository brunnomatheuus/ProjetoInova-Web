import React, { Component } from "react";
import ReactSpeedometer from "react-d3-speedometer"
import { Grid, Row, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import getBaseUrl from "./../../services/api";
import MetasAnuais from "../../layouts/Metas/MetasAnuais.jsx"
import MetasTrimestrais from "../../layouts/Metas/MetasTrimestrais.jsx"


class VisualizarMetas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            metasAnuais: [],
            metasTrimestrais: [],
            tipo: "anual"
        }

    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    render() {
        return (
            <div className="content">
                <div>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Selecione o tipo</ControlLabel>
                        <FormControl componentClass="select" name="tipo" onChange={this.handleChange}>
                            <option value="anual">Anual</option>
                            <option value="trimestral">Trimestral</option>
                        </FormControl>
                    </FormGroup>
                </div>
                
                <Grid fluid>
                    <Row>
                        {
                            this.state.tipo === "anual" ?
                            ( <MetasAnuais/> )
                            :
                            ( <MetasTrimestrais/> )
                        }
                    </Row>
                </Grid>
            </div>
        )
    }
            
}

export default VisualizarMetas;
