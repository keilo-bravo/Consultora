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
  Ticket
} = require("../db");
// let vec=["Derecho Penal", "Derecho Civil", "Derecho Corporativo", "Derecho Comercial", "Derecho Familia", "Derecho Contencioso",
// "Derecho Administrativo", "Derecho Laboral", "Derecho Notarial"]

//MP -Generar link de pago
const postTickets = async (req, res, next) => {
  const { title, unit_price, casoid, consultaid } = req.body;

  console.log(title, unit_price, casoid, consultaid);

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

    const response = await mercadopago.preferences.create(preference)

    // console.log(response.body.init_point);
    let ticket = {
      titulo: title,
      precio: unit_price,
      enlace: response.body.init_point,
      n_operacion: "",
      estatus: "pending",
      detalle_estatus: "not accredited",
      medioDePago: "No information"
    }
    // Tickets.create(ticket)
    if (!!casoid) {
      const cass = await Consulta.findByPk(casoid)

      const tickets = await Ticket.create(ticket)


      tickets.setCasos(cass)


      res.json({
        cass, tickets
      });
    }
    else {
      const consul = await Consulta.findByPk(consultaid)

      const tickets = await Ticket.create(ticket)


      consul.setTicket(tickets)


      res.json({
        consul, tickets
      });
      // res.sendStatus(200);
    }
  }
  catch {
    (function (error) {
      console.log(error);
    })
  }
};
//MP automatizado
const postPago = async (req, res, next) => {
  const MPInfo = req.body

  try {

    const mpApi = (await axios.get(`https://api.mercadopago.com/v1/payments/${MPInfo.data.id}?access_token=${process.env.MERCADOPAGO_API_PROD_ACCESS_TOKEN}`)).data

    const ticket = await Ticket.findOne({ where: { titulo: mpApi.description } });

    if (mpApi.description && ticket.titulo===mpApi.description){
      ticket.n_operacion = mpApi.id
      ticket.estatus = mpApi.status
      ticket.detalle_estatus = mpApi.status_detail
      ticket.medioDePago = mpApi.payment_type_id
  
      Promise.all([
        await ticket.save(),
      ]);
      
      res.sendStatus(200);
      return res.send({
        ...{
          estatus: mpApi.status,
          detalle_estatus: mpApi.status_detail,
          medioDePago: mpApi.payment_type_id
        },
        ticket,
      })
    }

      res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

// CLOUDINARY
async function subirImagen(req, res) {
  const { email } = req.body;

  console.log(req.files);

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
        const client = await Cliente.create({});

        const adm = await Admin.create({ tipo: "gm" });
        person.setUsuario(user);
        client.setUsuario(user);
        adm.setUsuario(user);
        client.setPersona(person);
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
    let persona = await Persona.findByPk(user.personaDni);
    if (flag) {
      const abogado = await Abogado.create({});
      if (user) {
        user.slug = `${persona.firstName}-${persona.lastName}`;
        abogado.setUsuario(user);
        abogado.setPersona(persona);
        return res.sendStatus(200);
      }
      return res.sendStatus(404);
    } else {
      let abogado = await Abogado.findByPk(user.abogadoId);
      await abogado.destroy();
      abogado = await Abogado.findByPk(user.abogadoId);
      if (!abogado) return res.sendStatus(200);
      else return res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  return res.sendStatus(404);
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
      eMail,
      medidaCautelar,
      trabaAfectiva,
      vtoMedidaCautelar,
      vtoTrabaAfectiva,
      jurisdiccion,
      materia
    } = req.body;

    const caso = await Casos.create({
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
    const auxMateria = await Materias.findByPk(materia)
    auxMateria.addCasos(caso)
    const { clienteId } = await Usuario.findByPk(eMail);
    const cliente = await Cliente.findByPk(clienteId);
    cliente.addCasos(caso);
    res.sendStatus(200);
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
// async function setAdmin(req, res) {
//   const { eMail, firstName, dni, lastName, celular, password } = req.body
//   try {
//     let aux = await Usuario.findByPk(eMail)
//     let aux2 = await Persona.findByPk(dni)
//     if (!aux && !aux2) {
//       const user = await Usuario.create({
//         eMail,
//         password
//       })

//       const person = await Persona.create({
//         firstName,
//         dni,
//         lastName,
//         celular
//       })
//       const admin = await Admin.create({})

//       person.setUsuario(user)
//       admin.setUsuario(user)
//       // client.setPersona(person)
//       res.sendStatus(200)
//     }
//     else if (!aux.adminId) {
//       const admin = await Admin.create({})
//       admin.setUsuario(aux)
//       res.sendStatus(200)
//     } else res.sendStatus(500)

//   } catch (error) {
//     console.log(error)
//     res.sendStatus(500)
//   }

// }
async function setAdmin(req, res) {
  try {
    const { eMail, flag } = req.body;
    let user = await Usuario.findByPk(eMail);
    if (flag) {
      const admin = await Admin.create({ tipo: "normal" });
      if (user) {
        admin.setUsuario(user);
        return res.sendStatus(200);
      }
      return res.sendStatus(404);
    } else {
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

async function reiniciarPassword(req, res) {

}

module.exports = {
  setUsuarios,
  setCasos,
  setAbogado,
  setConsulta,
  // setPersona,
  setAdmin,
  eliminarImagen,
  subirImagen,
  postTickets,
  reiniciarPassword,
  postPago
};
