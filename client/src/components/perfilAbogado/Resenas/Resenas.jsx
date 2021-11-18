import axios from "axios";
import React, { useEffect, useState } from "react";
import Resena from "../Resena/Resena";

export default function Resenas(params) {
  const [data, setdata] = useState([]);

  async function getReseñas() {
    let usuarios = await axios.get("http://localhost:3001/usuarios");
    let abogado = usuarios.data.find(
      (usuario) => usuario.eMail === params.abogado.eMail
    );
    if (abogado) {
      var abogadoId = abogado.abogadoId;
    } else {
      var abogadoId = 0;
    }
    console.log(abogadoId);
    let reseñas = await axios.get("http://localhost:3001/resenas");
    console.log(reseñas.data);
    reseñas = reseñas.data.filter((reseña) => reseña.abogadoId === abogadoId);
    console.log(reseñas);
    setdata(reseñas);
  }
  useEffect(() => {
    getReseñas();
  }, [params]);

  return (
    <>
      <h3>Reseñas</h3>
      {data?.map((data) => {
        return (
          <Resena
            title={data.titulo}
            puntuacion={data.puntuacion}
            mensaje={data.mensaje}
          />
        );
      })}
    </>
  );
}
