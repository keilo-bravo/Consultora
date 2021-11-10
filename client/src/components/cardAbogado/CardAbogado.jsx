import { Link } from "react-router-dom";

import './CardAbogado.css';

export default function CardAbogado({abogado}) {

 
    return (<>

        <div className="col">
            <div className="card text-center shadow p-2 border-0 bg-light rounded tarjeta-abogado">
                <Link to={`perfil/${abogado.slug}`}>
                    <img className="imagen-abogado" src={abogado?.abogado?.imagen || 'https://www.caracteristicas.co/wp-content/uploads/2017/03/Derecho-e1564875517201.jpg'} width="" alt="imagen"></img>
                    <div className="card-body">
                        <h5 className="card-title text-black fs-6">{abogado.firstName} {abogado.lastName}</h5>
                        <p className="card-text text-muted">Abogado</p>
                    </div>
                </Link>

            </div>
        </div>

    </>)

}