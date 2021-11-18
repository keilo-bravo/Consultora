const { Consulta, Turno, Usuario, Dia, Items } = require("../db");
const enviarEmail = require('../email/email');

async function deleteConsulta(req, res, next) {
  const { id } = req.params;
  try {
    await Consulta.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    next({ msg: "no se encontro la consulta" });
  }
}
async function items(req, res) {
  try {
    const { item } = JSON.parse(req.params.dataFromFrontEnd);
    await Items.destroy({ where: { id: item } });
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(404);
  }
}

module.exports = { deleteConsulta, items };

async function cancelarTurno(req, res) {
  const { turnoId, eliminar } = req.body;

  try {
    const turno = await Turno.findByPk(turnoId);

    if (eliminar) {
      turno.destroy();

      // hacer: Notificar por mail
      if (turno.clienteId) {
        const cliente = await turno.getCliente({ include: [{ model: Usuario }] })

        enviarEmail.send({
          email: cliente.usuario.eMail,
          // fecha: new Date(fecha).toLocaleDateString(),
          // hora: turno.hora,
          subject: "Turno cancelado",
          htmlFile: "turno-cancelado.html",
        });
      }

    } else {
      turno.clienteId = null;
      await turno.save();
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

async function eliminarDia(req, res) {
  const { diaId } = req.body;

  try {
    const dia = await Dia.findByPk(diaId);

    const turnos = await dia.getTurnos();

    turnos.map(async turno => {

      if (turno.clienteId) {
        let cliente = await turno.getCliente({ include: [{ model: Usuario }] });

        enviarEmail.send({
          email: cliente.usuario.eMail,
          subject: "Turno cancelado",
          htmlFile: "turno-cancelado.html",
        });
      }
      return await turno.destroy();
    });

    await dia.destroy();

    return res.json({ dia, turnos })

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

};

module.exports = { deleteConsulta, cancelarTurno, eliminarDia, items };
