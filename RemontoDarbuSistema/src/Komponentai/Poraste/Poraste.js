import React from 'react';
import { NavLink } from 'react-router-dom';
import './Poraste.css'

const Poraste = () => {
    return (
        <footer className="footer text-center text-lg-start text-white bg-dark">
            <section className="py-3">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold">
                                Remonto darbu informacinė sistema
                            </h6>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{ width: "60px", backgroundColor: "#0DCAF0", height: "2px" }}
                            />
                            <p className="small-text footer-about">
                                Remonto darbų informacinė sistema. Čia galite susirasti jums reikiama paslaugą adekvačia kaina.
                            </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold ">Greitoji paieška</h6>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{ width: "60px", backgroundColor: "#0DCAF0", height: "2px" }}
                            />


                            <p>
                                <NavLink to="/paieska" className="text-white text-decoration-none small-text">
                                    Santechnika
                                </NavLink>
                            </p>

                            <p>
                                <NavLink to="/paieska" className="text-white text-decoration-none small-text">
                                    Švara
                                </NavLink>
                            </p>

                            <p>
                                <NavLink to="/paieska" className="text-white text-decoration-none small-text">
                                    Apdailos darbai
                                </NavLink>
                            </p>

                            <p>
                                <NavLink to="/paieska" className="text-white text-decoration-none small-text">
                                    Stogo darbai
                                </NavLink>
                            </p>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold">Naudingi bookmarks</h6>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{ width: "60px", backgroundColor: "#0DCAF0", height: "2px" }}
                            />

                            <p>
                                <NavLink to="/" className="text-white text-decoration-none small-text">Namai</NavLink>
                            </p>

                            <p>
                                <NavLink to="/Paieska" className="text-white text-decoration-none small-text">
                                    Paieška
                                </NavLink>
                            </p>

                            <p>
                                <NavLink to="/apiemus" className="text-white text-decoration-none small-text">
                                    Apie mus
                                </NavLink>
                            </p>

                            <p>
                                <NavLink to="/atsiliepimai" className="text-white text-decoration-none small-text">
                                    Atsiliepimai
                                </NavLink>
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold ">Contact</h6>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{ width: "60px", backgroundColor: "#0DCAF0", height: "2px" }}
                            />

                            <p className="small-text">
                                <i className="fas fa-home me-3"></i>
                                Vilnius, Lietuva
                            </p>

                            <p className="small-text">
                                <i className="fas fa-envelope me-3"></i>
                                RemontoDarbai@remontas.lt
                            </p>

                            <p className="small-text">
                                <i className="fas fa-phone me-3"></i>
                                +370 621 71851
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div
                className="text-center p-3 small-text"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                <span className="me-2">© 2022 Copyright</span>

                <NavLink to="/" className="text-white text-decoration-none">
                    Gekat
                </NavLink>
            </div>
        </footer>
    );
};

export default Poraste;