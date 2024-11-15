import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup } from '@themesberg/react-bootstrap';

import { UsersTable } from "../tables/UserTable";

const Users = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleNavigate = () => {
        navigate(`/wholesale/store/users/create`);
    };


    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0 mr-0">
                    <Breadcrumb className="title-page" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Crops</Breadcrumb.Item>
                        <Breadcrumb.Item active>Usuarios</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4 className="title-page">Usuarios</h4>
                    <p className="mb-0">Aqui podras ver todos los usuarios de la aplicacion.</p>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <ButtonGroup>
                        <Button variant="outline-primary" size="sm" onClick={() => handleNavigate()}>Agregar</Button>
                        <Button variant="outline-primary" size="sm" >Exportar</Button>
                    </ButtonGroup>
                </div>
            </div>

            <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                    <Col xs={8} md={6} lg={3} xl={4}>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </div>
            <UsersTable searchTerm={searchTerm} />
        </>
    );
};

export default Users;
