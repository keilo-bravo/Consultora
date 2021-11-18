import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientes, putClienteAbogado } from "../../../redux/actions";
import { toast } from "react-toastify";

export default function AdminClientes() {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state);
  const allUsers = useSelector((state) => state.usuarios);

  useEffect(() => {
    dispatch(getClientes());
  }, [dispatch]);
  const handleChangeAbogado = (e, clienteId, abogadoId) => {
    e.preventDefault();
    const cambios = {
      abogado: e.target.value,
      cliente: clienteId,
      abogadoAntiguo: abogadoId,
    };

    if (
      cambios.abogado !== undefined &&
      cambios.abogado !== "ninguno" &&
      cambios.cliente !== undefined
    ) {
      dispatch(putClienteAbogado(cambios));
      toast.success("Abogado asignado");
    } else toast.error("Ocurrio un error");
  };

  const abogados = allUsers.filter((e) => e.abogadoId !== null);
  return (
    <div
      className="ms-5 me-5 mt-3 mb-3"
      style={{ width: "90%", paddingTop: "20px", paddingLeft: "20px" }}
    >
      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Cliente</th>
            <th scope="col">Abogado asignado</th>
            <th scope="col">casos</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((e, i) => {
            console.log(e);
            const { persona } = e;
            const personaAbogado = e.abogados[0]?.persona;
            const clienteId = e.id;
            const aux = e.casos.filter((e) => e.estado !== "cerrado");
            return (
              <>
                <tr key={i}>
                  <th scope="row">{i}</th>
                  <td>
                    {persona.firstName} {persona.lastName}
                  </td>
                  <td>
                    <select
                      className="form-select w-25"
                      onChange={(h) =>
                        handleChangeAbogado(h, clienteId, e.abogados[0]?.id)
                      }
                    >
                      <option value={null}>ninguno</option>
                      {e.abogados.length !== 0
                        ? abogados.map((e) => {
                            if (personaAbogado.dni === e.personaDni) {
                              return (
                                <option value={e.eMail} selected>
                                  {e.slug}
                                </option>
                              );
                            } else
                              return <option value={e.eMail}>{e.slug} </option>;
                          })
                        : abogados.map((e, i) => {
                            if (i === 0)
                              return <option value={e.eMail}>{e.slug} </option>;
                            return <option value={e.eMail}>{e.slug} </option>;
                          })}
                    </select>
                  </td>
                  <td>{aux.length > 0 ? aux.length : "no tiene"}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
