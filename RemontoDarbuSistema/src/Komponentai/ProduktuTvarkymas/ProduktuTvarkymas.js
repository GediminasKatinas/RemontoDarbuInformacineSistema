import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Krovimas from '../Krovimas/Krovimas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './ProduktuTvarkymas.css';

const ProduktuTvarkymas = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //administratoriui rodoma funkcija deletinti paslauga
    const handleProductDelete = id => {
        const confirm = window.confirm("Ar tikrai?");

        if (confirm) {
            setIsLoading(true);

            fetch(`https://localhost:5001/api/Services/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result.Id) {
                        setIsLoading(false);
                    };
                });
        };
    };

    //uzloadint visas paslaugas
    useEffect(() => {
        fetch(`https://localhost:5001/api/Services`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            });
    }, [products]);

    return (
        <Container className="orders my-5">
            <h2 className="pink-text cursive-text text-center mb-4  display-6">
                Tvarkyti produktus
            </h2>

            {
                isLoading
                    ?
                    <Krovimas>

                    </Krovimas>
                    :
                    <Container >
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

                            {products.map(product => {
                                return (
                                    <div className="col product">
                                        <div className="card h-100">
                                            <img src={product.Image} className="card-img-top" alt={product.Name} />
                                            <div className="card-body">
                                                <h4 className="card-title cursive-text text-center">
                                                    {product.Type}
                                                </h4>

                                                <p className="card-text text-justify more-small-text text-muted">
                                                    {product.ShortDescription.slice(0, 250)}
                                                </p>

                                                <div className="row mb-2">
                                                    <div className="col-6">
                                                        <div className="more-small-text text-muted">
                                                            <span>Aprašymas </span>
                                                            <span className="fw-bold">${product.Description}</span>
                                                        </div>
                                                    </div>

                                                    <div className="col-6">
                                                        <div className="text-end me-1">
                                                            <div className="more-small-text text-muted">
                                                                <span>Valandinis įkainis </span>
                                                                <span className="fw-bold">{product.HourlyPrice}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="row">
                                                    <div className="col-6">
                                                        <FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" />
                                                        <FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" /><FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" />
                                                        <FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" /><FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" />
                                                    </div>

                                                    <div className="col-6">
                                                        <div className="text-end d-flex justify-content-end">
                                                            <div className="text-end me-1">
                                                                <div className="more-small-text text-muted">
                                                                    <span>Remonto darbo tipas </span>
                                                                    <span className="fw-bold">{product.Type}</span>
                                                                </div>
                                                            </div>

                                                            <div className="text-end me-1">
                                                                <div className="more-small-text text-muted">
                                                                    <span>Rezervavimas </span>
                                                                    <span className="fw-bold">{product.Reservation}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-footer border-0 bg-white p-0">
                                                <button
                                                    onClick={() => handleProductDelete(product.Id)}
                                                    className="btn btn-danger rounded-0 order-btn text-white px-4 w-100 "
                                                >
                                                    Ištrinti
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                          </div>
                    </Container>
            }
        </Container >
    );
};

export default ProduktuTvarkymas;