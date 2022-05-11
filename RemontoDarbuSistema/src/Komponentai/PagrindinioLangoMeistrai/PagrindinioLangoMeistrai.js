import React, { useEffect, useState } from 'react';
import PagrindinioLangoKorteles from '../PagrindinioLangoKorteles/PagrindinioLangoKorteles';
import './PagrindinioLangoMeistrai.css';
import Krovimas from '../Krovimas/Krovimas';
import { Container } from 'react-bootstrap';




const PagrindinioLangoMeistrai = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

// endpointo callas pasigettinti visus meistrus
    useEffect(() => {
        fetch(`https://localhost:5001/api/Services`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            });
    }, []);


    return (
          <Container className="my-4 meistrai">
          <div className="mb-4">
            <div className="produktas-baneris text-center">
              <h4 className="display-6 cursive-text produktas-titulas">
                Mėgstamiausi meistrai platformoje:
            </h4>
            <div>
            </div>
        </div>
        </div>
        {
                isLoading
                    ?
                    <Krovimas>

                    </Krovimas>
                    :
                    <div className='namai'>

        {
        products.slice(0, 4).map(product => {
                return(

                    <PagrindinioLangoKorteles
                    Id={product.Id}
                    src={product.Image}
                    title={product.Name}
                    description={product.Description}
                    price={product.HourlyPrice}
                />
                
                    );
              })}
                </div>
    
}
</Container>
    );
};

export default PagrindinioLangoMeistrai;