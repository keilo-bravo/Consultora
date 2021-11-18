const {
  Casos,
  Usuario,
  Provincias,
  Materias,
  Abogado,
  Persona,
  Cliente,
  Consulta,
  Ticket,
  Items,
  About,
  Dia,
  Turno,
} = require("../db");
const enviarEmail = require("../email/email");
const axios = require("axios");
const mercadopago = require("../config/MercadoPago");

async function usuario(req, res) {
  try {
    const { eMail } = req.body;
    const user = await Usuario.findOne({ where: { eMail } });

    if (user?.banned)
      return res
        .status(403)
        .json({ mensaje: "Su cuenta se encuentra deshabilitada" });

    if (user) {
      const abogado = await Abogado.findByPk(user.abogadoId);
      const { firstName, lastName, dni, celular } = await Persona.findByPk(
        user.personaDni
      );
      const personas = await Persona.findAll();
      if (personas.length < 2) {
        return res.json({
          ...{
            eMail: user.eMail,
            password: user.password,
            abogadoId: user.abogadoId,
            adminId: user.adminId,
            clienteId: user.clienteId,
            slug: user.slug,
            firstName,
            lastName,
            dni,
            celular,
          },
          abogado,
        });
      } else {
        if (abogado) {
          return res.json({
            ...{
              eMail: user.eMail,
              password: user.password,
              abogadoId: user.abogadoId,
              adminId: user.adminId,
              slug: user.slug,
              firstName,
              lastName,
              dni,
              celular,
            },
            abogado,
          });
        } else
          return res.json({
            ...{
              eMail: user.eMail,
              password: user.password,
              abogadoId: user.abogadoId,
              adminId: user.adminId,
              clienteId: user.clienteId,
              firstName,
              lastName,
              dni,
              celular,
            },
          });
      }
    } else return res.sendStatus(404);
  } catch (error) {
    console.error(error);
    return res.sendStatus(404);
  }
}

async function asignaConsulta(req, res, next) {
  const { consultaId, abogadoId, respuesta } = req.body;

  try {
    const consulta = await Consulta.findByPk(consultaId);

    if (consulta.abogadoId)
      return res
        .status(400)
        .json({ msg: "La consulta ya fue asignada a un abogado" });

    const result = await Consulta.update(
      {
        abogadoId: abogadoId,
        respuestaAbogado: respuesta,
      },
      { where: { id: consultaId } }
    );

    enviarEmail.send({
      email: consulta.email,
      mensaje: respuesta,
      subject: "Su consulta fue aceptada",
      htmlFile: "consulta-aceptada.html",
    });

    res.send(result);
  } catch (error) {
    console.log(error);
    next({ msg: "no se pudo asignar abogado" });
  }
}

// asigna materia y matricula al abogado

async function modificarAbogado(req, res) {
  const { eMail } = req.params;
  const {
    nombre,
    apellido,
    detalle,
    matricula,
    estudios,
    experiencia,
    materias,
    provincias,
  } = req.body;

  console.log(matricula);

  try {
    const user = await Usuario.findByPk(eMail);
    if (!user) return res.sendStatus(404);
    const persona = await Persona.findByPk(user.personaDni);
    if (!persona) return res.sendStatus(404);
    let abogado = await Abogado.findOne({
      where: { id: user.abogadoId },
      include: [Materias, Provincias],
    });
    if (!abogado) return res.sendStatus(404);

    persona.firstName = nombre;
    persona.lastName = apellido;
    abogado.matricula = matricula;
    abogado.detalle = detalle;
    abogado.estudios = estudios;
    abogado.experiencia = experiencia;
    user.slug = `${nombre}-${apellido}`;

    if (abogado.materias) {
      abogado.materias.forEach(async (m) => {
        await abogado.removeMateria(m);
      });
    }
    if (abogado.provincias) {
      abogado.provincias.forEach(async (p) => {
        await abogado.removeProvincia(p);
      });
    }

    Promise.all([
      await persona.save(),
      await abogado.save(),
      await user.save(),
      await abogado.setMaterias(materias),
      await abogado.setProvincias(provincias),
    ]);

    console.log(abogado);

    return res.send({
      ...{
        eMail: user.eMail,
        password: user.password,
        abogadoId: user.abogadoId,
        adminId: user.adminId,
        slug: user.slug,
        firstName: persona.firstName,
        lastName: persona.lastName,
        dni: persona.dni,
        celular: persona.celular,
      },
      abogado,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
async function getAbogado(req, res) {
  try {
    let { eMail } = req.body;
    if (!eMail) {
      eMail = req.params;
    }
    const user = await Usuario.findByPk(eMail);
    const { firstName, lastName, dni, celular } = await Persona.findByPk(
      user.personaDni
    );
    const { detalle, clientes, imagen, experiencia, estudios } =
      await Abogado.findOne({
        where: { id: user.abogadoId },
        include: Cliente,
      });
    let abogado = {
      ...{ eMail: user.eMail, firstName, lastName, dni, celular },
      detalle,
      imagen,
      experiencia,
      estudios,
    };
    abogado.clientes = [];
    for (let i = 0; i < clientes.length; i++) {
      abogado.clientes.push(
        await Cliente.findOne({
          where: { id: clientes[i].id },
          attributes: ["id", "asunto"],
          include: [
            {
              model: Persona,
              attributes: ["firstName", "lastName", "dni", "celular"],
            },
            {
              model: Casos,
              attributes: [
                "juez",
                "numeroExpediente",
                "juzgado",
                "detalle",
                "estado",
                "numeroLiquidacion",
                "medidaCautelar",
                "trabaAfectiva",
                "vtoMedidaCautelar",
                "vtoTrabaAfectiva",
                "jurisdiccion",
                "updatedAt",
              ],
              include: Materias,
            },
          ],
        })
      );
    }

    if (user) {
      res.json(abogado);
    } else res.sendStatus(404);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
}

async function setBann(req, res) {
  try {
    let { eMail, flag } = req.body;
    const user = await Usuario.findByPk(eMail);
    if (flag) {
      user.banned = true;
      await user.save();
      res.sendStatus(200);
    } else {
      user.banned = false;
      await user.save();
      res.sendStatus(200);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
}
async function putCaso(req, res) {
  try {
    let {
      detalle,
      estado,
      juez,
      juzgado,
      numeroExpediente,
      numeroLiquidacion,
      medidaCautelar,
      trabaAfectiva,
      vtoMedidaCautelar,
      vtoTrabaAfectiva,
      jurisdiccion,
      materia,
    } = req.body;
    let caso = await Casos.findByPk(numeroLiquidacion);
    if (vtoMedidaCautelar === "") vtoMedidaCautelar = null;
    if (vtoTrabaAfectiva === "") vtoTrabaAfectiva = null;
    if (caso) {
      caso.detalle = detalle;
      caso.estado = estado;
      caso.juez = juez;
      caso.juzgado = juzgado;
      caso.numeroExpediente = numeroExpediente;
      caso.medidaCautelar = medidaCautelar;
      caso.vtoMedidaCautelar = vtoMedidaCautelar;
      caso.trabaAfectiva = trabaAfectiva;
      caso.vtoTrabaAfectiva = vtoTrabaAfectiva;
      caso.jurisdiccion = jurisdiccion;
      const auxMateria = await Materias.findByPk(materia);
      caso.setMaterias(auxMateria);
      await caso.save();
      return res.sendStatus(200);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
}

// MP
async function modificarTicket(req, res) {
  const { enlace, n_operacion } = req.body;

  try {
    const ticket = await Ticket.findOne({ where: { enlace: enlace } });

    let mpApi = (
      await axios.get(
        `https://api.mercadopago.com/v1/payments/search?access_token=${process.env.MERCADOPAGO_API_PROD_ACCESS_TOKEN}`
      )
    ).data;
    console.log(mpApi);
    mpApi = mpApi.results.filter((e) => {
      if (e.description == ticket.titulo) return e;
    });
    ticket.n_operacion = mpApi[0].id;
    ticket.estatus = mpApi[0].status;
    ticket.detalle_estatus = mpApi[0].status_detail;
    ticket.medioDePago = mpApi[0].payment_type_id;
    console.log("modifico?", ticket);
    Promise.all([await ticket.save()]);

    if (ticket.titulo === mpApi.description) {
      ticket.n_operacion = mpApi.id;
      ticket.estatus = mpApi.status;
      ticket.detalle_estatus = mpApi.status_detail;
      ticket.medioDePago = mpApi.payment_type_id;

      Promise.all([await ticket.save()]);

      return res.send({
        ...{
          estatus: mpApi.status,
          detalle_estatus: mpApi.status_detail,
          medioDePago: mpApi.payment_type_id,
        },
        ticket,
      });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function clienteAbogado(req, res) {
  try {
    const { abogado, cliente, abogadoAntiguo } = req.body;
    const auxCliente = await Cliente.findByPk(cliente);
    let auxAbogado = await Usuario.findByPk(abogado);
    let auxAbogado1 = await Abogado.findByPk(auxAbogado.abogadoId);
    if (abogadoAntiguo !== undefined) {
      const auxAbogadoAntiguo = await Abogado.findByPk(abogadoAntiguo);
      await auxCliente.removeAbogado(auxAbogadoAntiguo);
    }
    if (auxAbogado1 && auxCliente) {
      auxAbogado1.addClientes(auxCliente);
      return res.sendStatus(200);
    } else return res.sendStatus(404);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
}
async function items(req, res) {
  try {
    const { id, descripcion } = req.body;
    const actualAbout = await Items.findByPk(id);
    if (descripcion !== "" && descripcion)
      actualAbout.descripcion = descripcion;
    await actualAbout.save();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function about(req, res) {
  try {
    const { id, sobreNosotros, nuestraFilosofia, contacto, direccion } =
      req.body;

    const actualAbout = await About.findByPk(id);

    console.log(nuestraFilosofia);
    if (sobreNosotros !== "" && sobreNosotros) {
      actualAbout.sobreNosotros = sobreNosotros;
    } else {
      throw new Error("falta sobre nosotros");
    }
    if (nuestraFilosofia !== "" && nuestraFilosofia) {
      actualAbout.nuestraFilosofia = nuestraFilosofia;
    } else {
      throw new Error("falta nuestra filosofia");
    }
    if (contacto !== "" && contacto) actualAbout.contacto = contacto;
    if (direccion !== "" && direccion) actualAbout.direccion = direccion;
    await actualAbout.save();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function modificarDia(req, res) {
  const { diaId, form } = req.body;

  const { fecha, notaModificar, turnos } = form;

  let cambioFecha = false;

  try {
    const dia = await Dia.findByPk(diaId);

    dia.nota = notaModificar;
    if (new Date(dia.fecha).toISOString().slice(0, 10) !== fecha) {
      cambioFecha =
        new Date(fecha).getTime() + new Date(fecha).getTimezoneOffset() * 60000;

      dia.fecha = cambioFecha;
    }

    await dia.save();

    turnos.map(async (turno) => {
      let turnoExiste = await Turno.findByPk(turno.id);

      if (
        (cambioFecha && turnoExiste?.clienteId) ||
        (turnoExiste?.clienteId && turnoExiste?.hora !== turno.hora)
      ) {
        // console.log(turnoExiste?.hora !== turno.hora)
        // console.log(turnoExiste?.hora, turno.hora)

        const cliente = await Cliente.findOne({
          where: { id: turnoExiste.clienteId },
          include: [{ model: Usuario }],
        });

        enviarEmail.send({
          email: cliente.usuario.eMail,
          fecha: cambioFecha
            ? new Date(cambioFecha).toLocaleDateString()
            : new Date(dia.fecha).toLocaleDateString(),
          hora: turno.hora,
          subject: "Turno reprogramado",
          htmlFile: "turno-reprogramado.html",
        });
      }

      if (turnoExiste) {
        return await Turno.update(turno, { where: { id: turnoExiste.id } });
      }
      if (!turnoExiste) {
        return await Turno.create({ hora: turno.hora, diumId: dia.id });
      }
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

module.exports = {
  usuario,
  asignaConsulta,
  modificarAbogado,
  setBann,
  getAbogado,
  modificarTicket,
  putCaso,
  clienteAbogado,
  items,
  about,
  modificarDia,
};
