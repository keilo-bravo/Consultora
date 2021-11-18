import React from "react";
import CardCasos from "./cardCasos/cardCasos";
import "./casos.css";

function Casos({ id, casos, persona, flag }) {
  const { firstName, lastName, dni, celular } = persona;

  return (
    <>
      <div className="card mt-3 me-3 ms-3 " key={id}>
        <h4 className="mt-2 d-flex justify-content-center ">
          {firstName} {lastName}
        </h4>
        <p className="d-flex justify-content-center">dni: {dni}</p>
        <p className="d-flex justify-content-center">celular: {celular}</p>
        <div>
          <h5 className="d-flex justify-content-center">Casos</h5>
          {casos?.map((e) => {
            const {
              detalle,
              estado,
              juez,
              juzgado,
              numeroExpediente,
              numeroLiquidacion,
              medidaCautelar,
              trabaAfectiva,
              vtoMedidaCautelar,
              vtoTrabaAfectiva,
              jurisdiccion,
              materias,
              updatedAt

            } = e;
            return (
              <CardCasos
                detalle={detalle}
                materia={materias[0].nombre}
                estado={estado}
                juez={juez}
                juzgado={juzgado}
                numeroExpediente={numeroExpediente}
                numeroLiquidacion={numeroLiquidacion}
                medidaCautelar={medidaCautelar}
                trabaAfectiva={trabaAfectiva}
                vtoMedidaCautelar={vtoMedidaCautelar}
                vtoTrabaAfectiva={vtoTrabaAfectiva}
                jurisdiccion={jurisdiccion}
                fecha={updatedAt}
                flag={flag}
                id={id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Casos;
