const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const About = sequelize.define("about", {
    sobreNosotros: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue:
        "Somos una consultoria Jurídica enfocada a la Solución civíl y promovemos la autonomía jurídica y legislativa constitucional y orgánica. Por tanto, nos enfocamos en el cumplimiento objetivo dictado como supremacía por LA CONSTITUCIÓN y no por subjetividades. Nos especializamos y diferenciamos por la capacidad de personificar cada caso en cada unos de nuestros clientes de persona natiral y jurídica. Somos unas de las consultorías mas solicitadas por la rápida respuesta ante cualquier consulta aún si no eres nuestro cliente.",
    },
    nuestraFilosofia: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue:
        "Las leyes estan por encima de todo, esto es lo que hace cumplir la verdadera justicia en cada juridicción. Esto es nuestro lema y nuestro éxito ante cada caso que solucionamos de manera objetiva día tras día. Creeemos que la ley es el principio de la verdadera libertad a partir de los poderes estatales hasta cada ciudadano.",
    },
    contacto: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.STRING,
    },
  });
};
