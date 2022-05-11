import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Krovimas from '../Krovimas/Krovimas';
import Atsiliepimas from '../Atsiliepimas/Atsiliepimas';
import './Atsiliepimai.css';

const Atsiliepimai = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

//vidinio kodo api/pagereview endpointo kvietimas ir jo datos slicinimas ir reversinimas
    useEffect(() => {
        fetch("https://localhost:5001/api/PageReviews")
            .then(res => res.json())
            .then(data => {
                const reverseData = data.slice().reverse();
                setReviews(reverseData);
                setIsLoading(false);
            });
    }, []);

// puslapio atsiliepimai, paimami is back-endo duomenu bazes
    return (
        <div className="mb-4">
            <div className="atsiliepimai-baneris text-center">
                <h4 className="display-6 cursive-text atsiliepimai-titulas">
                    Atsiliepimai
                </h4>
                <div>
                    <div>
                        <small className=" medium-text text-muted">
                            Pažiūrėkite ką apie mūsų meistrus sako klientai, kad žinotumėte, jog 
                        </small>
                    </div>

                    <div>
                        <small className="medium-text text-muted">
                            mumis pasitikėti galima.
                        </small>
                    </div>
                </div>
            </div>

            <Container>
                <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4">
                    {   
                    isLoading ?
                     <Krovimas>

                     </Krovimas> 
                     :
                      null}

                    {   
                    reviews.map(review => <Atsiliepimas key={review.Id} review={review} />) 
                    }
                </div>
            </Container>
        </div>
    );
};

export default Atsiliepimai;