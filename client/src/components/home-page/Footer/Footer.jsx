import React from "react";
import ButtonsNav from "../../ButtonsNav/ButtonsNav";
import Logo from "../assets/img/logo-blacno-sin-fondo.png";
import { Facebook, Instagram } from "../assets/svg";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer_container">
      <div className="footer">
        <div className="footer_contain">
          <img src={Logo} alt="Logo" />
          <div className="footer_contain_text">
            <h4>Solucionaremos tus inquitudes</h4>
            <p>
              Nuestra meta es solucionar tus problemas jurídicos para que tu
              vida civíl o jurídica sea prospera, sin inquietudes. Si deseas
              contactarnos de manera rápida hazlo aquí:
            </p>
          </div>
          <div className="button_footer">
            <ButtonsNav text="Presiona Aquí" link="#" />
          </div>
          <div className="iconos">
            <Instagram />
            <Facebook />
          </div>
        </div>
      </div>

      <div className="text_alig">
        <div className="footer_info">
          <div>
            <h5>Contacto</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              fugit, odio repellendus culpa et magnam laudantium iste possimus
              quia consectetur enim delectus voluptate aliquid, animi doloremque
              nam, aut ratione modi.
            </p>
          </div>
          <div>
            <h5>Dirección</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              fugit, odio repellendus culpa et magnam laudantium iste possimus
              quia consectetur enim delectus voluptate aliquid, animi doloremque
              nam, aut ratione modi.
            </p>
          </div>
        </div>

        <div className="flex_derecho_autor">
          {/* Centrado */}
          <div>
            <img src={Logo} alt="Logo" />
            <p>Buffet Law-2021 | Todos los derechos reservados</p>
            <img src={Logo} alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
