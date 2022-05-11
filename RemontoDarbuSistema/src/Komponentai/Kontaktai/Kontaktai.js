import React, { useState } from 'react';
import './Kontaktai.css';
import { useForm } from "react-hook-form";
import { Container } from 'react-bootstrap';
import Krovimas from '../Krovimas/Krovimas';
import ContactUs from './Contact-us.gif';

const Kontaktai = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
// formos registravimas
    const { register, handleSubmit, reset } = useForm();
    // callinamas back endo post message endpointas
    const onSubmit = data => {
        setIsLoading(true);

        fetch("https://localhost:5001/api/Messages", {
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
// zinutes palikimas pagrindiniame puslapyje su forma bei postu i duomenu baze
    return (
        <Container className="my-4 booking">
            <div className="kontaktas">
            <div className="kontaktas-baneris text-center">
                <h4 className="display-6 cursive-text kontaktas-baneris">
                    Iškilo klausimų? Susisiekite su mumis
                  </h4>
                <div>
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
                                            Ačiū, kad kontaktuojate su mumis
                                        </div>

                                        :

                                        <div className="card h-100 border-0 d-flex align-items-center justify-content-center ">
                                            <img className="img-fluid" src={ContactUs} alt="kontakt us" />
                                        </div>
                                }
                            </div>

                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="card h-100">
                                    <form className="bg-white p-4" onSubmit={handleSubmit(onSubmit)}>
                                        <h6 className="form-control border-0 fw-bold fs-5 mb-3 kontaktas-titulas text-center">
                                            Žinutės forma
                                        </h6>

                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="text"
                                                placeholder="Vardas"
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
                                            <textarea
                                                className="form-control border-0 border-bottom"
                                                type="text"
                                                placeholder="Jūsų žinutė"
                                                {...register("Messsage", { required: true })}>
                                            </textarea>
                                        </div>

                                        <input className="btn btn-info py-2 fw-normal text-white w-100" type="submit" value="Pateikti" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </Container>
    );
};

export default Kontaktai;