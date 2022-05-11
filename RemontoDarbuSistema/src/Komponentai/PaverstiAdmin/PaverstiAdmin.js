import React, { useState } from 'react';
import './PaverstiAdmin.css';
import { useForm } from "react-hook-form";
import { Container } from 'react-bootstrap';
import Krovimas from '../Krovimas/Krovimas';
import loginGif from './login.gif';
import useAuth from '../../Hooks/useAuth';

const PaverstiAdmin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [rodytikrovima, setrodytikrovima] = useState(false);
    const { user } = useAuth();

    const { register, handleSubmit, reset } = useForm();
    //pavercia vartotoja pagal jo emaila i admin
    const onSubmit = data => {
        setIsLoading(true);

        fetch(`https://localhost:5001/api/Users/${user.email}/admin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                if (result.status) {
                    setIsLoading(false);
                    reset();
                    setrodytikrovima(true);
                    setTimeout(() => {
                        setrodytikrovima(false);
                    }, 3000);
                };
            });
    };

    return (
        <Container className="my-4 pavertimas">
            {
                isLoading
                    ?
                    <Krovimas></Krovimas>
                    :
                    <div>
                        <div className="row g-4">
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="card h-100">
                                    <form className="bg-white p-4" onSubmit={handleSubmit(onSubmit)}>
                                        <h6 className="form-control pavertimas-title text-center border-0 fw-bold fs-5 mb-3">
                                            Paversti administratorium
                                        </h6>

                                        <div className="mb-3">
                                            <input
                                                className="form-control border-0 border-bottom"
                                                type="email"
                                                placeholder="example@email.com"
                                                {...register("email", { required: true })} />
                                        </div>

                                        <input className="btn btn-info fw-normal text-white w-100 py-2" type="submit" value="paversti admin" />
                                    </form>
                                </div>
                            </div>

                            <div className="col col-md-6 col-12 col-sm-12 ">
                                {
                                    rodytikrovima
                                        ?
                                        <div className="alert alert-success">
                                            Sėkmingai paversta administratorium
                                        </div>
                                        :
                                        <div className="card h-100 justify-content-center border-0 d-flex align-items-center">
                                            <img className="img-fluid" src={loginGif} alt="login gifas" />
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
            }
        </Container>
    );
};

export default PaverstiAdmin;