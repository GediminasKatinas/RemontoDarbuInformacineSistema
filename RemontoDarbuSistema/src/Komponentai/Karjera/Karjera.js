import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Container } from 'react-bootstrap';
import Krovimas from '../Krovimas/Krovimas';
import './Karjera.css';

const Karjera = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false)

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        setIsLoading(true);

        fetch("https://localhost:5001/api/JobApplications", {
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
                    reset();
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000);
                };
            });
    };
// karjeros puslapis, kuriam galima pretenduoti i open pozicijas, siuo atveju yra tik viena
    return (
        <Container className="my-4 booking">
            <div className="product-banner text-center">
                <h4 className="display-6 cursive-text product-title">
                    Ieškomas data engineer
                </h4>
                <div>
                    <div>
                        <small className="text-muted small-text">
                            Jei turite patirties susisiekite su mumis
                        </small>
                    </div>
                </div>
            </div>

            {
                isLoading
                    ?
                    <Krovimas></Krovimas>
                    :
                    <div>
                        <div className="row g-4">
                            <div className="col col-12 col-sm-12 col-md-6">
                                {
                                    showAlert
                                        ?
                                        <div className="alert alert-success">
                                            Ačiū, jog aplikuojate
                                        </div>

                                        :

                                        <div className="card h-100 border-0 d-flex align-items-center justify-content-center">
                                            <img className="img-fluid" src="https://i.ibb.co/7Qk9KXy/i-Stock-879134704-1.jpg" alt="job" />
                                        </div>
                                }
                            </div>

                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="card h-100">
                                    <form className="bg-white p-4" onSubmit={handleSubmit(onSubmit)}>
                                        <h6 className="form-control border-0 fw-bold fs-5 mb-3 booking-title text-center">
                                            Darbo aplikacijos forma
                                        </h6>

                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="text"
                                                placeholder="Vardas ir pavardė"
                                                {...register("Name", { required: true })}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="email"
                                                placeholder="El paštas"
                                                {...register("Email", { required: true })}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="text"
                                                placeholder="Norima pozicija"
                                                {...register("JobType", { required: true })}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="text"
                                                placeholder="Jūsų įgudžiai"
                                                {...register("Description", { required: true })}
                                            />
                                        </div>

                                        <input className="btn btn-info text-white w-100 py-2 fw-normal" type="submit" value="Pateikti" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </Container>
    );
};

export default Karjera;