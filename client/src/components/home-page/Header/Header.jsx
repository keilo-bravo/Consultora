import React from "react";
import ButtonsNav from "../../ButtonsNav/ButtonsNav";
// import Image_One from "../assets/img/pexels-cytonn-photography-955395.jpg";
// import Image_Two from "../assets/img/pexels-pixabay-261679.jpg";
// import Image_Three from "../assets/img/equipo-abogados.jpg";
import Logo from "../assets/img/buffet-buffet-law.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="carrusel bg-opacity-100 bg-blue">
      <div
        id="carouselExampleFade"
        className="opacity_carru  carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner ">
          <div className="bg_one_caption  height_image carousel-item active">
            {/* <img src={Image_One} className="d-block w-100" alt="Image_One" /> */}
            <div className="carousel-caption d-none d-md-block text-white caption_one ">
              <img src={Logo} alt="Logo" />
              <h5>Bienvenido a Buffet Law</h5>
              <p>Tu lugar de Justicia Garantizada</p>
            </div>
          </div>

          <div className="bg_two_caption height_image carousel-item col-md-5">
            {/* <img src={Image_Two} className="d-block w-100" alt="Image_Two" /> */}
            <div className="carousel-caption d-none d-md-block m_top_header caption_two">
              <h5>¿Quieres una Consulta rápida?</h5>
              <ButtonsNav nameClass="btn textDecoration" link="#" text="Presiona aquí  " />
            </div>
          </div>

          <div className="bg_three_caption height_image carousel-item">
            {/* <img
              src={Image_Three}
              className="d-block w-100"
              alt="Image_Three"
            /> */}
            <div className="carousel-caption d-none d-md-block  caption_three">
              <h5>
                Nuestro Equipo esta lleno de expertos versatiles para que sean
                tu
              </h5>
              <h5>SOLUCIÓN</h5>
              {/* <Link className="btn" to="#">
                Ver el Equipo
              </Link> */}
              <ButtonsNav nameClass="btn textDecoration" link="#" text="Ver el Equipo" />
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <div className="color_pn">
            <span
              className="color_pn carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </div>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <div className="color_pn">
            <span
              className="color_pn carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
