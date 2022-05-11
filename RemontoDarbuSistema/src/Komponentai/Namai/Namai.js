import React from 'react';
import PagrindinioLangoMeistrai from '../PagrindinioLangoMeistrai/PagrindinioLangoMeistrai';
import Atsiliepimai from '../Atsiliepimai/Atsiliepimai';
import Kontaktai from '../Kontaktai/Kontaktai';
import PaieskosBaneris from '../PaieskosBaneris/PaieskosBaneris';
import './Namai.css';
import HeaderForm from "./HeaderForm";

// pagrindinis landing page'as ir viskas kas yra jame
const Namai = () => {
    return (
        <div>
            <HeaderForm/>
            <PaieskosBaneris />
            <PagrindinioLangoMeistrai />
            <Atsiliepimai/>
            <Kontaktai />
        </div>
    );
};

export default Namai;