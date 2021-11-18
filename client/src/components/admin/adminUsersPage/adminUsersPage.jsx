/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUsuarios,
  setAbogado,
  setAdmin,
  setBann,
} from "../../../redux/actions/index";

const AdminUsersPage = () => {
  const { usuarios, usuario } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);
  const handleChange = (e, type) => {
    e.preventDefault();
    let eMail = e.target.value;
    let aux = usuarios.find((e) => e.eMail === eMail);
    if (type === "abogado") {
      if (aux.adminId !== 1 || usuario.adminId === 1) {
        let user = { eMail: e.target.value, flag: e.target.checked };
        console.log(user);
        dispatch(setAbogado(user));
        if (user.flag) {
          toast.success("Abogado asignado");
        } else {
          toast.error("Abogado eliminado");
        }
      } else {
        toast.success("No tienes estos permisos");
      }
    } else if (type === "admin") {
      if (aux.adminId !== 1) {
        let user = { eMail: e.target.value, flag: e.target.checked };
        dispatch(setAdmin(user));
        if (user.flag) {
          toast.success("admin  asignado");
        } else {
          toast.success("admin eliminado");
        }
      } else {
        toast.error("no puede hacer eso!");
      }
    } else if (type === "bann") {
      if (usuario.adminId === 1 && aux.adminId !== 1) {
        let user = { eMail: e.target.value, flag: e.target.checked };
        dispatch(setBann(user));
        if (user.flag) {
          toast.success("bann asignado");
        } else {
          toast.error("bann eliminado");
        }
      } else {
        toast.error("no puede hacer eso!");
      }
    }
  };

  return (
    <div
      className="ms-5 me-5 mt-3 mb-3"
      style={{ width: "90%", paddingTop: "20px", paddingLeft: "20px" }}
    >
      <table className="table table-striped  ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Admin</th>
            <th scope="col">Abogado</th>
            <th scope="col">Banneado</th>
            <th scope="col">Usuario</th>
            <th scope="col">Dni</th>
          </tr>
        </thead>
        <tbody>
          {usuarios?.map((e, i) => {
            let type = "";
            return (
              <tr key={i}>
                <th scope="row">{i}</th>
                {e.adminId ? (
                  usuario.adminId !== 1 || e.adminId === 1 ? (
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        value={e.eMail}
                        onInput={(e) => {
                          handleChange(e, (type = "admin"));
                        }}
                        defaultChecked
                        disabled
                      />
                    </td>
                  ) : (
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        value={e.eMail}
                        onInput={(e) => {
                          handleChange(e, (type = "admin"));
                        }}
                        defaultChecked
                      />
                    </td>
                  )
                ) : usuario.adminId !== 1 || e.adminId === 1 ? (
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      value={e.eMail}
                      onInput={(e) => {
                        handleChange(e, (type = "admin"));
                      }}
                      disabled
                    />
                  </td>
                ) : (
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      value={e.eMail}
                      onInput={(e) => {
                        handleChange(e, (type = "admin"));
                      }}
                    />
                  </td>
                )}
                {e.abogadoId ? (
                  usuario.eMail === e.eMail ||
                    e.adminId !== 1 ||
                    usuario.adminId === 1 ? (
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        value={e.eMail}
                        onInput={(e) => {
                          handleChange(e, (type = "abogado"));
                        }}
                        defaultChecked
                      />
                    </td>
                  ) : (
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        value={e.eMail}
                        onInput={(e) => {
                          handleChange(e, (type = "abogado"));
                        }}
                        defaultChecked
                        disabled
                      />
                    </td>
                  )
                ) : usuario.eMail !== e.eMail ||
                  e.adminId !== 1 ||
                  usuario.adminId === 1 ? (
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      value={e.eMail}
                      onInput={(e) => {
                        handleChange(e, (type = "abogado"));
                      }}
                    />
                  </td>
                ) : (
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      value={e.eMail}
                      onInput={(e) => {
                        handleChange(e, (type = "abogado"));
                      }}
                      disabled
                    />
                  </td>
                )}
                {e.banned ? (
                  usuario.adminId === 1 && e.adminId !== 1 ? (
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        value={e.eMail}
                        onInput={(e) => {
                          handleChange(e, (type = "bann"));
                        }}
                        defaultChecked
                      />
                    </td>
                  ) : (
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        value={e.eMail}
                        onInput={(e) => {
                          handleChange(e, (type = "bann"));
                        }}
                        defaultChecked
                        disabled
                      />
                    </td>
                  )
                ) : usuario.adminId === 1 && e.adminId !== 1 ? (
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      value={e.eMail}
                      onInput={(e) => {
                        handleChange(e, (type = "bann"));
                      }}
                    />
                  </td>
                ) : (
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      value={e.eMail}
                      onInput={(e) => {
                        handleChange(e, (type = "bann"));
                      }}
                      disabled
                    />
                  </td>
                )}
                <td>{e.eMail}</td>
                <td>{e.personaDni} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div id="liveAlertPlaceholder">

      </div>
    </div>
  );
};

export default AdminUsersPage;
