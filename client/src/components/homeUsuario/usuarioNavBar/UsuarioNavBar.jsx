import { getAuth, signOut } from "@firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUsuario } from "../../../redux/actions";


export default function UsuarioNavBar() {

    const history = useHistory();

    const dispatch = useDispatch();
    const auth = getAuth();

    const logout = () => {
        signOut(auth)
          .then(() => {
            dispatch(getUsuario({}));
            history.push("/");
            toast.info("La sesión fue finalizada");
            localStorage.removeItem('username')
          })
          .catch((error) => {
            // An error happened.
          });
      };

    return (<>

        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <Link to="/">
                        <a class="nav-item nav-link mx-2"> {'< '}Volver al sitio</a>
                    </Link>
                    <Link to="/cita">
                        <a class="nav-item nav-link mx-2">Nueva consulta</a>
                    </Link>
                    <Link to="/user/panel/consultas">
                        <a class="nav-item nav-link mx-2">Consultas realizadas</a>
                    </Link>
                    <a class="nav-item nav-link mx-2" href="#">Casos</a>
                    <span class="nav-item nav-link mx-2 pointer" onClick={logout}>Salir</span>
                </div>
            </div>
        </nav>

    </>)
}