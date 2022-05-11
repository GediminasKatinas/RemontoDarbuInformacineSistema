import React, { useState } from 'react';
import './PagrindinioLangoAtsiliepimai.css';
import { useForm } from "react-hook-form";
import { Container } from 'react-bootstrap';
import Krovimas from '../Krovimas/Krovimas';
import writingGif from './writing.gif';
import useAuth from '../../Hooks/useAuth';

const PagrindinioLangoAtsiliepimai = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [rodytigif, setrodytigif] = useState(false);

    const { user } = useAuth();

    // postas atsiliepimo
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        setIsLoading(true);

        fetch("https://localhost:5001/api/PageReviews", {
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
                    setrodytigif(true);
                    setTimeout(() => {
                        setrodytigif(false);
                    }, 3000);
                };
            });
    };


    return (
        <Container className="my-4 atsiliepimas">
            {
                isLoading
                    ?
                    <Krovimas>

                    </Krovimas>
                    :
                    <div>
                        <div className="row g-4">
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="card h-100">
                                    <form className="bg-white p-4" onSubmit={handleSubmit(onSubmit)}>
                                        <h6 className="form-control atsiliepimas-titulas border-0 fw-bold fs-5 mb-3 text-center">
                                            Palikite atsiliepima
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
                                                placeholder="example@email.com"
                                                {...register("Email", { required: true })}
                                            />
                                        </div>

                                            <div className="mb-3">
                                            <select
                                                class="form-select"
                                                {...register("Rating", { required: true })}
                                            >
                                                <option selected>Reitingas</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <textarea
                                                className="form-control border-0 border-bottom"
                                                placeholder="Žinutė"
                                                {...register("Description", { required: true })}>
                                            </textarea>
                                        </div>

                                        <input className="btn btn-info fw-normal text-white w-100 py-2" type="submit" value="Pateikti" />
                                    </form>
                                </div>
                            </div>


                    <div className="col col-12 col-md-6 col-sm-12">
                                {
                                rodytigif
                                      ?
                                        <div className="alert alert-success">
                                            Sėkmingai paliktas atsiliepimas
                                        </div>

                                        :

                                        <div className="card h-100 border-0 d-flex align-items-center justify-content-center">
                                            <img className="img-fluid" 
                                            src={writingGif} 
                                            alt="writing"
                                             />
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
            }
        </Container>
    );
};

export default PagrindinioLangoAtsiliepimai;