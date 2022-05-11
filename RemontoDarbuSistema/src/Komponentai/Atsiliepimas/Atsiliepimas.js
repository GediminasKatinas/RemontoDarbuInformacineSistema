import React from 'react';
import './Atsiliepimas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Atsiliepimas = props => {
        
    const { Name, Email, Rating, Description } = props.review;

    const reitingulistas = Array.from(Array(Rating).keys());
// atsiliepimo mapinimas i kortele
    return (
        <div className="col product">
            <div className="card h-100">
                <div className="card-body">
                    <h4 className="card-title text-center cursive-text">
                        {Name}
                    </h4>

                    <p className="card-text text-muted more-small-text text-justify">
                        {Description}
                    </p>

                    <div className="row">
                        <div className="col-6">
                            {reitingulistas.map(() => {
                                return (
                                    <>
                                        <FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" />
                                    </>
                                );
                            })}
                        </div>

                        <div className="col-6">
                            <div className="text-end">
                                <div className="more-small-text text-muted mt-1">
                                    <span className="fw-bold">{Email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-footer border-0 bg-white p-0">

                </div>
            </div>
        </div>
    );
};

export default Atsiliepimas;