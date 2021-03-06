import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "@firebase/auth";
import { getUsuario } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

export default function NavAbogado() {
  let usuario = useSelector((state) => state.usuario)

  const history = useHistory();

  const dispatch = useDispatch();
  const auth = getAuth();

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(getUsuario({}));
        toast.info("La sesiΓ³n fue finalizada");
        localStorage.removeItem("username");
        history.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <div className="izquierda">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/user/abogado" className="nav-link">
                Home π 
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/user/abogado/modificar-perfil" className="nav-link">
                Detalles π¨βπ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/user/abogado/casos" className="nav-link">
                Casos π
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/user/abogado/consultas" className="nav-link">
                Consultas π­
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/user/abogado/clientes" className="nav-link">
                Clientes πββοΈ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/user/abogado/gestionar-turnos" className="nav-link">
                Turnos π
              </Link>
            </li>
            <li className="nav-item">
              {usuario.adminId &&
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              }
            </li>
            <li className="nav-item">
              <a onClick={logout} className="nav-link pointer">
                Salir β
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
