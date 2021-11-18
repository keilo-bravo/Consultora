const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = {
  casos: require("./casos"),
  utiles: require("./utiles"),
  usuario: require("./usuario"),
  consultas: require("./consultas"),
  cloudinary: require("./cloudinary"),
  tickets: require("./tickets"),
  resenas: require("./resenas"),
  turnos: require("./turnos"),
  index: router,
};
