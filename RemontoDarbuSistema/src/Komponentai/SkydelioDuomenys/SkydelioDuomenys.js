import React, { useEffect, useState } from 'react';
import './SkydelioDuomenys.css';

const SkydelioDuomenys = () => {
    const [users, setUsers] = useState([]);
    const [servisai, setServisai] = useState([]);
    const [servisai1, setServisai1] = useState([]);
    const [reviews, setReviews] = useState([]);

// vartotoju getas
    useEffect(() => {
        fetch("https://localhost:5001/api/Users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            });
    }, []);

//visu servisu getas
    useEffect(() => {
        fetch("https://localhost:5001/api/Services")
            .then(res => res.json())
            .then(data => {
                setServisai(data);
            });
    }, []);

// visu servisu getas
    useEffect(() => {
        fetch("https://localhost:5001/api/Services")
            .then(res => res.json())
            .then(data => {
                setServisai1(data);
            });
    }, []);

// atsiliepimai
    useEffect(() => {
        fetch("https://localhost:5001/api/PageReviews")
            .then(res => res.json())
            .then(data => {
                setReviews(data);
            });
    }, []);


    return (
        <div>
            <div>
                <div className="mb-4">
                    <h4>Skydelis</h4>
                    <p className="text-muted">
                        Skydelio duomenys
                    </p>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-4 g-3 mb-3">
                <div className="col">
                    <div className="card text-white h-100 square-radius bg-info">
                        <div className="card-body pb-0">
                            <div className="d-flex justify-content-around">
                                <div className="text-center">
                                    <i className="fas fa-users p-2 square-radius"></i>
                                </div>

                                <div>
                                    <h5 className="card-title fs-6 mb-0">
                                        Vartotojų kiekis
                                    </h5>
                                    <p className="card-text">
                                        <h4 className="text-center">
                                            {users.length}
                                        </h4>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card text-white h-100 square-radius bg-info">
                        <div className="card-body pb-0">
                            <div className="d-flex justify-content-around">
                                <div className="text-center">
                                    <i className="fas fa-users p-2 square-radius"></i>
                                </div>

                                <div>
                                    <h5 className="card-title fs-6 mb-0">
                                        Meistrų kiekis
                                    </h5>
                                    <p className="card-text">
                                        <h4 className="text-center">
                                            {servisai.length}
                                        </h4>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card text-white h-100 square-radius bg-info">
                        <div className="card-body pb-0">
                            <div className="d-flex justify-content-around">
                                <div className="text-center">
                                    <i className="fas fa-shopping-cart p-2 square-radius"></i>
                                </div>

                                <div>
                                    <h5 className="card-title fs-6 mb-0">
                                        Užsakymu kiekis
                                    </h5>
                                    <p className="card-text">
                                        <h4 className="text-center">
                                            {servisai1.length}
                                        </h4>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card text-white h-100 square-radius bg-info">
                        <div className="card-body pb-0">
                            <div className="d-flex justify-content-around">
                                <div className="text-center">
                                    <i className="fas fa-edit p-2 square-radius"></i>
                                </div>

                                <div>
                                    <h5 className="card-title fs-6 mb-0">
                                       Atsiliepimų kiekis
                                    </h5>
                                    <p className="card-text">
                                        <h4 className="text-center">
                                            {reviews.length}
                                        </h4>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkydelioDuomenys;