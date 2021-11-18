import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems, getMaterias } from "../../redux/actions";
import AbogadosCarrusel from "./AbogadosCarrusel/AbogadosCarrusel";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import "./HomePage.css";
import Banner from "./Banner/Banner.jsx";
import Materia from "../Materia/Materia.jsx";
import About from "./About/About";
import Footer from "./Footer/Footer";

const HomePage = () => {
  const { materias, about, items } = useSelector(state => state)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMaterias());
  }, [dispatch]);


  return (
    <div className="height">
      <Header />
      <Navbar navId={"menu"} />
      <About
        titleAbout="Sobre nosotros"
        contendioAbout={
          about.sobreNosotros
        }
        titleFilosofia="Nuestra Filosofía"
        contenidoFilosofia={
          about.nuestraFilosofia
        }
      />
      <div className="mb-5">
        <h3 className="text-center mb-4 fs-1">Competencias</h3>
        <div className="flex-materias">
          {materias?.map((m, i) => (
            <Materia key={i} nombre={m.nombre} />
          ))}
        </div>
      </div>
      <Banner
        divContain="banner_contain"
        title="¿Por qué confiar en nosotros?"
        flexList="row justify-content-evenly personUl"
        widthListOne="col-md-5"
        widthListTwo="col-md-5"
        items={items}
      />
      <AbogadosCarrusel />
      <Footer direccion={about.direccion} contacto={about.contacto} />
    </div>
  );
};

export default HomePage;
