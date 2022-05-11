import React from 'react';
import './Nerasta.css';
import nerastaGif from './notFound.gif';

// nerasta puslapis jeigu vartotojas kazkur uzklysta
const Nerasta = () => {
    return (
        <div className="text-center nerasta">
            <img className="img-fluid" src={nerastaGif} alt="not found" />

            
            <h4 className="display-6 cursive-text mb-5">Puslapis nerastas</h4>
        </div>
    );
};

export default Nerasta;