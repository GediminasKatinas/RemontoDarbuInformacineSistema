import gif from './working.gif';
import { Container } from 'react-bootstrap';
import React from 'react';

const Mokejimas = () => {
    return (
        // mokejimas kurio dar nera svetaineje tai rodo tiesiog kad veliau bus
        <Container className="my-5">
            <div className="row row-cols-1 row-cols-md-2 g-0">
                <div className="col d-flex align-items-center justify-content-center flex-column">
                    <h2 className="display-5 fw-bold text-center text-info ">
                        Atsiskaitimo sistema greitai bus svetainėje
                    </h2>
                    <small>

                        Peržiūrėkite svetaine ir informuosime, kai atsiskaitymas bus
                    </small>

                </div>

                <div className="col">
                    <img src={gif} alt="darbavimas" className="img-fluid" />
                </div>
            </div>
        </Container>
    );
};

export default Mokejimas;