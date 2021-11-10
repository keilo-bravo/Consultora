const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Ticket = sequelize.define('ticket', {
    titulo: {
      type: DataTypes.TEXT
    },
    precio: {
      type: DataTypes.TEXT
    },
    enlace: {
      type: DataTypes.TEXT
    },
    n_operacion: {
      type: DataTypes.TEXT
    },
    estatus: {
      type: DataTypes.TEXT
    },
    detalle_estatus: {
      type: DataTypes.TEXT
    },
    medioDePago: {
      type: DataTypes.TEXT
    }
  });

};
