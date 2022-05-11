import React from 'react';
import './Krovimas.css';
import { useState } from "react";
import { css } from "@emotion/react";
import GridLoader from "react-spinners/GridLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;`;
// krovimas gridloader paimtas is interneto, rodomas visada kai svetaine krauna kazkokius duomenis
const Krovimas = () => {
    let [loading] = useState(true);
    //spalva
    let [color] = useState("#0DCAF0");

    return (
        <div className="krovimas mx-auto mb-4">
            
             <GridLoader color={color} loading={loading} css={override} size={30} />
        </div>
    );
};

export default Krovimas;