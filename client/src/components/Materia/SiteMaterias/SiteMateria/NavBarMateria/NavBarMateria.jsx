import React from "react";
import LogoAzul from "../../../../home-page/assets/img/logo-sin-fondo-azul.png";
import ButtonBack from "../../../../ButtonBack/ButtonBack";

const NavBarMateria = () => {
  return (
    <>
      <ButtonBack text={"Volver"} />
      <h2>Buffet Law</h2>
      <img src={LogoAzul} alt="Logo" />
    </>
  );
};

export default NavBarMateria;
