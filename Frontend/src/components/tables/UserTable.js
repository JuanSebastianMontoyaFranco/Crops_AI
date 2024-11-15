import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye, faTrashAlt, faSave, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Table, Dropdown, Pagination, ButtonGroup, Button, Spinner } from '@themesberg/react-bootstrap';
import { useNavigate } from 'react-router-dom';

import UserDetailModal from '../modals/UserDetailModal';
import PaginationComponent from '../widgets/PaginationComponent';
import { Context } from "../../context/Context";
import axios from '../../config/axios';

export const UsersTable = ({ searchTerm }) => {
    const navigate = useNavigate();
    const [auth] = useContext(Context);

    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [showDefault, setShowDefault] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const itemsPerPage = 10;


    const fetchUsers = async (currentPage, itemsPerPage, searchTerm) => {
        setLoading(true);
        try {
            const response = await axios.get(`/user/list/?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`);
            const fetchedUsers = response.data.rows;

            if (fetchedUsers.length === 0) {
                setUsers([]);
            } else {
                setUsers(fetchedUsers);
            }
            setTotalUsers(response.data.total);
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]); // Limpiar el estado si ocurre un error
        } finally {
            setLoading(false); // Finalizar carga
        }
    };


    useEffect(() => {
        fetchUsers(page, itemsPerPage, searchTerm);

    }, [page, searchTerm]);


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalUsers / itemsPerPage)) {
            setPage(newPage);
        }
    };

    const handleClose = () => {
        setShowDefault(false);
        setSelectedId(null); // Restablece el ID seleccionado cuando se cierra el modal
    };

    const handleShowDetails = (id) => {
        setSelectedId(id); // Establece el ID seleccionado
        setShowDefault(true); // Muestra el modal
    };

    const handleEditUser = (id) => {
        navigate(`/wholesale/store/users/edit/${id}`);
    };

    const TableRow = (props) => {
        const { id, first_name, last_name, email, state, wholesale_price_list, wholesale_seller } = props;

        return (
            <tr>
                <td>
                    <span className="fw-normal">
                        {id}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {state === 1 ? (
                            <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                        ) : (
                            <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
                        )}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {first_name} {last_name}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {email}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {wholesale_price_list?.name || "No asignado"}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {wholesale_seller?.first_name || "No asignado"}
                    </span>
                </td>
                <td>
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0" style={{ paddingRight: "20px" }}>
                            <span className="icon icon-sm">
                                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleShowDetails(id)}>
                                <FontAwesomeIcon icon={faEye} className="me-2" /> Detalles
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleEditUser(id)}>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Editar
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        );
    };

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    {loading ? ( // Condición para mostrar el spinner
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px', width: '100%' }}>
                            <Spinner animation="border" role="status" />
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    ) : (
                        <Table hover className="user-table align-items-center">
                            <thead>
                                <tr>
                                    <th className="border-bottom">ID</th>
                                    <th className="border-bottom">Estado</th>
                                    <th className="border-bottom">Nombre</th>
                                    <th className="border-bottom">Email</th>
                                    <th className="border-bottom">Lista de Precios</th>
                                    <th className="border-bottom">Vendedor</th>
                                    <th className="border-bottom">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length > 0 ? (
                                    users.map(user => <TableRow key={user.id} {...user} />)
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center mt-6">
                                            No se encontraron usuarios que coincidan con la búsqueda.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    <Nav>
                        <PaginationComponent
                            currentPage={page}
                            totalItems={totalUsers}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                        />
                    </Nav>
                    <small className="fw-bold">
                        Mostrando <b>{(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, totalUsers)}</b> de un total de <b>{totalUsers}</b> usuarios
                    </small>
                </Card.Footer>
            </Card>
            <UserDetailModal show={showDefault} handleClose={handleClose} selectedId={selectedId} />
        </>
    );
};