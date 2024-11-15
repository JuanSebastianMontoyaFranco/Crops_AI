import React, { useState } from "react";
import { Col, Row, Card, Form, Button, Spinner } from '@themesberg/react-bootstrap';
import axios from '../../config/axios';

export const PredictionForm = () => {
    const [formData, setFormData] = useState({
        N: '',
        P: '',
        K: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: ''
    });
    const [loading, setLoading] = useState(false); // Para manejar el estado de carga
    const [response, setResponse] = useState(null); // Para almacenar la respuesta del backend

    // Manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Mostrar el spinner mientras se espera la respuesta
        setResponse(null); // Limpiar la respuesta anterior

        try {
            const res = await axios.post('/prediction/crops', formData);
            setResponse(res.data); // Guardar la respuesta del backend
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        } finally {
            setLoading(false); // Ocultar el spinner cuando se recibe la respuesta
        }
    };

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Predice</h5>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={3} className="mb-3">
                            <Form.Group>
                                <Form.Label>Nitrógeno (N)</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Ingresa el nivel de Nitrógeno"
                                    name="N"
                                    value={formData.N}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3} className="mb-3">
                            <Form.Group>
                                <Form.Label>Fósforo (P)</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Ingresa el nivel de Fósforo"
                                    name="P"
                                    value={formData.P}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3} className="mb-3">
                            <Form.Group>
                                <Form.Label>Potasio (K)</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Ingresa el nivel de Potasio"
                                    name="K"
                                    value={formData.K}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3} className="mb-3">
                            <Form.Group>
                                <Form.Label>Temperatura</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Ingresa la temperatura"
                                    name="temperature"
                                    value={formData.temperature}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} className="mb-3">
                            <Form.Group>
                                <Form.Label>Humedad</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Ingresa el nivel de Humedad"
                                    name="humidity"
                                    value={formData.humidity}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3} className="mb-3">
                            <Form.Group>
                                <Form.Label>PH</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Ingresa el valor de PH"
                                    name="ph"
                                    value={formData.ph}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3} className="mb-3">
                            <Form.Group>
                                <Form.Label>Precipitación</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Ingresa el nivel de Precipitación"
                                    name="rainfall"
                                    value={formData.rainfall}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="mt-3">
                        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Enviar'}
                        </Button>
                    </div>
                </Form>

                {/* Mostrar respuesta del backend */}
                {response && (
                    <div className="mt-4">
                        <h5>Resultado de la predicción:</h5>
                        <p>Cultivo recomendado: {response.crop}</p>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};
