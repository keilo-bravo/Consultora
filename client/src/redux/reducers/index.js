const initialState = {
  materias: [],
  usuarios: [],
  personas: [],
  usuario: {},
  provincias: [],
  abogados: [],
  abogado: {},
  error: "",
  consultas: [],
  admin: {},
  consulta: {},
  clients: [],
  ticket: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MATERIAS":
      return {
        ...state,
        materias: action.payload,
      };
    case "GET_ABOGADOS":
      return {
        ...state,
        abogados: action.payload,
      };
    case "GET_PROVINCIAS":
      return {
        ...state,
        provincias: action.payload,
      };
    case "SET_USUARIO":
      return {
        ...state,
        usuario: action.payload,
      };
    case "SET_CONSULTA":
      return {
        ...state,
        consulta: action.payload
      };
    case "GET_USUARIO":
      let user = action.payload;
      if (!user.abogadoId && !user.adminId) {
        return {
          ...state,
          usuario: action.payload,
        };
      } else if (user.adminId) {
        return {
          ...state,
          usuario: action.payload,
          admin: action.payload,
        };
      } else {
        return {
          ...state,
          usuario: action.payload,
        };
      }
    case "GET_USUARIOS":
      return {
        ...state,
        usuarios: action.payload,
      };
    case "GET_PERSONAS":
      return {
        ...state,
        personas: action.payload,
      };
    case "GET_CASOS":
      console.log(action.payload)
      return {
        ...state,
        casos: action.payload,
      };
    case "POST_USUARIO": //for login
      let aux = action.payload;
      if (!!aux.adminId) {
        return {
          ...state,
          admin: action.payload,
        };
      } else if (!!aux.abogadoId) {
        return {
          ...state,
          abogado: action.payload,
        };
      } else {
        return {
          ...state,
          usuario: action.payload,
        };
      }
    case "POST_ABOGADO":
      return {
        ...state,
      };
    case "SET_BANN":
      return {
        ...state,
      };
    case "POST_CONSULTA":
      return {
        ...state,
      };
    case "GET_ABOGADO":
      return {
        ...state,
        abogado: action.payload,
      };
    case "SET_ABOGADO":
      return {
        ...state,
      };
    case "SET_ADMIN":
      return {
        ...state,
      };
    case "GET_CONSULTAS":
      return {
        ...state,
        consultas: action.payload,
      };
    case "DELETE_CONSULTA":
      return {
        ...state,
        consultas: [],
      };
    case "FILTRAR_MATERIAS":
      const materiasFiltradas =
        action.payload === "todas"
          ? state.abogados
          : state.abogados.filter((e) => e === action.payload.nombre);
      return {
        ...state,
        abogados: materiasFiltradas,
      };
    case "FILTRAR_PROVINCIAS":
      const provinciasFiltradas =
        action.payload === "todas"
          ? state.abogados
          : state.abogados.filter((e) => e === action.payload.nombre);
      return {
        ...state,
        abogados: provinciasFiltradas,
      };
    case "GET_CLIENTES":
      return {
        ...state,
        consultas: action.payload,
      }
    case "PUT_CASO":
      return {
        ...state,

      }
    case "GET_TICKET":
      return {
        ...state,
        ticket: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
