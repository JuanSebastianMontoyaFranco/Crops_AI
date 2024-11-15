import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import { Context } from "../../context/Context";
import axios from "../../config/axios";

const UserDetailModal = ({ show, handleClose, selectedId }) => {
    const [auth] = useContext(Context);
    const [details, setDetails] = useState(null);
    const [priceListName, setPriceListName] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            if (selectedId) {
                try {
                    // Obtener detalles del usuario
                    const response = await axios.get(`/wholesale/user/detail/${selectedId}`);
                    const fetchedDetails = response.data.rows ? response.data.rows[0] : null;
                    setDetails(fetchedDetails);

                    // Llamar a la API para obtener el nombre de la lista de precios
                    if (fetchedDetails && fetchedDetails.price_list_id) {
                        const priceListResponse = await axios.get(`/wholesale/pricelist/detail/${fetchedDetails.price_list_id}`);
                        const fetchedPriceList = priceListResponse.data.rows ? priceListResponse.data.rows[0] : null;
                        setPriceListName(fetchedPriceList ? fetchedPriceList.name : 'No disponible'); // Obtener el nombre de la lista de precios
                    }
                } catch (error) {
                    console.error("Error fetching details:", error);
                }
            }
        };

        fetchDetails();
    }, [selectedId]);

    return (
        <Modal as={Modal.Dialog} centered show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title className="h6">Detalles del usuario</Modal.Title>
                <Button variant="close" aria-label="Close" onClick={handleClose} />
            </Modal.Header>
            <Modal.Body>
                {details ? (
                    <div>
                        <p><strong>ID:</strong> {details.id}</p>
                        <p><strong>Nombre:</strong> {details.first_name} {details.last_name}</p>
                        <p><strong>Email:</strong> {details.email}</p>
                        <p><strong>Teléfono:</strong> {details.phone || 'No disponible'}</p>
                        <p><strong>Dirección:</strong> {details.address || 'No disponible'}</p>
                        <p><strong>Departamento:</strong> {details.department || 'No disponible'}</p>
                        <p><strong>Ciudad:</strong> {details.city || 'No disponible'}</p>
                        <p><strong>Lista de Precios:</strong> {priceListName || 'No disponible'}</p>
                    </div>
                ) : (
                    <p>Cargando detalles...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserDetailModal;
