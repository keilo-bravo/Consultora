const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    const Casos = sequelize.define('casos', {
        juez: {
            type: DataTypes.STRING,
        },
        numeroLiquidacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        numeroExpediente: {
            type: DataTypes.INTEGER,
        },
        juzgado: {
            type: DataTypes.INTEGER,
        },
        detalle: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM(["inicio", "prueba", "sentencia", "cerrado"]),
            allowNull: false
        },
        medidaCautelar: {
            type: DataTypes.BOOLEAN
        },
        trabaAfectiva: {
            type: DataTypes.BOOLEAN
        },
        vtoMedidaCautelar: {
            type: DataTypes.DATEONLY
        },
        vtoTrabaAfectiva: {
            type: DataTypes.DATEONLY
        }
        ,
        jurisdiccion: {
            type: DataTypes.STRING
        },
    });

};