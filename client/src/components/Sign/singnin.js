import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
  signInWithRedirect,
} from "firebase/auth";
import LogoGoogle from "../home-page/assets/img/google-logo-9812.png";
import {
  getUsuario,
  postUsuario,
  getPersonas,
  getUsuarios,
} from "../../redux/actions";
import {
  sessionERR,
  sessionIN,
  sessionOUT,
  createOK,
  correoNoOK,
  dniNoOK,
} from "./alert";
import { Link } from "react-router-dom";
import md5 from "md5";
import { Redirect } from "react-router";
import LogoBlanco from "../home-page/assets/img/logo-blacno-sin-fondo.png";
import "./sign.css";
import ButtonSign from "./ButtonSign";
import Signup from "./signup";
import NavBarGeneral from "../NavBarGeneral/NavBarGeneral";
import ButtonsNav from "../ButtonsNav/ButtonsNav";

export const Signin = () => {
  const { usuarios, personas, usuario } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonas());
    dispatch(getUsuarios());
  }, [dispatch]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [celular, setPhone] = useState("");
  const [dni, setDni] = useState("");
  const [eMail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayname, setDisplayName] = useState(null);

  const auth = getAuth();
  const google = new GoogleAuthProvider();
  const loginGoogle = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        await signInWithPopup(auth, google)
          .then((e) => {
            setDisplayName(e.user.displayName);
            const aux = e.user.email;
            if (usuarios.some((e) => e.eMail == aux)) {
              dispatch(getUsuario({ eMail: e.user.email }));
            } else {
              setEmail(aux);
              setFirstName(e.user.displayName.split(" ")[0]);
              setLastName(e.user.displayName.split(" ")[1]);
              setPassword(md5(e.user.email));
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const GoTo = async () => {
    if (
      usuarios.some((e) => e.eMail.toString() === eMail.toString()) ||
      personas.some((e) => e.dni.toString() === dni.toString())
    ) {
      usuarios.some((e) => e.eMail.toString() === eMail.toString())
        ? correoNoOK()
        : dniNoOK();
    } else {
      dispatch(
        postUsuario({
          eMail: eMail,
          firstName: firstName,
          dni: dni,
          lastName: lastName,
          celular: celular,
          password: md5(password),
        })
      )
        .then(() => {
          dispatch(getUsuario({ eMail: eMail }));
        })
        .catch((error) => {});
      createOK();
      setFirstName("");
      setLastName("");
      setPhone("");
      setDni("");
      setEmail("");
      setPassword("");
    }
  };

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        setEmail("");
        setPassword("");
        dispatch(getUsuario({}));
        setDisplayName(null);
        sessionOUT();
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const Login = async () => {
    await setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        await signInWithEmailAndPassword(auth, eMail, md5(password))
          .then((userCredential) => {
            // Signed in
            console.log("login");
            const user = userCredential.user;
            dispatch(getUsuario({ eMail: eMail }));
            sessionIN();
            setEmail("");
            setPassword("");
            // ...
          })
          .catch((error) => {
            console.log("error");
            sessionERR();
            const errorCode = error.code;
            const errorMessage = error.message;
            setEmail("");
            setPassword("");
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const handleShwoSignup = (e) => {
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");
  };

  const handleShwoSignin = () => {
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
    console.log(container.classList);
  };

  return usuario?.adminId ? (
    <Redirect to="/admin" />
  ) : usuario?.abogadoId ? (
    <Redirect to="/user/abogado" />
  ) : (
    <div className="hidden">
      <div>
        <NavBarGeneral />
        {!!usuario.firstName ? (
          <Redirect to="/user/panel" />
        ) : 
        displayname ? (
          <div className="body_displayname">
            <div className="bg_blue_image_displayname">
              <div className="overlay_displayname overlay_right_displayname">
                <div>
                  <img src={LogoBlanco} alt="Logo" />
                  <h4>
                    ¿Tienes una cuenta? <br /> Presione "Iniciar Sesión".
                  </h4>
                  <ButtonsNav text="Iniciar Sesion" link="/ingreso" />
                </div>
              </div>
              <div className="form_container registerEmail_in_container">
                <div className="registerEmail">
                  <h3>Registro</h3>
                  <div className="singn_input_login">
                    <input
                      type="type"
                      value={firstName}
                      name="firstName"
                      autoComplete="off"
                      placeholder=" Nombre"
                      className=""
                      autoFocus
                      required
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="singn_input_login">
                    <input
                      type="type"
                      value={lastName}
                      name="lastName"
                      autoComplete="off"
                      placeholder=" Apellido"
                      className=""
                      autoFocus
                      required
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="singn_input_login">
                    <input
                      type="text"
                      value={dni}
                      name="DNI"
                      autoComplete="off"
                      placeholder="DNI : 1234567"
                      className=""
                      required
                      onChange={(e) => {
                        setDni(e.target.value);
                      }}
                    />
                  </div>
                  <div className="singn_input_login">
                    <input
                      type="text"
                      value={celular}
                      name="Number"
                      autoComplete="off"
                      placeholder="Teléfono : 11 1111-1111"
                      className=""
                      required
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                  <div className="singn_input_login">
                    <input
                      type="text"
                      value={eMail}
                      name="Mail"
                      disabled="on"
                      autoComplete="off"
                      placeholder="Email: ejemplo@ejemplo.com"
                      className=""
                      required
                    />
                  </div>
                  <div className="singn_input_login">
                    <input
                      type="password"
                      value={password}
                      disabled="on"
                      name="password"
                      autoComplete="off"
                      placeholder="Contraseña"
                      className=""
                      required
                    />
                  </div>
                  <div className="divButton_register_email">
                    <button
                      className=""
                      onClick={GoTo}
                      disabled={
                        firstName === "" ||
                        lastName === "" ||
                        dni === "" ||
                        celular === "" ||
                        eMail === "" ||
                        password.length < 6
                      }
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="body_login">
            <div id="container" className="bg_blue_image pt-4">
              <div className="overlay_container">
                <div className="overlay">
                  <div className="overlay_panel overlay_left">
                    <div>
                      <h4>
                        ¿Tienes una cuenta? <br /> Presione "Iniciar Sesión".
                      </h4>
                      <ButtonSign
                        handle={handleShwoSignin}
                        text="Iniciar Sesión"
                      />
                    </div>
                  </div>
                  <div className="overlay_panel overlay_right">
                    <div>
                      <img
                        src={LogoBlanco}
                        alt="Logo Consultora"
                        className="card-img-top mx-auto m-2 rounded-circle w-50"
                      />
                      <h3>Bienvenido a Buffet Law</h3>
                      <div className="caption_button_overlay_right">
                        <h4>
                          ¿No tiene una cuenta? <br /> Presione "Crear Cuenta" e
                          ingrese sus datos.
                        </h4>
                        <ButtonSign
                          handle={handleShwoSignup}
                          text="Crear Cuenta"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form_container sign_in_container">
                <div className="div_sign_in_container">
                  <h3>Iniciar Sesión</h3>
                  <div className="singn_input_login">
                    <input
                      type="text"
                      value={eMail}
                      name="Mail"
                      autoComplete="off"
                      required
                      placeholder="Ejemplo@ejemplo.com"
                      className="form-control"
                      autoFocus
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="singn_input_login">
                    <input
                      type="password"
                      value={password}
                      name="password"
                      autoComplete="off"
                      required
                      placeholder="Contraseña"
                      className="form-control"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <button className="button_login_signin" onClick={Login}>
                    Ingresar
                  </button>

                  <div className="contain_other_signin">
                    {" "}
                    <p className="text-center">O</p>
                    <button onClick={loginGoogle}>
                      <img src={LogoGoogle} alt="google" />{" "}
                      <p>Inicia Sesión con Google</p>
                    </button>{" "}
                  </div>
                  <div className="forgot_login">
                    <p>¿Olvidaste tu contraseña?</p>
                    <Link to="/Cambiopass">Presiona aquí</Link>
                  </div>
                </div>
              </div>
              <Signup />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Signin;