import React from "react";
import ButtonsNav from "../../ButtonsNav/ButtonsNav";
import "./About.css";

const About = ({
  titleAbout,
  contendioAbout,
  titleFilosofia,
  contenidoFilosofia,
}) => {
  return (
    <div className="hidden_contenedor">
      <div className="contenedor_about">
        <div className="About_container">
          <div className="row col-md-12 row-cols-md-6 justify-content-evenly">
            <section className="about col-md-5">
              <h3>{titleAbout}</h3>
              <p dangerouslySetInnerHTML={{ __html: contendioAbout }} />
              <div className="button_about">
                <ButtonsNav text="Leer mas sobre nosotros" link="#" />
              </div>
            </section>

            <section className="filosofia col-md-5">
              <h3>{titleFilosofia}</h3>
              <p dangerouslySetInnerHTML={{ __html: contenidoFilosofia }} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
