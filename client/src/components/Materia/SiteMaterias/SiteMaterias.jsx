import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSiteMateria } from "../../../redux/actions";
import SiteMateria from "./SiteMateria/SiteMateria";
import ButtonsNav from "../../ButtonsNav/ButtonsNav.jsx";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";

import "./SiteMaterias.css";
import imagenMateria from "../../home-page/assets/img/justicia1.jpg";
import NavBarMateria from "./SiteMateria/NavBarMateria/NavBarMateria";

const SiteMaterias = () => {
  const { materia } = useParams();

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 },
  ];

  const dispatch = useDispatch();
  let { abogados } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getSiteMateria(materia));
    console.log(materia);
  }, [dispatch, materia]);

  // **************************Derecho Civil

  if (materia === "Derecho Civil") {
    /**listo */
    if (abogados.length > 0) {
      return (
        <div>
          <div className="body_site_materia">
            <div className="button_back_site_materia">
              <NavBarMateria />
            </div>
            <h3 className="text-center">Derecho Civíl</h3>
            <div className="container_flex_materias_site container container-md-12">
              <div className="flex_materias_site">
                <Carousel
                  pagination={false}
                  className="carrusel_siteMaterias"
                  breakPoints={breakPoints}
                >
                  {abogados?.map((a) => {
                    return (
                      <Link key={a.dni} to={`/perfil/${a.slug}`}>
                        <SiteMateria
                          firstName={a.firstName}
                          lastName={a.lastName}
                          img={a.abogado.imagen || "https://www.caracteristicas.co/wp-content/uploads/2017/03/Derecho-e1564875517201.jpg"}
                          abogado={abogados}
                        />
                      </Link>
                    );
                  })}
                </Carousel>
              </div>

              <div className="contain_text_site_materia">
                <div>
                  <p>
                    Nuestros expertos procuran que tu vida civíl esté alineada a
                    las leyes, por lo que garantizamos la legislación correcta
                    en cada situación civíl en que te encuentres muy perjudicado
                  </p>
                  <div className="button_consulta_site_materia">
                    <ButtonsNav link="#" text="Consultanos cuando quieras." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            abogados.length > 0 ? "body_site_materia" : "body_site_sin_carousel"
          }
        >
          <div className="button_back_site_materia">
            <NavBarMateria />
          </div>
          <h3 className="text-center">Derecho Civíl</h3>
          <div className="container_flex_materias_site container container-md-12">
            <div className="imagen_site_materias">
              <img src={imagenMateria} alt="imagen materia" />
            </div>
            <div className="contain_text_site_materia container">
              <div>
                <p>
                  Nuestros expertos procuran que tu vida civíl esté alineada a
                  las leyes, por lo que garantizamos la legislación correcta en
                  cada situación civíl en que te encuentres muy perjudicado
                </p>
                <div className="button_consulta_site_materia">
                  <ButtonsNav link="#" text="Consultanos cuando quieras." />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // **************************Derecho Penal
  else if (materia === "Derecho Penal") {
    /**listo */
    if (abogados.length > 0) {
      return (
        <div>
          <div className="body_site_materia">
            <div className="button_back_site_materia">
              <NavBarMateria />
            </div>
            <h3 className="text-center">Derecho Penal</h3>
            <div className="container_flex_materias_site container container-md-12">
              <div className="flex_materias_site">
                <Carousel
                  pagination={false}
                  className="carrusel_siteMaterias"
                  breakPoints={breakPoints}
                >
                  {abogados?.map((a) => {
                    return (
                      <Link key={a.dni} to={`/perfil/${a.slug}`}>
                        <SiteMateria
                          firstName={a.firstName}
                          lastName={a.lastName}
                          img={a.abogado.imagen || "https://www.caracteristicas.co/wp-content/uploads/2017/03/Derecho-e1564875517201.jpg"}
                          abogado={abogados}
                        />
                      </Link>
                    );
                  })}
                </Carousel>
              </div>

              <div className="contain_text_site_materia">
                <div>
                  <p>
                    Nuestros expertos procuran que tu vida civíl esté alineada a
                    las leyes, por lo que garantizamos la legislación correcta
                    en cada situación civíl en que te encuentres muy perjudicado
                  </p>
                  <div className="button_consulta_site_materia">
                    <ButtonsNav link="#" text="Consultanos cuando quieras." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            abogados.length > 0 ? "body_site_materia" : "body_site_sin_carousel"
          }
        >
          <div className="button_back_site_materia">
            <NavBarMateria />
          </div>
          <h3 className="text-center">Derecho Penal</h3>
          <div className="container_flex_materias_site container container-md-12">
            <div className="imagen_site_materias">
              <img src={imagenMateria} alt="imagen materia" />
            </div>
            <div className="contain_text_site_materia container">
              <div>
                <p>
                  Nuestros expertos procuran que tu vida civíl esté alineada a
                  las leyes, por lo que garantizamos la legislación correcta en
                  cada situación civíl en que te encuentres muy perjudicado
                </p>
                <div className="button_consulta_site_materia">
                  <ButtonsNav link="#" text="Consultanos cuando quieras." />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // **************************Derecho Familia
  else if (materia === "Derecho Familia") {
    /**listo */
    if (abogados.length > 0) {
      return (
        <div>
          <div className="body_site_materia">
            <div className="button_back_site_materia">
              <NavBarMateria />
            </div>
            <h3 className="text-center">Derecho Familia</h3>
            <div className="container_flex_materias_site container container-md-12">
              <div className="flex_materias_site">
                <Carousel
                  pagination={false}
                  className="carrusel_siteMaterias"
                  breakPoints={breakPoints}
                >
                  {abogados?.map((a) => {
                    return (
                      <Link key={a.dni} to={`/perfil/${a.slug}`}>
                        <SiteMateria
                          firstName={a.firstName}
                          lastName={a.lastName}
                          img={a.abogado.imagen || "https://www.caracteristicas.co/wp-content/uploads/2017/03/Derecho-e1564875517201.jpg"}
                          abogado={abogados}
                        />
                      </Link>
                    );
                  })}
                </Carousel>
              </div>

              <div className="contain_text_site_materia">
                <div>
                  <p>
                    Nuestros expertos procuran que tu vida civíl esté alineada a
                    las leyes, por lo que garantizamos la legislación correcta
                    en cada situación civíl en que te encuentres muy perjudicado
                  </p>
                  <div className="button_consulta_site_materia">
                    <ButtonsNav link="#" text="Consultanos cuando quieras." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            abogados.length > 0 ? "body_site_materia" : "body_site_sin_carousel"
          }
        >
          <div className="button_back_site_materia">
            <NavBarMateria />
          </div>
          <h3 className="text-center">Derecho Familia</h3>
          <div className="container_flex_materias_site container container-md-12">
            <div className="imagen_site_materias">
              <img src={imagenMateria} alt="imagen materia" />
            </div>
            <div className="contain_text_site_materia container">
              <div>
                <p>
                  Nuestros expertos procuran que tu vida civíl esté alineada a
                  las leyes, por lo que garantizamos la legislación correcta en
                  cada situación civíl en que te encuentres muy perjudicado
                </p>
                <div className="button_consulta_site_materia">
                  <ButtonsNav link="#" text="Consultanos cuando quieras." />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // **************************Derecho Contencioso
  else if (materia === "Derecho Contencioso") {
    /**listo */
    if (abogados.length > 0) {
      return (
        <div>
          <div className="body_site_materia">
            <div className="button_back_site_materia">
              <NavBarMateria />
            </div>
            <h2 className="text-center">Derecho Contencioso</h2>
            <div className="container_flex_materias_site container container-md-12">
              <div className="flex_materias_site">
                <Carousel
                  pagination={false}
                  className="carrusel_siteMaterias"
                  breakPoints={breakPoints}
                >
                  {abogados?.map((a) => {
                    return (
                      <Link key={a.dni} to={`/perfil/${a.slug}`}>
                        <SiteMateria
                          firstName={a.firstName}
                          lastName={a.lastName}
                          img={a.abogado.imagen || "https://www.caracteristicas.co/wp-content/uploads/2017/03/Derecho-e1564875517201.jpg"}
                          abogado={abogados}
                        />
                      </Link>
                    );
                  })}
                </Carousel>
              </div>

              <div className="contain_text_site_materia">
                <div>
                  <p>
                    Nuestros expertos procuran que tu vida civíl esté alineada a
                    las leyes, por lo que garantizamos la legislación correcta
                    en cada situación civíl en que te encuentres muy perjudicado
                  </p>
                  <div className="button_consulta_site_materia">
                    <ButtonsNav link="#" text="Consultanos cuando quieras." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            abogados.length > 0 ? "body_site_materia" : "body_site_sin_carousel"
          }
        >
          <div className="button_back_site_materia">
            <NavBarMateria />
          </div>
          <h3 className="text-center">Derecho Contencioso</h3>
          <div className="container_flex_materias_site container container-md-12">
            <div className="imagen_site_materias">
              <img src={imagenMateria} alt="imagen materia" />
            </div>
            <div className="contain_text_site_materia container">
              <div>
                <p>
                  Nuestros expertos procuran que tu vida civíl esté alineada a
                  las leyes, por lo que garantizamos la legislación correcta en
                  cada situación civíl en que te encuentres muy perjudicado
                </p>
                <div className="button_consulta_site_materia">
                  <ButtonsNav link="#" text="Consultanos cuando quieras." />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // **************************Derecho Notarial
  else if (materia === "Derecho Notarial") {
    /**listo */
    if (abogados.length > 0) {
      return (
        <div>
          <div className="body_site_materia">
            <div className="button_back_site_materia">
              <NavBarMateria />
            </div>
            <h3 className="text-center">Derecho Notarial</h3>
            <div className="container_flex_materias_site container container-md-12">
              <div className="flex_materias_site">
                <Carousel
                  pagination={false}
                  className="carrusel_siteMaterias"
                  breakPoints={breakPoints}
                >
                  {abogados?.map((a) => {
                    return (
                      <Link key={a.dni} to={`/perfil/${a.slug}`}>
                        <SiteMateria
                          firstName={a.firstName}
                          lastName={a.lastName}
                          img={a.abogado.imagen || "https://www.caracteristicas.co/wp-content/uploads/2017/03/Derecho-e1564875517201.jpg"}
                          abogado={abogados}
                        />
                      </Link>
                    );
                  })}
                </Carousel>
              </div>

              <div className="contain_text_site_materia">
                <div>
                  <p>
                    Nuestros expertos procuran que tu vida civíl esté alineada a
                    las leyes, por lo que garantizamos la legislación correcta
                    en cada situación civíl en que te encuentres muy perjudicado
                  </p>
                  <div className="button_consulta_site_materia">
                    <ButtonsNav link="#" text="Consultanos cuando quieras." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            abogados.length > 0 ? "body_site_materia" : "body_site_sin_carousel"
          }
        >
          <div className="button_back_site_materia">
            <NavBarMateria />
          </div>
          <h3 className="text-center">Derecho Notarial</h3>
          <div className="container_flex_materias_site container container-md-12">
            <div className="imagen_site_materias">
              <img src={imagenMateria} alt="imagen materia" />
            </div>
            <div className="contain_text_site_materia container">
              <div>
                <p>
                  Nuestros expertos procuran que tu vida civíl esté alineada a
                  las leyes, por lo que garantizamos la legislación correcta en
                  cada situación civíl en que te encuentres muy perjudicado
                </p>
                <div className="button_consulta_site_materia">
                  <ButtonsNav link="#" text="Consultanos cuando quieras." />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // **************************Derecho Corporativo
  else if (materia === "Derecho Corporativo") {
    /**listo */
    if (abogados.length > 0) {
      return (
        <div>
          <div className="body_site_materia">
            <div className="button_back_site_materia">
              <NavBarMateria />
            </div>
            <h3 className="text-center">Derecho Corporativo</h3>
            <div className="container_flex_materias_site container container-md-12">
              <div className="flex_materias_site">
                <Carousel
                  pagination={false}
                  className="carrusel_siteMaterias"
                  breakPoints={breakPoints}
                >
                  {abogados?.map((a) => {
                    return (
                      <Link key={a.dni} to={`/perfil/${a.slug}`}>
                        <SiteMateria
                          firstName={a.firstName}
                          lastName={a.lastName}
                          img={a.abogado.imagen || "https://www.caracteristicas.co/wp-content/uploads/2017/03/Derecho-e1564875517201.jpg"}
                          abogado={abogados}
                        />
                      </Link>
                    );
                  })}
                </Carousel>
              </div>

              <div className="contain_text_site_materia">
                <div>
                  <p>
                    Nuestros expertos procuran que tu vida civíl esté alineada a
                    las leyes, por lo que garantizamos la legislación correcta
                    en cada situación civíl en que te encuentres muy perjudicado
                  </p>
                  <div className="button_consulta_site_materia">
                    <ButtonsNav link="#" text="Consultanos cuando quieras." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            abogados.length > 0 ? "body_site_materia" : "body_site_sin_carousel"
          }
        >
          <div className="button_back_site_materia">
            <NavBarMateria />
          </div>
          <h3 className="text-center">Derecho Corporativo</h3>
          <div className="container_flex_materias_site container container-md-12">
            <div className="imagen_site_materias">
              <img src={imagenMateria} alt="imagen materia" />
            </div>
            <div className="contain_text_site_materia container">
              <div>
                <p>
                  Nuestros expertos procuran que tu vida civíl esté alineada a
                  las leyes, por lo que garantizamos la legislación correcta en
                  cada situación civíl en que te encuentres muy perjudicado
                </p>
                <div className="button_consulta_site_materia">
                  <ButtonsNav link="#" text="Consultanos cuando quieras." />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // **************************Derecho Comercial
  else if (materia === "Derecho Comercial") {
    /**listo */
    if (abogados.length > 0) {
      return (
        <div>
          <div className="body_site_materia">
            <div className="button_back_site_materia">
              <NavBarMateria />
            </div>
            <h3 className="text-center">Derecho Comercial</h3>
            <div className="container_flex_materias_site container container-md-12">
              <div className="flex_materias_site">
                <Carousel
                  pagination={false}
                  className="carrusel_siteMaterias"
                  breakPoints={breakPoints}
                >
                  {abogados?.map((a) => {
                    return (
                      <Link key={a.dni} to={`/perfil/${a.slug}`}>
                        <SiteMateria
                          firstName={a.firstName}
                          lastName={a.lastName}
                          img={a.abogado.imagen || "https://www.caracteristicas.co/wp-content/uploads/2017/03/Derecho-e1564875517201.jpg"}
                          abogado={abogados}
                        />
                      </Link>
                    );
                  })}
                </Carousel>
              </div>

              <div className="contain_text_site_materia">
                <div>
                  <p>
                    Nuestros expertos procuran que tu vida civíl esté alineada a
                    las leyes, por lo que garantizamos la legislación correcta
                    en cada situación civíl en que te encuentres muy perjudicado
                  </p>
                  <div className="button_consulta_site_materia">
                    <ButtonsNav link="#" text="Consultanos cuando quieras." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            abogados.length > 0 ? "body_site_materia" : "body_site_sin_carousel"
          }
        >
          <div className="button_back_site_materia">
            <NavBarMateria />
          </div>
          <h3 className="text-center">Derecho Comercial</h3>
          <div className="container_flex_materias_site container container-md-12">
            <div className="imagen_site_materias">
              <img src={imagenMateria} alt="imagen materia" />
            </div>
            <div className="contain_text_site_materia container">
              <div>
                <p>
                  Nuestros expertos procuran que tu vida civíl esté alineada a
                  las leyes, por lo que garantizamos la legislación correcta en
                  cada situación civíl en que te encuentres muy perjudicado
                </p>
                <div className="button_consulta_site_materia">
                  <ButtonsNav link="#" text="Consultanos cuando quieras." />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // **************************Derecho Administrativo
  else if (materia === "Derecho Administrativo") {
    /**listo */
    if (abogados.length > 0) {
      return (
        <div>
          <div className="body_site_materia">
            <div className="button_back_site_materia">
              <NavBarMateria />
            </div>
            <h3 className="text-center">Derecho Administrativo</h3>
            <div className="container_flex_materias_site container container-md-12">
              <div className="flex_materias_site">
                <Carousel
                  pagination={false}
                  className="carrusel_siteMaterias"
                  breakPoints={breakPoints}
                >
                  {abogados?.map((a) => {
                    return (
                      <Link key={a.dni} to={`/perfil/${a.slug}`}>
                        <SiteMateria
                          firstName={a.firstName}
                          lastName={a.lastName}
                          img={a.abogado.imagen || "https://www.caracteristicas.co/wp-content/uploads/2017/03/Derecho-e1564875517201.jpg"}
                          abogado={abogados}
                        />
                      </Link>
                    );
                  })}
                </Carousel>
              </div>

              <div className="contain_text_site_materia">
                <div>
                  <p>
                    Nuestros expertos procuran que tu vida civíl esté alineada a
                    las leyes, por lo que garantizamos la legislación correcta
                    en cada situación civíl en que te encuentres muy perjudicado
                  </p>
                  <div className="button_consulta_site_materia">
                    <ButtonsNav link="#" text="Consultanos cuando quieras." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            abogados.length > 0 ? "body_site_materia" : "body_site_sin_carousel"
          }
        >
          <div className="button_back_site_materia">
            <NavBarMateria />
          </div>
          <h3 className="text-center">Derecho Administrativo</h3>
          <div className="container_flex_materias_site container container-md-12">
            <div className="imagen_site_materias">
              <img src={imagenMateria} alt="imagen materia" />
            </div>
            <div className="contain_text_site_materia container">
              <div>
                <p>
                  Nuestros expertos procuran que tu vida civíl esté alineada a
                  las leyes, por lo que garantizamos la legislación correcta en
                  cada situación civíl en que te encuentres muy perjudicado
                </p>
                <div className="button_consulta_site_materia">
                  <ButtonsNav link="#" text="Consultanos cuando quieras." />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  // **************************Derecho Laboral
  else if (materia === "Derecho Laboral") {
    /**listo */
    if (abogados.length > 0) {
      return (
        <div>
          <div className="body_site_materia">
            <div className="button_back_site_materia">
              <NavBarMateria />
            </div>
            <h3 className="text-center">Derecho Laboral</h3>
            <div className="container_flex_materias_site container container-md-12">
              <div className="flex_materias_site">
                <Carousel
                  pagination={false}
                  className="carrusel_siteMaterias"
                  breakPoints={breakPoints}
                >
                  {abogados?.map((a) => {
                    return (
                      <Link key={a.dni} to={`/perfil/${a.slug}`}>
                        <SiteMateria
                          firstName={a.firstName}
                          lastName={a.lastName}
                          img={a.abogado.imagen || "https://www.caracteristicas.co/wp-content/uploads/2017/03/Derecho-e1564875517201.jpg"}
                          abogado={abogados}
                        />
                      </Link>
                    );
                  })}
                </Carousel>
              </div>

              <div className="contain_text_site_materia">
                <div>
                  <p>
                    Nuestros expertos procuran que tu vida civíl esté alineada a
                    las leyes, por lo que garantizamos la legislación correcta
                    en cada situación civíl en que te encuentres muy perjudicado
                  </p>
                  <div className="button_consulta_site_materia">
                    <ButtonsNav link="#" text="Consultanos cuando quieras." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            abogados.length > 0 ? "body_site_materia" : "body_site_sin_carousel"
          }
        >
          <div className="button_back_site_materia">
            <NavBarMateria />
          </div>
          <h3 className="text-center">Derecho Laboral</h3>
          <div className="container_flex_materias_site container container-md-12">
            <div className="imagen_site_materias">
              <img src={imagenMateria} alt="imagen materia" />
            </div>
            <div className="contain_text_site_materia container">
              <div>
                <p>
                  Nuestros expertos procuran que tu vida civíl esté alineada a
                  las leyes, por lo que garantizamos la legislación correcta en
                  cada situación civíl en que te encuentres muy perjudicado
                </p>
                <div className="button_consulta_site_materia">
                  <ButtonsNav link="#" text="Consultanos cuando quieras." />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default SiteMaterias;
