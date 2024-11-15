import React, { useContext, useState } from "react";
import axios from "../../config/axios";
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Card, FormCheck } from '@themesberg/react-bootstrap';
import { simpleAlert } from "../alerts/Alerts";
import { Routes } from "../../routes";

// Context
import { Context } from "../../context/Context";

function Login() {

    // Auth y token
    const [auth, saveAuth] = useContext(Context); // eslint-disable-line no-unused-vars

    const navigate = useNavigate();

    // State con los datos del formulario
    const [credentials, saveCredentials] = useState({});

    const login = async e => {
        e.preventDefault();

        // Autenticar el usuario
        try {
            const respuesta = await axios.post('/user/login', credentials);
            // extraer el token y colocarlo en el localstorage
            const { token, user } = respuesta.data;
            localStorage.setItem('token', token);

            // Colocarlo en el state
            saveAuth({
                // User
                user_id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                department: user.department,
                city: user.city,
                role: user.role,
                token,
                state: user.state,
                confirmed: user.confirmed,
                image_url: user.image_url,
                auth: true
            });

            // alerta
            simpleAlert(
                'Bienvenido',
                'success',
                'Has iniciado sesión correctamente',
            )

            navigate('/dashboard');

        } catch (error) {
            simpleAlert(
                'Oops...',
                'error',
                error.response.data.message
            )
        }
    };

    const Data = e => {
        saveCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <p className="text-center">
                        <Card.Link as={Link} to={Routes.Landing.path} className="text-gray-700">
                            <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Regresa al inicio
                        </Card.Link>
                    </p>
                    <Row className="justify-content-center form-bg-image" >
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h2 className="mb-0">Toppo Mayorista</h2>
                                    <h3 className="mb-0">Ingresa como mayorista</h3>
                                </div>
                                <Form className="mt-4" onSubmit={login}>

                                    <Form.Group id="email" className="mb-4">
                                        <Form.Label>Tu correo</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text>
                                            <Form.Control 
                                            autoFocus 
                                            required 
                                            type="email"
                                            name="email"
                                            placeholder="example@company.com" 
                                            onChange={Data}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group>

                                        <Form.Group id="password" className="mb-4">
                                            <Form.Label>Tu contraseña</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faUnlockAlt} />
                                                </InputGroup.Text>
                                                <Form.Control 
                                                required 
                                                type="password" 
                                                name="password"
                                                placeholder="Contraseña" 
                                                onChange={Data}
                                                />
                                            </InputGroup>
                                        </Form.Group>


                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <Card.Link className="small text-end">¿Olvidaste tu contraseña?</Card.Link>
                                        </div>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Ingresa
                                    </Button>
                                </Form>

                                <div className="d-flex justify-content-center align-items-center mt-4">
                                    <span className="fw-normal">
                                        ¿No estás registrado?
                                        <Card.Link as={Link} to={Routes.Register.path} className="fw-bold">
                                            {` Crea una cuenta `}
                                        </Card.Link>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
}
export default Login;
