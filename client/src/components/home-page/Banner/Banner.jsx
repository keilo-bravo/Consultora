import React from "react";
import ListBanner from "./ListBanner/ListBanner.jsx";
import Logo from "../assets/img/logo-blacno-sin-fondo.png";
import "./Banner.css";

const Banner = (props) => {
  const { divContain, title, flexList, widthListOne, widthListTwo } = props;
  return (
    <div className={divContain}>
      <div>
        <h4>{title}</h4>
        <div className={flexList}>
          <ul className={widthListOne}>
            <ListBanner textList="Sumamos mas de 20 años de experiencia." />
            <ListBanner textList="Mas de 100 casos resueltos." />
            <ListBanner textList="Atendemos casos especiales y personalizados." />
            <ListBanner textList="Atención del caso de inmediato." />
          </ul>
          <img src={Logo} alt="Logo" />
          <ul className={widthListTwo}>
            <ListBanner textList="Somos expertos para casos de personas naturales y jurídicas." />
            <ListBanner textList="Nos desempeñamos en áreas empresariales y de manera muy personalizada." />
            <ListBanner textList="Somos leales y discretos en cada caso." />
            <ListBanner textList="Contamos con doctores especializados en cada materia legal." />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
