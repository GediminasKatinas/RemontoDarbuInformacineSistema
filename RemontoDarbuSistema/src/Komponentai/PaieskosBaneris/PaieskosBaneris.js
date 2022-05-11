import React, { useState } from 'react'
import './PaieskosBaneris.css'
import { Button } from "@material-ui/core";
import PaieskosMeniu from '../PaieskosMeniu/PaieskosMeniu';
import { useHistory } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
function PaieskosBaneris() {
    const history = useHistory();
    const [showSearch, setShowSearch] = useState(false);
//pagrindinio lango karusele
    return (
        <div className='baneris'>
            <div className='karusele'>
            <Carousel fade className="slider mb-4">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1482731215275-a1f151646268?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    width="1280" 
                    height="512"
                    alt="Slide"
                />

                <Carousel.Caption>
                    <div className="test">
                    <h1>Tausokite savo laiką</h1>
                    <NavLink to="/Paieska">
                         <button>Peržiūrėti pasiūlymus</button>
                         </NavLink>

                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1607400201515-c2c41c07d307?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    width="1280" 
                    height="512"
                    alt="Slide"
                />


                <Carousel.Caption>
                    <div className="test">
                    <h1>Tausokite savo laiką</h1>
                    <NavLink to="/Paieska">
                         <button>Peržiūrėti pasiūlymus</button>
                         </NavLink>

                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
                    width="1280" 
                    height="512"
                    alt="Slide"
                />


                <Carousel.Caption>
                    <div className="test">
                    <h1>Tausokite savo laiką</h1>
                    <NavLink to="/Paieska">
                         <button>Peržiūrėti pasiūlymus</button>
                         </NavLink>

                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://burst.shopifycdn.com/photos/person-couches-to-plant-in-their-garden.jpg?width=925&format=pjpg&exif=1&iptc=1"
                    width="1280" 
                    height="512"
                    alt="Slide"
                />


                <Carousel.Caption>
                    <div className="test">
                    <h1>Tausokite savo laiką</h1>
                    <NavLink to="/Paieska">
                         <button>Peržiūrėti pasiūlymus</button>
                         </NavLink>

                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1573306294146-16dd41a9df3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1218&q=80"
                    width="1280" 
                    height="512"
                    alt="Slide"
                />


                <Carousel.Caption>
                    <div className="test">
                    <h1>Tausokite savo laiką</h1>
                    <NavLink to="/Paieska">
                         <button>Peržiūrėti pasiūlymus</button>
                         </NavLink>

                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
    </div>
    )
}

export default PaieskosBaneris
