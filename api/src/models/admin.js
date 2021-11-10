const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    const Admin = sequelize.define('admin', {
        tipo: {
            type: DataTypes.ENUM(["gm", "normal"]),
            allowNull: false
        }
    });

};