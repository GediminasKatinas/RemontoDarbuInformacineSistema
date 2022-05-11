import React from 'react';
import './PaieskosRezultatas.css';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarIcon from "@material-ui/icons/Star";
import { Button } from "@material-ui/core";
import { NavLink } from 'react-router-dom';




function PaieskosRezultatas({
    Id,
    img,
    location,
    title,
    description,
    star,
    price,
}) {
    return (
        <div className='paieskosrezultatas'>
                <NavLink to={`/Meistras/${Id}`} className="text-decoration-none text-black">

            <img src={img} className="paieskosrezultatas__img" width="400" height="300" alt="" />
            <FavoriteBorderIcon className="paieskosrezultatas__heart" />

            <div className='paieskosrezultatas__info'>
                <div className="paieskosrezultatas__infoTop">
                    <p>{location}</p>
                    <h3>{title}</h3>
                    <p>____</p>
                    <p>{description}</p>
                </div>

                <div className="paieskosrezultatas__infoBottom">
                    <div className="paieskosrezultatas__stars">
                        <StarIcon className="paieskosrezultatas__star" />
                        <p>
                            <strong>{star}</strong>
                        </p>
                    </div>
                        <div className='paieskosrezultatass__price'>
                            <h2>{price}€/valanda</h2>
                      </div>
                </div>

            </div>
            </NavLink>
        </div>
    )
}

export default PaieskosRezultatas
