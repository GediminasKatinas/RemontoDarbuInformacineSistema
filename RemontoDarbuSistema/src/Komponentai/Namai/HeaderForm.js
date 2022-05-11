import React, { useState, useEffect } from "react";
import style from "./headerForm.module.css";
import { NavLink } from 'react-router-dom';


export default function HeaderForm({ translateHeader }) {
  const [animated, setAnimated] = useState(false);
  function handleScroll(e) {
    const wScroll = window.scrollY;
    if (wScroll >= 50) {
      setAnimated(true);
    } else {
      setAnimated(false);
    }
  }
// nepabaigta header forma pagrindinio psl advanced searchui pagal npm package'o tutoriala 
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
  });
  return (
    <>
      <div className={`${style.form} ${animated ? style.animated : ""}`}>

        <div
          className={style.HeaderForm}
          style={{
            backgroundColor: animated ? "transparent" : "",
            maxWidth: animated ? "300px" : "853px",
            transition: "200ms all ease-in-out",
            // margin: "auto",
            overflow: "hidden",
            height: animated ? "53px" : "67px",
          }}
        >
          {/* {animated ? ( */}
          <div
            className={style.headerAnimatedForm}
            onClick={() => setAnimated(false)}
            style={{
              width: "100%",
              marginRight: "200px",
              minWidth: "300px",
              zIndex: animated ? "1" : "0",
              opacity: animated ? "1" : "0",
              position: animated ? "static" : "absolute",
              transition: "200ms all ease-in-out",
            }}
          >
            <p className="mb-0">Pradėti paieška</p>
            <span>
              <i class="fas fa-search"></i>
            </span>
          </div>
          {/* ) : ( */}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              zIndex: animated ? "0" : "1",
              opacity: animated ? "0" : "1",
              minWidth: "853px",
              transition: "200ms all ease-in-out",
            }}
          >
            <button>
              <h6>Paslaugos tipas</h6>
              <p>Norima paslauga </p>
            </button>
            <button>
              <h6>Datos</h6>
              <p>Datos pasirinkimas </p>
            </button>
            <button>
              <h6>Miestas</h6>
              <p>Jūsų miestas </p>
            </button>
            <button className="border-0">
              <h6>Kaina</h6>
              <p>Kaina </p>
            </button>
            <NavLink to="/Paieska">
            <button>
              <i class="fas fa-search"></i>
              {/* <span className="ml-2">Search</span> */}
            </button>
                         </NavLink>
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
}
