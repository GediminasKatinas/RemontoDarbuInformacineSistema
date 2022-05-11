import React, { useState } from 'react';
import './PridetiProdukta.css';
import { useForm } from "react-hook-form";
import { Container } from 'react-bootstrap';
import Krovimas from '../Krovimas/Krovimas';
import workingGif from './working.gif';
import useAuth from '../../Hooks/useAuth';

const PridetiProdukta = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [rodytikrovima, setRodytikrovima] = useState(false)
    const { user } = useAuth();

    const { register, handleSubmit, reset } = useForm();
    //paslaugos pridejimo forma ir postinimas i back enda
    const onSubmit = data => {
        setIsLoading(true);
        data.UserEmail = user.email;

        fetch("https://localhost:5001/api/Services", {
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
                    setRodytikrovima(true);
                    setTimeout(() => {
                        setRodytikrovima(false);
                    }, 3000);
                };
            });
    };

    return (
        <Container className="my-4 pridejimas">
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
                                        <h6 className="form-controlmb-3 pridejimas-title text-center border-0 fw-bold fs-5 ">
                                            Pridėti paslauga
                                        </h6>

                                        <div className="mb-3">                                                                              <select
                                                class="form-select"
                                                {...register("Type", { required: true })}
                                            >
                                                <option selected>Paslaugos tipas</option>
                                                <option value="Remontas">Remontas</option>
                                                <option value="Santechnika">Santechnika</option>
                                                <option value="Valymas">Valymas</option>
                                                <option value="Buitis">Buitis</option>
                                                <option value="Pagalba">Pagalba</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="text"
                                                placeholder="Paslaugos image"
                                                {...register("Image", { required: true })}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="text"
                                                placeholder="Paslaugos pavadinimas"
                                                {...register("Name", { required: true })}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="text"
                                                placeholder="Paslaugos trumpas aprašymas"
                                                {...register("ShortDescription", { required: true })}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <textarea
                                                className="form-control border-0 border-bottom"
                                                placeholder="Detalus aprašymas"
                                                {...register("Description", { required: true })}
                                            >
                                            </textarea>
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="number"
                                                placeholder="valandinis įkainis"
                                                {...register("HourlyPrice", { required: true })}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="bool"
                                                placeholder="Ar norite rezervavimo(true/false)?"
                                                {...register("Reservation", { required: true })}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <textarea
                                                className="form-control border-0 border-bottom"
                                                placeholder="Telefono numeris"
                                                {...register("PhoneNumber", { required: true })}
                                            >
                                            </textarea>
                                        </div>                                       
                                        <div className="mb-3">
                                            <textarea
                                                className="form-control border-0 border-bottom"
                                                placeholder="Susiekimo elektroninis paštas"
                                                {...register("ContactEmail", { required: true })}
                                            >
                                            </textarea>
                                        </div>                                       
                                         <div className="mb-3">
                                            <textarea
                                                className="form-control border-0 border-bottom"
                                                placeholder="Jūsų miestas"
                                                {...register("City", { required: true })}
                                            >
                                            </textarea>
                                        </div>


                                        <input className="btn btn-info text-white w-100 py-2 fw-normal" type="submit" value="Pridėti" />
                                    </form>
                                </div>
                            </div>

                            <div className="col col-12 col-sm-12 col-md-6">
                                {
                                    rodytikrovima
                                        ?
                                        <div className="alert alert-success">
                                            Paslauga pridėta
                                        </div>

                                        :

                                        <div className="card h-100 border-0 d-flex align-items-center justify-content-center">
                                            <img className="img-fluid" src={workingGif} alt="working man" />
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
            }
        </Container>
    );
};

export default PridetiProdukta;