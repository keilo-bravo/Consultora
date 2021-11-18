import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import "./HomeAbogado.css";

export default function HomeAbogado() {
  const { usuario } = useSelector((state) => state);

  return !usuario.abogadoId ? (
    <Redirect to="/" />
  ) : (
    <div>
      <div className="jumbotron  jumbotron-fluid">
        <h1 className="display-4">¡Bienvenido!</h1>
        <p className="lead">
          En este sitio podrás encontrar todo lo necesario para poder gestionar
          tus casos, consultas y clientes, Para poder navegar puedes utilizar
          los botones que se encuentran en la navegación de la parte superior.
          Ahora te daremos una pequeña descripción de lo que hace cada botón:
        </p>
        <hr className="my-4"></hr>
        <p>
          HOME: este botón te lleva a la página de la cual iniciaste sesión. En
          esta página vas a poder ver cómo te ven el perfil las personas
          interesadas o tus clientes.
        </p>
        <p className="lead">
          <a
            className="btn btn-primary btn-lg"
            href="/user/abogado"
            role="button"
          >
            Home
          </a>
        </p>
        <hr className="my-4"></hr>
        <p>
          Detalles: a través de esta ventana vas a poder ver, ingresar o
          modificar datos a tu perfil. Te recomendamos tenerlo actualizado.
        </p>
        <p className="lead">
          <a class="btn btn-primary btn-lg" role="button">
            <Link to="/user/abogado/modificar-perfil" className="nav-link">
              Detalles
            </Link>
          </a>
        </p>
        <hr className="my-4"></hr>
        <p>
          Casos: a través de esta ventana vas a poder ingresar los datos de los
          nuevos casos e ir gestionando su estado.
        </p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="/" role="button">
            Casos
          </a>
        </p>
        <hr className="my-4"></hr>
        <p>
          Consultas: Por aquí vas a encontrar las nuevas consultas que recibe el
          estudio de diferentes personas, además vas a poder asignarte las
          consultas y tener contacto con los posibles clientes o clientes del
          estudio.
        </p>
        <p className="lead">
          <a
            className="btn btn-primary btn-lg"
            href="/user/abogado/consultas"
            role="button"
          >
            Consultas
          </a>
        </p>
        <hr className="my-4"></hr>
        <p>
          Clientes: Por aquí vas a poder ver la relación con tus clientes, los
          casos activos de cada uno como también los que ya han finalizado.
        </p>
        <p className="lead">
          <a
            className="btn btn-primary btn-lg"
            href="/user/abogado/clientes"
            role="button"
          >
            Clientes
          </a>
        </p>
      </div>
    </div>
  );
}
