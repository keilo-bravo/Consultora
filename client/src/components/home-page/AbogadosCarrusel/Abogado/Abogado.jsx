import React from 'react'
import { Link } from 'react-router-dom';

const Abogado = ({ abogado, frase }) => {
    return (
        <>
            <div>
                <div className="img_abogado">
                    <img className="card-img-top" src={abogado.abogado.imagen} alt={'sad'} />
                </div>
                <div className="text_equipo">
                    <p>{abogado.firstName} {abogado.lastName}</p>
                    <p>"{frase?.message}"</p>
                </div>
            </div>
            <div className="button_ver_mas">
                <Link to={`/perfil/${abogado.slug}`}>
                    Ver más
                </Link>
            </div>
        </>
    )
}

export default Abogado;
