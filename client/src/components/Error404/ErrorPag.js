import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './ErrorPag.css';

const ErrorPag = () =>{

    const [num, setNum] = useState(Math.floor(Math.random() * (4 - 1) + 1));
    
    console.log(num)
    const Imagen404 = (
        num === 1 ? <div id="fondo1"></div> :(num === 2 ? <div id="fondo2"></div> : <div id="fondo3"></div>)
    )        
    
    return (
        <div>
            <NavLink to="/">
            {Imagen404}
            </NavLink>
        </div>
    )
}
 export default ErrorPag;