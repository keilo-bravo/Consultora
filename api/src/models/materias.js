const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    const Materias = sequelize.define('materias', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
    });

};