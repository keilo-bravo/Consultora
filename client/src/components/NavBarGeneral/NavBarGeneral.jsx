import React from "react";
import ButtonBack from "../ButtonBack/ButtonBack";
import LogoBlanco from "../home-page/assets/img/logo-blacno-sin-fondo.png";

const NavBarGeneral = ({ navStyle }) => {
  return (
    <div className={`${navStyle} divButton`}>
      <ButtonBack styleButton={"buttonBack_login"} text={"Volver"} />
      <div>
        <img src={LogoBlanco} alt="Logo" />
        <p>BL</p>
      </div>
    </div>
  );
};

export default NavBarGeneral;
