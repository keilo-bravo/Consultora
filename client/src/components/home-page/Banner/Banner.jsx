import React, { useEffect, useState } from "react";
import ListBanner from "./ListBanner/ListBanner.jsx";
import Logo from "../assets/img/logo-blacno-sin-fondo.png";
import "./Banner.css";

const Banner = (props) => {
  const { divContain, title, flexList, widthListOne, widthListTwo, items } = props;
  const [listItems, setListItems] = useState([])
  useEffect(() => {
    let aux = []
    aux.push(items.slice(0, 4))
    aux.push(items.slice(4, items.length))
    setListItems(aux)
  }, [items])
  console.log(listItems)
  return (
    <div className={divContain}>
      <div>
        <h4>{title}</h4>
        <div className={flexList}>
          <ul className={widthListOne}>
            {
              listItems[0]?.map((e) => (<ListBanner textList={e.descripcion} />))
            }
          </ul>
          <img src={Logo} alt="Logo" />
          <ul className={widthListTwo}>
            {
              listItems[1]?.map((e) => (<ListBanner textList={e.descripcion} />))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
