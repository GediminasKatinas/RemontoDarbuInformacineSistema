import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import loginGif from './login.gif';
import policeGif from './police.gif';
import './Prisijungimas.css';

const Prisijungimas = () => {
    const history = useHistory();
    const location = useLocation();
    //naudojama authentifikacija
    const { 

        loginWithEmail,
        errorMessage,
    } = useAuth();

    const { register, handleSubmit, reset } = useForm();
    //onsubmit persiunciama i useauth prisijungimui su emailu
    const onSubmit = data => {
        loginWithEmail(data.Email, data.Password, history, location);
        reset();
    };

    return (
        <div className="prisijungimas blue-bg">
            <div className="container prisijungimas">
                {errorMessage 
                ? <div className="alert alert-danger text-center mb-5">
                    {errorMessage
                     ? <h6 className="text-danger">{errorMessage}</h6> : null}
                </div> 
                :
                 null}

                <h1 className="cursive-text mb-5 text-white text-center">
                    Kas tu?
                    </h1>

                <div className="row g-4 row-cols-1 row-cols-md-3">
                    <div className="col">
                        <img className="img-fluid" src={loginGif} alt="prisijungimas" />
                    </div>

                    <div className="col">
                        <div className="card h-100">
                            <form className="bg-white p-4" onSubmit={handleSubmit(onSubmit)}>
                                <h6 className="form-control border-0 fw-bold fs-5 mb-3 booking-title text-center">
                                    Prisijungimas
                                </h6>

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
                                        type="password"
                                        placeholder="Slaptažodis"
                                        {...register("Password", { required: true })}
                                    />
                                </div>

                                <input className="btn btn-info text-white w-100 py-2 fw-normal" type="submit" value="Prisijungimas" />

                                <div className="form-text mt-1">
                                    Neturite paskyros?
                                    <NavLink className="text-info ms-1 text-decoration-none " to="/Registracija">
                                        Registracija
                                    </NavLink>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col">
                        <img className="img-fluid" src={policeGif} alt="prisijungimas" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prisijungimas;