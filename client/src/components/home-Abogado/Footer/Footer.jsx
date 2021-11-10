import React from "react";

const Footer = () => {
  return (
    <footer class="page-footer font-small blue pt-4">
      <div className="container-fluid ">
        <p className="navbar-brand h1">
          Grupo 10 - &copy; {new Date().getFullYear()}{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
