import React from 'react';
import { Container } from 'react-bootstrap';
import './ApieMus.css';

//apie mus puslapis kuris parodo siek tiek informacijos apie puslapio savininkus
const ApieMus = () => {
    return (

        <Container className="my-4">
            <div className="mb-4 text-center bg-light info-baneris">
                <h4 className="display-6 cursive-text info-titulas">
                    Apie mus
                </h4>
                <div>


                    <div>
                        <small className="text-muted medium-text">
                            Remonto darbu informacinė sistema paleista 2022 ir yra operuojama 5 žmonių komandos.
                        </small>
                    </div>

                    <div>
                        <small className="text-muted medium-text">
                            Mūsų tikslas susiekti remonto darbų specialistus su potencialiais klientais
                        </small>
                    </div>

                    <div>
                        <small className="text-muted medium-text">
                            visoje Lietuvoje.
                        </small>
                    </div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 g-2">
                <div className="col">

                    <img className="img-fluid" src="https://www.kindpng.com/picc/m/49-498310_clip-art-cartoon-team-warm-welcome-greetings-hd.png"/>
                </div>

                <div className="col justify-content-center d-flex align-items-center">
                    <div className="w-75 banner-text-container">
                        <h4 className="display-6 cursive-text">Kodėl pasitikėti mumis?</h4>
                        <p className="text-muted small-text">
                            Mes pirmieji šalyje supaprastinama visa remonto paieškos procesą.
                            Esame Startupas ir norime plėstis visoje Lietuvoje.
                            Dirbame ir palaikome ryšius su visais meistrais platformoje, tad užtikriname kokybę.
                        </p>
                    
                     </div>
                
                 </div>
            </div>
        </Container>
    );
};

export default ApieMus;