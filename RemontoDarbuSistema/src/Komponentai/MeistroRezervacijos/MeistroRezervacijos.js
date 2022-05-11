import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../Hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import Krovimas from '../Krovimas/Krovimas';
import './MeistroRezervacijos.css';
import emailjs, { init } from "@emailjs/browser";


const MeistroRezervacijos = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    // istrinimas rezervacijos, su windows confirmationu
    const handleOrderDelete = id => {
        const confirm = window.confirm("Ar esi tikras");

        if (confirm) {

            fetch(`https://localhost:5001/api/UserReservations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result.id) {
                        setIsLoading(true);
                    };
                });
        };
    };   

    //emailo siuntimas
    const handleSubmit = (Name, ServiceName, Email, Id) => {
        let templateParams = {
            name: Name,
            ServiceName: ServiceName,
            email: Email,
            Id: Id,
        }
        emailjs.sendForm("service_hcpaxa9", "template_kwgc5ju", templateParams, "NCRyhDZodbd2t54A9").then(
          (result) => {
            alert("Message Sent Successfully");
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      };
//uzpopuliuoja visas rezervacijas pagal endpointo call
    useEffect(() => {
        fetch(`https://localhost:5001/api/UserReservations/${user.email}/getServiceReservationsByEmail`)
            .then(res => res.json())
            .then(data => {
                setMyOrders(data);
                setIsLoading(false);
            });
    }, [isLoading]);
    const handleOrderUpdate = id => {
        let data = {};

        fetch(`https://localhost:5001/api/UserReservations/${id}`)
            .then(res => res.json())
            .then(result => {
                result.Status = "Patvirtinta";
                data = result;

                // Update Data
                fetch(`https://localhost:5001/api/UserReservations/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                })
                    .then(response => response.json())
                    .then(updatedResult => {
                        if (updatedResult.id) {
                                setIsLoading(true);

                        };
                    });
            });
    };

    return (
        <Container className="meistro-rezervacijos my-5">
            <h2 className="pink-text text-center mb-4 cursive-text display-6">Mano paslaugos rezervacijos</h2>

            {isLoading 
            ?
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
                                            {order.Status === "Nepatvirtinta"
                                                    ?<span className="badge bg-warning fs-6 py-2">{order.Status}</span>
                                                    :<span className="badge bg-success fs-6 py-2">{order.Status}</span>}
                                        </td>

                                        <td>

                                            <button
                                                onClick={() => handleOrderDelete(order.Id)}
                                                className="btn btn-danger">
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </td>
                                        <td>
                                                <button
                                                    onClick={() => {handleOrderUpdate(order.Id); handleSubmit(order.Name, order.ServiceName, order.Email, order.Id);}}
                                                    className="btn btn-success">
                                                    <FontAwesomeIcon icon={faCheck} />
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

export default MeistroRezervacijos;