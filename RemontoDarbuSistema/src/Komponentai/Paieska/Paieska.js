import React, { useEffect, useState } from 'react';
import './Paieska.css';
import { Button } from "@material-ui/core";
import PaieskosRezultatas from '../PaieskosRezultatas/PaieskosRezultatas';
import Krovimas from '../Krovimas/Krovimas';
import { Container } from 'react-bootstrap';



const Paieska = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFiltered, setIsFiltered] = useState(false);


    useEffect(() => {
        fetch(`https://localhost:5001/api/Services`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            });
    }, []);

    const [filteredProducts, setfilteredProducts] = useState([]);

    const searchItems = (sitas) => {
        console.log(sitas);

        if(sitas == "Visi"){
            setfilteredProducts(products);
        }
        else{
            setfilteredProducts(products.filter(item=> item.Type ==sitas));
        }
        setIsFiltered(true);

    }
    
    return (
        <div className='searchPage'>
            <div className='searchPage__info'>
                <h1>Jums siulomi meistrai</h1>
                <Button variant="outlined" value="Visi" onClick={() => searchItems("Visi")}>Visi</Button>
                <Button variant="outlined" value="Remontas" onClick={() => searchItems("Remontas")}>Remontas</Button>
                <Button variant="outlined" value="Santechnika" onClick={() => searchItems("Santechnika")}>Santechnika</Button>
                <Button variant="outlined" value="Valymas" onClick={() => searchItems("Valymas")}>Valymas</Button>
                <Button variant="outlined" value="Buitis" onClick={() => searchItems("Buitis")}>Buitis</Button>
                <Button variant="outlined" value="Pagalba" onClick={() => searchItems("Pagalba")}>Pagalba</Button>
            </div>
        {
                isLoading
                    ?
                    <Krovimas></Krovimas>
                    :
                    isFiltered
                    ?
            <Container>             
            {filteredProducts.map(filteredProduct => {
                return(
                    <PaieskosRezultatas
                    Id={filteredProduct.Id}
                img={filteredProduct.Image}
                location={filteredProduct.Type}
                title={filteredProduct.Name}
                description={filteredProduct.Description}
                star={5}
                price={filteredProduct.HourlyPrice}
            />
                
                    );
            })}
            </Container>
                    :
                    <Container>             
            {products.map(product => {
                return(
                    <PaieskosRezultatas
                    Id={product.Id}
                img={product.Image}
                location={product.Type}
                title={product.Name}
                description={product.Description}
                star={5}
                price={product.HourlyPrice}
            />
                
                    );
            })}
            </Container>
        }
        </div>
    )
};

export default Paieska;