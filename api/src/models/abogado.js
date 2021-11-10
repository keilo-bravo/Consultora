const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Abogado = sequelize.define('abogado', {
    detalle: {
      type: DataTypes.TEXT
    },
    imagen: {
      type: DataTypes.TEXT
    },
    estudios: {
      type: DataTypes.TEXT
    },
    experiencia: {
      type: DataTypes.TEXT
    }
  });

};
