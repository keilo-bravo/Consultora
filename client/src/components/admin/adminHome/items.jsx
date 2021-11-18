import React, { useEffect, useState } from "react";
import { putItem } from "../../../redux/actions/index";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./items.css";

export default function Items({ item, handleDelete }) {
    const [flag, setFlag] = useState(true);
    const [input, setInput] = useState({
        id: item.id,
        descripcion: item.descripcion,
    });
    const dispatch = useDispatch();

    console.log({ item, input });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.descripcion.length > 0) {
            dispatch(putItem(input));
            setFlag(true);
            toast.success("item modificado")
        } else toast.error("debe ingresar almenos 3 caracteres")
    };

    useEffect(() => {
        setInput({ id: item.id, descripcion: item.descripcion });
    }, [item]);

    return flag ? (
        <div>
            <li className="list-group-item d-flex  flex-row">
                <p className="p-item">{input.descripcion}</p>
                <div class="btn-group btn-group-sm d-flex justify-content-end" role="group" aria-label="...">
                    <button className="btn btn-secondary" onClick={() => setFlag(false)}>
                        🖊️
                    </button>
                    <button
                        className="btn btn-secondary "
                        name={input.id}
                        onClick={(e) => handleDelete(e)}
                    >
                        🗑️
                    </button>
                </div>
            </li>
        </div>
    ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className=" mt-3">
                <li className="list-group-item justify-content-center d-flex">
                    <input
                        className="form-control w-75  me-3"
                        value={input.descripcion}
                        onChange={(e) => setInput({ ...item, descripcion: e.target.value })}
                    ></input>
                    <div class="btn-group btn-group-sm" role="group" aria-label="...">
                        <button type="submit"
                            className="btn btn-secondary ms-5">
                            Guardar📧
                        </button>
                        <button className="btn btn-secondary "
                            name={input.id}
                            onClick={(e) => handleDelete(e)}
                        >
                            🗑️
                        </button></div>
                </li>

            </div>
        </form>
    );
}
