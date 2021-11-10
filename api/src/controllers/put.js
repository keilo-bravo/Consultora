const {
  Casos,
  Usuario,
  Provincias,
  Materias,
  Abogado,
  Persona,
  Cliente,
  Consulta,
  Ticket
} = require("../db");
const enviarEmail = require("../email/email");
const axios = require("axios");
const mercadopago = require("../config/MercadoPago");


async function usuario(req, res) {
  try {
    // console.log(req.body, req.params, req.query)
    const { eMail } = req.body;

    const user = await Usuario.findOne({ where: { eMail } });
    if (user) {
      console.log(user);
      const abogado = await Abogado.findByPk(user.abogadoId);
      const { firstName, lastName, dni, celular } = await Persona.findByPk(
        user.personaDni
      );
      const personas = await Persona.findAll();
      if (personas.length < 2) {
        console.log("admin");
        res.send({
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
      }
      else {
        if (abogado) {
          res.send({
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
          res.send({
            ...{
              eMail: user.eMail,
              password: user.password,
              abogadoId: user.abogadoId,
              adminId: user.adminId,
              firstName,
              lastName,
              dni,
              celular,
            },
          });
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
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
        respuestaAbogado: respuesta
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
  const { nombre, apellido, detalle, estudios, experiencia } = req.body;

  try {
    const user = await Usuario.findByPk(eMail);
    if (!user) return res.sendStatus(404);
    const persona = await Persona.findByPk(user.personaDni);
    if (!persona) return res.sendStatus(404);
    let abogado = await Abogado.findOne({ where: { id: user.abogadoId } });
    if (!abogado) return res.sendStatus(404);

    persona.firstName = nombre;
    persona.lastName = apellido;
    abogado.detalle = detalle;
    abogado.estudios = estudios;
    abogado.experiencia = experiencia;
    user.slug = `${nombre}-${apellido}`;

    Promise.all([
      await persona.save(),
      await abogado.save(),
      await user.save(),
    ]);

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
    let { eMail } = req.body
    if (!eMail) {
      eMail = req.params
    }
    const user = await Usuario.findByPk(eMail)
    const { firstName, lastName, dni, celular } = await Persona.findByPk(user.personaDni)
    const { detalle, clientes, imagen, experiencia, estudios } = await Abogado.findOne({ where: { id: user.abogadoId }, include: Cliente })
    let abogado = { ...{ eMail: user.eMail, firstName, lastName, dni, celular }, detalle, imagen, experiencia, estudios }
    abogado.clientes = []
    for (let i = 0; i < clientes.length; i++) {
      abogado.clientes.push(await Cliente.findOne({
        where: { id: clientes[i].id }, attributes: ["id", "asunto"], include: [{ model: Persona, attributes: ["firstName", "lastName", "dni", "celular"] },
        {
          model: Casos, attributes: ["juez", "numeroExpediente", "juzgado", "detalle", "estado",
            "numeroLiquidacion", "medidaCautelar", "trabaAfectiva", "vtoMedidaCautelar", "vtoTrabaAfectiva", "jurisdiccion"
          ], include: Materias
        }]
      }))
    }

    if (user) {
      res.json(abogado)
    } else res.sendStatus(404)
  } catch (error) {
    console.error(error)
    res.sendStatus(404)
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
    let { detalle, estado, juez, juzgado, numeroExpediente, numeroLiquidacion, medidaCautelar, trabaAfectiva, vtoMedidaCautelar, vtoTrabaAfectiva, jurisdiccion, materia } = req.body
    let caso = await Casos.findByPk(numeroLiquidacion)
    if (vtoMedidaCautelar === "") vtoMedidaCautelar = null
    if (vtoTrabaAfectiva === "") vtoTrabaAfectiva = null
    if (caso) {
      caso.detalle = detalle
      caso.estado = estado
      caso.juez = juez
      caso.juzgado = juzgado
      caso.numeroExpediente = numeroExpediente
      caso.medidaCautelar = medidaCautelar
      caso.vtoMedidaCautelar = vtoMedidaCautelar
      caso.trabaAfectiva = trabaAfectiva
      caso.vtoTrabaAfectiva = vtoTrabaAfectiva
      caso.jurisdiccion = jurisdiccion
      const auxMateria = await Materias.findByPk(materia)
      caso.setMaterias(auxMateria)
      await caso.save()
      return res.sendStatus(200)
    }
  } catch (error) {
    console.error(error)
    res.sendStatus(404)
  }
}

// MP
async function modificarTicket(req, res) {

  const { enlace, n_operacion } = req.body;

  try {
    const ticket = await Ticket.findOne({ where: { enlace: enlace } });

    let mpApi = (await axios.get(`https://api.mercadopago.com/v1/payments/${n_operacion}?access_token=${process.env.MERCADOPAGO_API_PROD_ACCESS_TOKEN}`)).data


    if (ticket.titulo===mpApi.description){
      ticket.n_operacion = mpApi.id
      ticket.estatus = mpApi.status
      ticket.detalle_estatus = mpApi.status_detail
      ticket.medioDePago = mpApi.payment_type_id
  
      Promise.all([
        await ticket.save(),
      ]);
  
      return res.send({
        ...{
          estatus: mpApi.status,
          detalle_estatus: mpApi.status_detail,
          medioDePago: mpApi.payment_type_id
        },
        ticket,
      })}

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
  putCaso
};
