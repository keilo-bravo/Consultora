import { Link } from "react-router-dom";

const NavUsuario = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {/* <li className="nav-item">Mis Casos</li> */}
          <li className="nav-item">Añadir un Caso</li>
        </ul>
      </nav>
    </div>
  );
};

export default NavUsuario;
