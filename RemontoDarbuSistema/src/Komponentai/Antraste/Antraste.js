import React, { useState, useEffect } from "react";
import './Antraste.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';


const Antraste = () => {
    const { user, logout } = useAuth();
    const history = useHistory();

  //antraste kuri yra visuose puslapiuose
    return (
        //antrastes pavadinimas ( siuo atveju ne logo o imones pavadinimas)
        <div className='header'>
        <Navbar bg="light" expand="xl" className="header">
            <Container>
                <Navbar.Brand>
                    
                    <NavLink to="/" className="cursive-text text-decoration-none text-info fs-3">
                        Remonto darbai Bamis
                    </NavLink>
                    
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                    <NavLink className="btn" to="/Paieska">Paieska</NavLink>
                        <NavLink className="btn" to="/ApieMus">Apie mus</NavLink>
                        <NavLink className="btn" to="/Karjera">Karjera</NavLink>
                        {
                            //antrastes meniu priklausomai nuo to ar user yra prisijunges/registraves
                            user.email
                                ?
                                <>
                                    <NavLink className="btn fw-bold text-info" to="/Skydelis">
                                        {user.email}
                                    </NavLink>
    
                                    <NavLink className="btn btn-info px-4 text-white" to="/Skydelis">
                                        Skydelis
                                    </NavLink>
    
                                    <button onClick={() => logout(history)} className="btn btn-secondary btn-padding">
                                        Atsijungti
                                    </button>
                                </>
                                :
                                <NavLink className="btn btn-info text-white fw-bold px-5" to="/Prisijungimas">
                                    Prisijungimas
                                </NavLink>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
    );
};

export default Antraste;