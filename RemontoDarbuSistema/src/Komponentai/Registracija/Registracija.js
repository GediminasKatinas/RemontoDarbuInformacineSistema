import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './Registracija.css';

const Registracija = () => {
    const history = useHistory();
    const location = useLocation();
    const [passwordError, setPasswordError] = useState(false);
    const {
        signUpWithEmail,
        errorMessage,
    } = useAuth();
// jei sutampa abu password input fieldai siunciam i useauth kur signupinasi
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        if (data.Password === data.ConfirmPassword) {
            signUpWithEmail(data.Username, data.Password, data.Email, data.Role, history, location);
            reset();
            setPasswordError(false);
        }
        else {
            setPasswordError(true);
        };
    }; //kazkodel neuzloginina automatiskai

    return (
        <div className="registracija blue-bg">
            <div className="container login">
                {errorMessage 
                ? <div className="alert alert-danger text-center mb-5">
                    {errorMessage
                     ? <h6 className="text-danger">{errorMessage}</h6> : null}
                </div> 
                : null}

                {passwordError ? <div className="alert alert-danger text-center mb-5">
                    {passwordError 
                    ? 
                    <h6 className="text-danger">Slaptažodžiai nesutampa!</h6> : null}
                </div> : null}

                <h1 className="cursive-text text-white text-center mb-3">Registracija</h1>

                <div className="row g-4 row-cols-1 row-cols-md-3">
                    <div className="col"></div>

                    <div className="col">
                        <div className="card h-100">
                            <form className="bg-white p-4" onSubmit={handleSubmit(onSubmit)}>
                                <h6 className="form-control booking-title text-center border-0 fw-bold fs-5 mb-3">
                                    Registracija
                                </h6>

                                <div className="mb-3">
                                    <input
                                        className="form-control border-0 border-bottom"
                                        type="text"
                                        placeholder="Vardas"
                                        {...register("Username", { required: true })}
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
                                        placeholder="Pakartokite slaptažodį"
                                        {...register("ConfirmPassword", { required: true })}
                                    />
                                </div>
                                <div className="mb-3">
                                            <select
                                                class="form-select border-0 border-bottom"
                                                {...register("Role", { required: true })}
                                            >
                                                <option selected>Paskyros tipas</option>
                                                <option value="Meistras">Meistras</option>
                                                <option value="PaprastasVartotojas">Paprastas vartotojas</option>
                                            </select>
                                        </div>

                                <input className="btn btn-info text-white w-100 py-2 fw-normal" type="submit" value="Registruotis" />

                                <div className="form-text mt-1">

                                    Jau turite paskyrą?
                                    <NavLink className="text-info text-decoration-none ms-1" to="/Prisijungimas">
                                        
                                        Prisijungti
                                    </NavLink>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col"></div>
                </div>
            </div>
        </div>
    );
};

export default Registracija;