import React, { useEffect } from "react";
import Abogado from "./Abogado/Abogado.jsx";
import frases from "./abogados.js";
import Carousel from "react-elastic-carousel";
import "./AbogadosCarrusel.css";
import { useDispatch } from "react-redux";
import { getAbogados } from "../../../redux/actions/index.js";
import { useSelector } from "react-redux";

const AbogadosCarrusel = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
  ];

  const dispatch = useDispatch();
  const abogados = useSelector((state) => state.abogados);

  useEffect(() => {
    dispatch(getAbogados());
  }, []);

  return (
    <div className="container_carrusel_abogado">
      <div
        id="contain_title_abogado"
        className="flex_h2_carrusel container-fluid"
      >
        <div>
          <h2>Nuestro Equipo</h2>
        </div>
        <div>
          <Carousel
            className="contain_abogado align-items-center"
            pagination={false}
            // itemsToScroll={2}
            // itemsToShow={2}
            breakPoints={breakPoints}
          >
            {abogados.map((abogado, i) => (
              <div className="me-3 col-xl-6 p-1 abogado" key={i}>
                <Abogado abogado={abogado} frase={frases[i]} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default AbogadosCarrusel;
