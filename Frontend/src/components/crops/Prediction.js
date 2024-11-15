import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup } from '@themesberg/react-bootstrap';
import { PredictionForm } from "../forms/PredictionForm";

const Prediction = () => {

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0 mr-0">
                    <Breadcrumb className="title-page" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Crops</Breadcrumb.Item>
                        <Breadcrumb.Item>Cultivos</Breadcrumb.Item>
                        <Breadcrumb.Item active>Prediccion</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4 className="title-page">Prediccion</h4>
                    <p className="mb-0">Aqui podras predecir el mejor cultivo.</p>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <ButtonGroup>
                        <Button variant="outline-primary" size="sm" onClick={() => handleNavigate()}>Agregar</Button>
                        <Button variant="outline-primary" size="sm" >Exportar</Button>
                    </ButtonGroup>
                </div>
            </div>
            <PredictionForm />

        </>
    );
};

export default Prediction;
