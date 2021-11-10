const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    const Matricula = sequelize.define('matricula', {
        detalle: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

};