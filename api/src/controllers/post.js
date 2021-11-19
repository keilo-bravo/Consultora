const { uuid } = require("uuidv4");
const cloudinary = require("../config/cloudinary");
const enviarEmail = require("../email/email");
const mercadopago = require("../config/MercadoPago");
const bodyParser = require("body-parser");

const {
  Casos,
  Usuario,
  Persona,
  Cliente,
  Abogado,
  Consulta,
  Admin,
  Materias,
  Ticket,
  Items,
  Resena,
  Dia,
  Turno,
} = require("../db");
// let vec=["Derecho Penal", "Derecho Civil", "Derecho Corporativo", "Derecho Comercial", "Derecho Familia", "Derecho Contencioso",
// "Derecho Administrativo", "Derecho Laboral", "Derecho Notarial"]

//MP
const postTickets = async (req, res, next) => {
  const { title, unit_price, casoid, consultaid } = req.body;

  let preference = {
    items: [
      {
        title: title,
        unit_price: parseInt(unit_price),
        quantity: 1,
      },
    ],
  };
  try {
    const response = await mercadopago.preferences.create(preference);

    let ticket = {
      titulo: title,
      precio: unit_price,
      enlace: response.body.init_point,
      n_operacion: "",
      estatus: "pending",
      detalle_estatus: "not accredited",
      medioDePago: "No information",
    };
    // Tickets.create(ticket)
    if (!!casoid) {
      const cass = await Consulta.findByPk(casoid);

      const tickets = await Ticket.create(ticket);

      tickets.setCasos(cass);

      res.json({
        cass,
        tickets,
      });
    } else {
      const consul = await Consulta.findByPk(consultaid);

      const tickets = await consul.setTicket(tickets);

      tickets.setConsultum(consul);

      res.json({
        consul,
        tickets,
      });
      // res.sendStatus(200);
    }
  } catch {
    (function (error) {
      console.log(error);
    });
  }
};
// CLOUDINARY
async function subirImagen(req, res) {
  const { email } = req.body;

  try {
    let result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        public_id: `${Date.now()}`,
        resource_type: "auto", // jpeg, png
      }
    );

    const user = await Usuario.findByPk(email);
    if (!user) return res.sendStatus(404);
    const abogado = await Abogado.findOne({ where: { id: user.abogadoId } });
    if (!abogado) return res.sendStatus(404);

    if (abogado.imagen) {
      await cloudinary.uploader.destroy(
        abogado.imagen
          .substring(abogado.imagen.lastIndexOf("/") + 1)
          .slice(0, -4),
        (err, result) => {
          console.log(err);
        }
      );
    }

    abogado.imagen = result.secure_url;
    await abogado.save();

    return res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    console.log(error);
  }
}

