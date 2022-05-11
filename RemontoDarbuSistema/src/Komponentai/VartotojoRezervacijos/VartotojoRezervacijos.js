import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../Hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Krovimas from '../Krovimas/Krovimas';
import './VartotojoRezervacijos.css';

const VartotojoRezervacijos = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    const handleOrderDelete = id => {
        const confirm = window.confirm("Ar esi tikras?");

        if (confirm) {

            fetch(`https://localhost:5001/api/UserReservations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result.Id) {
                            setIsLoading(true);
                                };
                });
        };
    };

    useEffect(() => {
        fetch(`https://localhost:5001/api/UserReservations/${user.email}/getReservationsByEmail`)
            .then(res => res.json())
            .then(data => {
                setMyOrders(data);
                setIsLoading(false);
            });
    }, [isLoading]);

    return (
        <Container className="mano-rezervacijos my-5">
            <h2 className="pink-text cursive-text display-6 text-center mb-4">Mano užsakytos rezervacijos</h2>

            {isLoading ?
                <Krovimas>

                </Krovimas>
                :
                <div className="table-container">
                    <table>
                        <tr>
                            <th>Užsakymo ID</th>
                            <th>Vardas</th>
                            <th>El paštas</th>
                            <th>Telefonas</th>
                            <th>Adresas</th>
                            <th>Meistras</th>
                            <th>Kaina</th>
                            <th>Statusas</th>
                        </tr>

                        {
                            myOrders.map(order => {
                                return (
                                    <tr key={order.Id}>
                                        <td>
                                            {order.Id}
                                        </td>

                                        <td>
                                            {order.Name}
                                        </td>

                                        <td>
                                            {order.Email}
                                        </td>

                                        <td>
                                            {order.Phone}
                                        </td>

                                        <td>
                                            {order.Address}
                                        </td>

                                        <td>
                                            {order.ServiceName}
                                        </td>

                                        <td>
                                            {order.Price}
                                        </td>

                                        <td>
                                            {
                                                order.Status === "Nepatvirtinta"
                                                    ?
                                                    <span className="badge bg-warning fs-6 py-2">{order.Status}</span>
                                                    :
                                                    <span className="badge bg-success fs-6 py-2">{order.Status}</span>
                                            }
                                        </td>

                                        <td>
                                            <button
                                            
                                                onClick={() => handleOrderDelete(order.Id)}
                                                className="btn btn-danger">
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </table>
                </div>
            }
        </Container >
    );
};

export default VartotojoRezervacijos;