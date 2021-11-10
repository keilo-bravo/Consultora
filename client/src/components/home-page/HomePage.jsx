import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMaterias } from "../../redux/actions";
import AbogadosCarrusel from "./AbogadosCarrusel/AbogadosCarrusel";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import "./HomePage.css";
import Banner from "./Banner/Banner.jsx";
import Materia from "../Materia/Materia.jsx";
import About from "./About/About";
import Footer from "./Footer/Footer";

const HomePage = () => {

  const materia = useSelector(state => state.materias)
  const dispatch = useDispatch()
    

  useEffect(() => {
    dispatch(getMaterias())
  }, [dispatch])


  return (
    <div className="height">
      <Header />
      <Navbar navId={"menu"} />
      <About
        titleAbout="Sobre nosotros"
        contendioAbout={
          "Somos una consultoria Jurídica enfocada a la Solución civíl y promovemos la autonomía jurídica y legislativa constitucional y orgánica. Por tanto, nos enfocamos en el cumplimiento objetivo dictado como supremacía por LA CONSTITUCIÓN y no por subjetividades. <br/> Nos especializamos y diferenciamos por la capacidad de personificar cada caso en cada unos de nuestros clientes de persona natiral y jurídica. Somos unas de las consultorías mas solicitadas por la rápida respuesta ante cualquier consulta aún si no eres nuestro cliente."}
        titleFilosofia="Nuestra Filosofía"
        contenidoFilosofia={
          "Las leyes estan por encima de todo, esto es lo que hace cumplir la verdadera justicia en cada juridicción. Esto es nuestro lema y nuestro éxito ante cada caso que solucionamos de manera objetiva día tras día. <br/> Creeemos que la ley es el principio de la verdadera libertad a partir de los poderes estatales hasta cada ciudadano."
        }
      />
      <div className="mb-5">
        <h3 className="text-center mb-4 fs-1">Competencias</h3>
        <div className="flex-materias">
          {
            materia.map(m => (
              <Materia id={m.id} nombre={m.nombre} />
            ))
          }
        </div>
      </div>
      <Banner
        divContain="banner_contain"
        title="¿Por qué confiar en nosotros?"
        flexList="row justify-content-evenly personUl"
        widthListOne="col-md-5"
        widthListTwo="col-md-5"
      />
      <AbogadosCarrusel />
      <Footer />
    </div>
  );
};

export default HomePage;
