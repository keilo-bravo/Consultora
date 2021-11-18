import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putAbogado } from "../../../redux/actions";
import FormCasos from "../../FormCasos/FormCasos";
import CardClients from "./cardClients";

export default function Clients() {
  //muestra cards de cada cliente con sus casos
  const [clientes, setClientes] = useState([]);
  const { usuario, abogado } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(putAbogado({ eMail: usuario.eMail }));
  }, [dispatch, usuario]);
  useEffect(() => {
    if (abogado.clientes) {
      let AllClients = JSON.parse(JSON.stringify(abogado.clientes));
      setClientes([...AllClients]);
    }
  }, [abogado.clientes]);

  return (
    <div className="d-flex justify-content-center">
      <div className="mt-3 me-3 ms-3 mb-3 d-inline-flex flex-column conteiner justify-content-center">
        {clientes.map((e) => {
          const { id, persona } = e;

          return (
            <div className=" mt-3 me-3 ms-3 mb-3 card ">
              <CardClients persona={persona} />

              <FormCasos cliente={id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
