import React from 'react';
import './PagrindinioLangoKorteles.css'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

//visos pagrindiniame puslapyje esancios korteles
function PagrindinioLangoKorteles({ Id, src, title, description, price }) {
    return (
           <div className="col produktas">

           <NavLink to={`/Meistras/${Id}`} className="text-decoration-none text-black">
               <div className="card h-100">
                   <img src={src} className="card-img-top" alt={title} />
                   <div className="card-body">
                       <h4 className="card-title text-center cursive-text">
                           {title}
                       </h4>

                       <p className="card-text text-justify more-small-text text-muted">
                           {description.slice(0, 250)}
                       </p>

                       <div className="row mb-2">
                           <div className="col-6">
                               <div className="more-small-text text-muted">
                                   <span>Kaina: </span>
                                   <span className="fw-bold">{price}$/valanda</span>
                               </div>
                           </div>

                           <div className="col-6">
                               <FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" />
                               <FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" /><FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" />
                               
                               <FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" />
                               <FontAwesomeIcon icon={faStar} className="more-small-text text-warning me-1" />
                           </div>
                          </div>
                      </div>
                 </div>
              </NavLink>
       </div>
    )
}

export default PagrindinioLangoKorteles
