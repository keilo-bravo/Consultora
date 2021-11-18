/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import About from "./about"
import Items from "./items"
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  getAbout,
  getItems,
  postItem,
} from "../../../redux/actions/index";
import { toast } from "react-toastify";
import "./modifierHome.css"

export default function ModifierHome() {
  const { about, items } = useSelector((state) => state);
  const [flag, setFlag] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const dispatch = useDispatch();

  async function handleDelete(e) {
    console.log(e.target.name);
    e.preventDefault();
    await dispatch(deleteItem({ item: e.target.name }));
    dispatch(getItems());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (descripcion !== "") {
      await dispatch(postItem({ descripcion }));
      dispatch(getItems());
      toast.success("item creado");
      setDescripcion("");
    } else toast.error("debe ingresar un texto");
  }

  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);



  return (
    <div className="w-100 d-flex justify-content-center h-50">

      <div className="d-flex justify-content-center flex-column w-50">
        <About about={about} />
        <hr />
        <div>

          <ul className="list-group mt-3">
            {items.map((e, index) => {
              return <Items item={e} handleDelete={handleDelete} key={index} />;
            })}
          </ul>
          {flag ? (
            <div>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="textarea-modifierHome"
                  placeholder="Deberia confiar en nosotros porque....."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
                <div className="d-flex justify-content-center mt-1">

                  <input type="submit" value={"enviar"} className="button-about" />
                </div>
              </form>
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="button-about mb-3"
                  onClick={(e) => setFlag(!flag)}
                >
                  Terminar
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center mt-3">
              <button className="button-about mb-3" onClick={(e) => setFlag(!flag)}>
                Crear nuevo item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
