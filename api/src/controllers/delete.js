const { Consulta } = require("../db");

async function deleteConsulta(req, res, next) {
  const { id } = req.params;
  console.log(id);
  try {
    await Consulta.destroy({ where: { id: `${id}` } });
    res.sendStatus(200);
  } catch (error) {
    next({ msg: "no se encontro la consulta" });
  }
}
module.exports = { deleteConsulta };
