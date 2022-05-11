import React, { useEffect, useState } from 'react';
import './Meistras.css';
import { Container } from 'react-bootstrap';
import useAuth from '../../Hooks/useAuth';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Krovimas from '../Krovimas/Krovimas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import CalendarTemplate from '../Kalendorius/Calendar';


const Meistras = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(true);


    const { Id } = useParams();
    const [product, setProduct] = useState({});
    const parsed = JSON.parse(JSON.stringify(Id));
    const [availability, setAvailability] = useState([])
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    //kalendoriaus templeitas
    const Calendar = CalendarTemplate({
      availability,
      
      setAvailability: update => {
        fetch("https://localhost:5001/api/Reservations", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
            'UserId' : (parsed), 'ReservationTimes':(update) 
              })
        })
        setAvailability(update)
        setIsDateSelected(false);

    },
    });
//paimamos rezervacijos is db pagal meistro id
    const [data, setData] = useState({});
    useEffect(() => {
      fetch(`https://localhost:5001/api/Reservations/${Id}`)
          .then(res => res.json())
          .then(data => {
              setData(data);
              setAvailability(data);
              
          });
  },
   []);
    useEffect(() => {
        fetch(`https://localhost:5001/api/services/${Id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            });
    },
     []);
     const onSubmit = data => {
        data.status = "Nepatvirtinta";
        data.ServiceId= Id;
        setIsLoading(true);

        fetch("https://localhost:5001/api/UserReservations", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.Id) {
                    setIsLoading(false);
                    setIsDateSelected(true);
                    history.push("/skydelis");

                };
            });
    };
    return (
        <Container className="my-4 meistras">
            {
                isLoading
                    ?
                    <Krovimas></Krovimas>
                    :
                    <div>
                        <div class="container mt-5 mb-5">
    <div class="row no-gutters">
                        <div class="col-md-4 col-lg-4">
                            <img src={product.Image}/>
                            </div>
                    <div class="col-md-8 col-lg-8">
                      <div class="d-flex flex-column">
                <div class="d-flex flex-row p-5 bg-dark text-white justify-content-between align-items-center">
                    <h3 class="display-5">{product.Name}</h3><i class="fa fa-facebook"></i><i class="fa fa-google"></i><i class="fa fa-phone"></i><i class="fa fa-envelope"></i><i class="fa fa-linkedin"></i>
                </div>
                <div class="p-3 bg-black text-white">
                    <h6>{product.Description}</h6>
                    <FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" />
                                                    <FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" /><FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" />
                                                <FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" />
                                                <FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" />
                                            
                </div>
                <div class="d-flex flex-row text-white">
                    <div class="p-4 bg-primary text-center skill-block">
                        <h4>{product.City}</h4>
                        <h6>Miestas</h6>
                    </div>

                    <div class="p-3 bg-warning text-center skill-block">
                        <h4>{product.PhoneNumber}</h4>
                        <h6>Telefono numeris</h6>
                    </div>
                    <div class="p-3 bg-danger text-center skill-block">
                        <h4>${product.HourlyPrice}/val</h4>
                        <h6>Kaina</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
                        <div className="row g-4 justify-content-center">
                    {
                    isDateSelected
                    ?
                    <Calendar />
                    :
                               <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                                  <div className="card h-100">
                                     <form className="bg-white p-4" onSubmit={handleSubmit(onSubmit)}>

                                        <h6 className="form-control meistras-title text-center border-0 fw-bold fs-5 mb-3">
                                            Rezervuoto laiko patvirtinimas
                                        </h6>

                                         <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="text"
                                                placeholder="Jūsų vardas"
                                                {...register("Name", { required: true })}
                                            />
                                          </div>

                                            <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="email"
                                                placeholder="El paštas"
                                                {...register("Email", { required: true })} />
                                            </div>

                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="text"
                                                placeholder="Telefono numeris"
                                                {...register("Phone", { required: true })} />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="text"
                                                placeholder="Darbų atlikimo adresas"
                                                {...register("Address", { required: true })} />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="text"
                                                placeholder="Meistro vardas"
                                                value={product.Name}
                                                readOnly
                                                {...register("ServiceName")}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="number"
                                                placeholder="0.00"
                                                value={product.HourlyPrice}
                                                readOnly
                                                {...register("Price")}
                                            />
                                        </div>

                                        <input className="btn btn-info py-2 fw-normal text-white w-100" type="submit" value="Patvirtinti rezervacija" />
                                    </form>
                                    </div>
                             </div>
                             }
                          </div>
                     </div>
            }
        </Container>
    );
};

export default Meistras;