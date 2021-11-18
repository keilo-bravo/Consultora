import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { usuarioBloqueado } from "../../components/Sign/alert";

export function getMaterias() {
  return async function (dispatch) {
    try {
      const json = await axios.get("/materias");
      return dispatch({
        type: "GET_MATERIAS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSiteMateria(materia) {
  return async function (dispatch) {
    try {
      const json = await axios.get("/materias");
      const abogados = await axios.get("/abogados");
      return dispatch({
        type: "GET_MATERIAS_SITE",
        payload: json.data,
        materia,
        abogados: abogados.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAbogados() {
  return async function (dispatch) {
    try {
      const json = await axios.get("/abogados");
      return dispatch({
        type: "GET_ABOGADOS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProvincias() {
  return async function (dispatch) {
    try {
      const json = await axios.get("/provincias");
      return dispatch({
        type: "GET_PROVINCIAS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUsuarios() {
  return async function (dispatch) {
    try {
      const json = await axios.get("/usuarios");
      return dispatch({
        type: "GET_USUARIOS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCasos(data) {
  return async function (dispatch) {
    try {
      const json = await axios.get("/casos");
      return dispatch({
        type: "GET_CASOS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postCasos(payload) {
  return async function () {
    try {
      const newCaso = await axios.post("/casos/new", payload);
      return newCaso;
    } catch (error) {
      console.log(error);
    }
  };
}

export function postUsuario(usuario) {
  return async function (dispatch) {
    try {
      await axios.post("/usuario", usuario);

      return dispatch({
        type: "POST_USUARIO",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const setUsuario = (usuario) => {
  return (dispatch) => {
    return dispatch({
      type: "SET_USUARIO",
      payload: usuario,
    });
  };
};

export const getUsuario = (usuario) => {
  return (dispatch) => {
    axios
      .put("/usuario", usuario)
      .then((user) => {
        console.log(user);
        localStorage.setItem("username", user.data.firstName);
        return dispatch({
          type: "GET_USUARIO",
          payload: user.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error?.response?.status === 403) usuarioBloqueado();
        return dispatch({
          type: "GET_USUARIO",
          payload: {},
        });
      });
  };
};

export function postAbogado(abogado) {
  return async function (dispatch) {
    try {
      await axios.post("/usuario/abogado", abogado);
      return dispatch({
        type: "POST_ABOGADO",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAbogado(slug) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/abogado/${slug}`);
      return dispatch({ type: "GET_ABOGADO", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putAbogado(abogado) {
  return async function (dispatch) {
    try {
      const aux = await axios.put("/abogado", abogado);
      return dispatch({
        type: "PUT_ABOGADO",
        payload: aux.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postConsulta(consulta) {
  return async function (dispatch) {
    try {
      await axios.post("/consultas", consulta);
      return dispatch({
        type: "POST_CONSULTA",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setConsulta(consultaId, abogadoId, respuesta) {
  return async function (dispatch) {
    try {
      await axios.put("/consultas", { consultaId, abogadoId, respuesta });
      swal("La consulta fue aceptada", {
        icon: "success",
      });
      // return dispatch({
      //   type: "POST_CONSULTA",
      // });
    } catch (error) {
      console.log(error);
      swal("Ocurrió un error al asignar la consulta", {
        icon: "error",
      });
    }
  };
}

export const mostrarConsulta = (consulta) => {
  return (dispatch) => {
    return dispatch({
      type: "SET_CONSULTA",
      payload: consulta,
    });
  };
};

export const mostartDetalleConsulta = (consulta) => {
  return (dispatch) => {
    return dispatch({
      type: "SET_CONSULTA_DETALLE",
      payload: consulta,
    });
  };
};

export function setAbogado(user) {
  return async function (dispatch) {
    try {
      await axios.post("/usuario/abogado", user);
      return dispatch({
        type: "SET_ABOGADO",
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function setAdmin(user) {
  return async function (dispatch) {
    try {
      await axios.post("/adm", user);
      return dispatch({
        type: "SET_ADMIN",
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function setBann(user) {
  return async function (dispatch) {
    try {
      await axios.put("/bann", user);
      return dispatch({
        type: "SET_BANN",
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getConsultas() {
  return async function (dispatch) {
    try {
      const json = await axios.get("/consultas");
      return dispatch({
        type: "GET_CONSULTAS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      alert("no se pudo conseguir las consultas");
    }
  };
}
export function asignarConsulta(consultaId, abogadoId) {
  return async function (dispatch) {
    try {
      await axios.put("http://localhost:3001/consultas", {
        consultaId,
        abogadoId,
      });
      return dispatch({
        type: "ASIGNAR_CONSULTA",
      });
    } catch (error) {
      alert("no se pudo asignar");
    }
  };
}

export function getPersonas() {
  return async function (dispatch) {
    try {
      const json = await axios.get("/personas");
      return dispatch({
        type: "GET_PERSONAS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function deleteConsulta(id) {
  return async function (dispatch) {
    try {
      // await axios.delete(`/consultas/${id}`);
      await axios.delete(`/consultas/${id}`);
      return dispatch({
        type: "DELETE_CONSULTA",
      });
    } catch (error) {
      console.log(error);
      alert("no se pudo borrar la consulta");
    }
  };
}

export function filtrarMaterias(payload) {
  return { type: "FILTRAR_MATERIAS", payload };
}

export function filtrarProvincias(payload) {
  return { type: "FILTRAR_PROVINCIAS", payload };
}
export function putCaso(caso) {
  return async function (dispatch) {
    try {
      await axios.put("/casos/put", caso);
      return dispatch({
        type: "PUT_CASO",
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export const postTickets = (Ticket) => {
  return (dispatch) => {
    axios
      .post("/tickets/new", Ticket)
      .then((response) => {
        return dispatch({ type: "POST_TICKET" });
      })
      .catch((err) => {
        // console.log(err)
        console.log("ruta no existe");
      });
  };
};
export function getTickets(id) {
  return (dispatch) => {
    axios
      .get("/tickets", id)
      .then((tickets) => {
        return dispatch({
          type: "GET_TICKET",
          payload: tickets.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function modificarTicket(Ticket) {
  return (dispatch) => {
    axios
      .put("http://localhost:3001/tickets/edit", Ticket)
      .then((response) => {
        return dispatch({ type: "PUT_TICKET" });
      })
      .catch((err) => {
        console.log("ruta no existe");
      });
  };
}
export function setCliente(cliente, abogado) {
  return (dispatch) => {
    axios
      .post("/cliente", { cliente, abogado })
      .then((response) => {
        // return dispatch({ type: });
      })
      .catch((err) => {
        console.log("ruta no existe");
      });
  };
}
export function modificarClave(Usuario) {
  return (dispatch) => {
    axios
      .put("http://localhost:3001/newpass", Usuario)
      .then((response) => {
        return dispatch({ type: "POST_CLAVE" });
      })
      .catch((err) => {
        console.log("ruta no existe");
      });
  };
}

export function getClientes() {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/casos/all")
      .then((response) => {
        return dispatch({
          type: "GET_CLIENTS",
          payload: response.data.filter((e) => e.casos.length > 0),
        });
      })
      .catch((err) => {
        console.log("ruta no existe");
      });
  };
}
export function putClienteAbogado(cambios) {
  return (dispatch) => {
    axios
      .put("http://localhost:3001/cliente/actualizar", cambios)
      .then(() => {
        return dispatch({
          type: "PUT_CLIENTES",
        });
      })
      .catch((err) => {
        console.log("ruta no existe");
      });
  };
}

export function putAbout(about) {
  console.log(about);
  return async (dispatch) => {
    try {
      await axios.put("/about/modify", about);
      return dispatch({ type: "PUT_ABOUT" });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAbout() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/about/find");
      return dispatch({ type: "GET_ABOUT", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putItem(item) {
  return async (dispatch) => {
    try {
      await axios.put("/items/modify", item);
      return dispatch({ type: "PUT_ITEM" });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getItems() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/items/find");
      console.log(response);
      return dispatch({ type: "GET_ITEMS", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postItem(item) {
  return async (dispatch) => {
    try {
      await axios.post("/items/create", item);
      return dispatch({ type: "POST_ITEM" });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteItem(item) {
  console.log(item);
  return async (dispatch) => {
    try {
      await axios.delete("/items/delete/" + JSON.stringify(item), {
        headers: { authorization: localStorage.getItem("token") },
      });
      return dispatch({ type: "DELETE_ITEM" });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getDia(diaId) {
  return (dispatch) => {
    axios
      .get("/dia", { params: { diaId } })
      .then((resp) => {
        return dispatch({
          type: "GET_DIA",
          payload: resp.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function actionCancelarTurno(turnoId, eliminar) {
  return (dispatch) => {
    axios
      .post("/cancelar-turno", { turnoId, eliminar })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };
}
export function actionEliminarDia(diaId) {
  return (dispatch) => {
    axios
      .post("/eliminar-dia", { diaId })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