async function eliminarImagen(req, res) {
  const { public_id, email } = req.body;

  try {
    await cloudinary.uploader.destroy(public_id, (err, result) => {
      if (err) return res.json({ err });
    });

    const user = await Usuario.findByPk(email);
    if (!user) return res.sendStatus(404);
    const abogado = await Abogado.findOne({ where: { id: user.abogadoId } });
    if (!abogado) return res.sendStatus(404);
    abogado.imagen = "";
    await abogado.save();
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function setUsuarios(req, res) {
  const { eMail, firstName, dni, lastName, celular, password } = req.body;

  try {
    let allUsers = await Usuario.findAll({});
    if (allUsers.length === 0) {
      let aux = await Usuario.findByPk(eMail);
      let aux2 = await Persona.findByPk(dni);
      if (!aux && !aux2) {
        const user = await Usuario.create({
          eMail,
          password,
        });

        const person = await Persona.create({
          firstName,
          dni,
          lastName,
          celular,
        });

        const adm = await Admin.create({ tipo: "gm" });
        person.setUsuario(user);
        adm.setUsuario(user);
        res.sendStatus(200);
      } else res.sendStatus(500);
    } else {
      let aux = await Usuario.findByPk(eMail);
      let aux2 = await Persona.findByPk(dni);
      if (!aux && !aux2) {
        const user = await Usuario.create({
          eMail,
          password,
        });

        const person = await Persona.create({
          firstName,
          dni,
          lastName,
          celular,
        });
        const client = await Cliente.create({});

        person.setUsuario(user);
        client.setUsuario(user);
        client.setPersona(person);
        res.sendStatus(200);
      } else res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
async function setAbogado(req, res) {
  try {
    const { eMail, flag } = req.body;
    let user = await Usuario.findByPk(eMail);
    console.log(user);
    let persona = await Persona.findByPk(user.personaDni);
    if (flag) {
      const abogado = await Abogado.create({});
      if (user) {
        user.slug = `${persona.firstName}-${persona.lastName}`;
        const cliente = await Cliente.findByPk(user.clienteId);
        if (cliente) await cliente.destroy();
        abogado.setUsuario(user);
        abogado.setPersona(persona);
        return res.sendStatus(200);
      }
      return res.sendStatus(404);
    } else {
      if (!user.adminId) {
        const client = await Cliente.create();
        const person = await Cliente.findByPk(user.personaDni);
        client.setUsuario(user);
        client.setPersona(person);
      }
      let abogado = await Abogado.findByPk(user.abogadoId);
      await abogado?.destroy();
      abogado = await Abogado.findByPk(user.abogadoId);
      if (!abogado) return res.sendStatus(200);
      else return res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function setCasos(req, res) {
  try {
    const {
      juez,
      numeroLiquidacion,
      numeroExpediente,
      juzgado,
      detalle,
      estado,
      medidaCautelar,
      trabaAfectiva,
      vtoMedidaCautelar,
      vtoTrabaAfectiva,
      jurisdiccion,
      materia,
      id,
    } = req.body;

    const caso = Casos.build({
      trabaAfectiva,
      medidaCautelar,
      numeroLiquidacion,
      juez,
      numeroLiquidacion,
      numeroExpediente,
      juzgado,
      detalle,
      estado,
      medidaCautelar,
      trabaAfectiva,
      vtoMedidaCautelar,
      vtoTrabaAfectiva,
      jurisdiccion,
    });
    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      await caso.save();
      const auxMateria = await Materias.findByPk(materia);
      auxMateria.addCasos(caso);
      cliente.addCasos(caso);
      return res.sendStatus(200);
    } else return res.sendStatus(404);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
}

async function setConsulta(req, res, next) {
  const { nombre, apellido, dni, telefono, email, mensaje } = req.body;
  if (nombre && apellido && dni && telefono && email && mensaje) {
    try {
      const consulta = {
        id: uuid(),
        nombre,
        apellido,
        dni,
        telefono,
        email,
        mensaje,
      };
      await Consulta.create(consulta);

      enviarEmail.send({
        email,
        mensaje,
        subject: "Consulta recibida",
        htmlFile: "consulta.html",
      });

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

async function setAdmin(req, res) {
  try {
    const { eMail, flag } = req.body;
    let user = await Usuario.findByPk(eMail);
    if (flag) {
      const admin = await Admin.create({ tipo: "normal" });
      if (user.clienteId) {
        const client = await Cliente.findByPk(user.clienteId);
        await client.destroy();
      }
      if (user) {
        admin.setUsuario(user);
        return res.sendStatus(200);
      }
      return res.sendStatus(404);
    } else {
      if (!user.abogadoId) {
        const client = await Cliente.create();
        const person = await Persona.findByPk(user.personaDni);
        client.setUsuario(user);
        client.setPersona(person);
      }
      let admin = await Admin.findByPk(user.adminId);
      await admin.destroy();
      admin = await Abogado.findByPk(user.adminId);
      if (!admin) return res.sendStatus(200);
      else return res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function reiniciarPassword(req, res) {}
async function setReseña(req, res, next) {
  const { abogadoId, clienteId, titulo, mensaje, puntuacion } = req.body;
  if (abogadoId && clienteId && titulo && mensaje && puntuacion) {
    try {
      let reseña = {
        abogadoId,
        clienteId,
        titulo,
        mensaje,
        puntuacion,
      };
      await Resena.create(reseña);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      next({ msg: "fallo algo en post reseña" });
    }
  } else {
    sen.sendStatus(500);
  }
}

async function postDia(req, res) {
  const { form, abogadoId } = req.body;
  const { fechas, nota, turnos } = form;

  try {
    const abogado = await Abogado.findByPk(abogadoId);

    fechas.map((d) => {
      return Dia.create({ fecha: d, nota }).then((dia) => {
        abogado.addDia(dia);
        turnos.map((turno) => {
          return Turno.create({ hora: turno.hora, diumId: dia.id }).then(
            () => {}
          );
        });
      });
    });

    return res.json({ mensaje: "Creados con éxito" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function confirmarTurno(req, res) {
  const { clienteId, turnoId, fecha } = req.body;

  try {
    const cliente = await Cliente.findByPk(clienteId);

    const turno = await Turno.findByPk(turnoId);

    if (turno.clienteId) {
      return res.status(400).json({ mensaje: "El turno fue tomado" });
    }

    await cliente.setTurno(turno);

    const { eMail } = await cliente.getUsuario();

    enviarEmail.send({
      email: eMail,
      fecha: new Date(fecha).toLocaleDateString(),
      hora: turno.hora,
      subject: "Turno confirmado",
      htmlFile: "turno-confirmado.html",
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

//MP automatizado
const postPago = async (req, res, next) => {
  const MPInfo = req.body;

  try {
    const mpApi = (
      await axios.get(
        `https://api.mercadopago.com/v1/payments/${MPInfo.data.id}?access_token=${process.env.MERCADOPAGO_API_PROD_ACCESS_TOKEN}`
      )
    ).data;

    const ticket = await Ticket.findOne({
      where: { titulo: mpApi.description },
    });

    if (mpApi.description && ticket.titulo === mpApi.description) {
      ticket.n_operacion = mpApi.id;
      ticket.estatus = mpApi.status;
      ticket.detalle_estatus = mpApi.status_detail;
      ticket.medioDePago = mpApi.payment_type_id;

      Promise.all([await ticket.save()]);
      res.sendStatus(200);
    }

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

async function items(req, res) {
  try {
    const { descripcion } = req.body;
    // const { descripcion } = item
    const item = await Items.create({ descripcion: descripcion });
    console.log(item);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function reiniciarPassword(req, res) {
  const { eMail, password } = req.body;

  try {
    const thisUsers = await Usuario.findOne({ where: { eMail: eMail } });

    if (thisUsers.eMail != undefined) {
      thisUsers.password = password;

      Promise.all([await thisUsers.save()]);
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function reiniciarPassword(req, res) {
  const { eMail, password } = req.body;

  try {
    const thisUsers = await Usuario.findOne({ where: { eMail: eMail } });

    if (thisUsers.eMail != undefined) {
      thisUsers.password = password;

      Promise.all([await thisUsers.save()]);
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
module.exports = {
  setUsuarios,
  setCasos,
  setAbogado,
  setConsulta,
  setAdmin,
  eliminarImagen,
  subirImagen,
  postTickets,
  items,
  reiniciarPassword,
  setReseña,
  postPago,
  postDia,
  confirmarTurno,
};
