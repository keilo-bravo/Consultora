import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "@firebase/auth";
import { getUsuario } from "./redux/actions";
import HomePage from "./components/home-page/HomePage";
import FormCita from "./components/FormCita/FormCita";
import Perfiles from "./components/perfiles/Perfiles";
import PerfilAbogado from "./components/perfilAbogado/PerfilAbogado";
import ModificarAbogado from "./components/modificarAbogado/ModificarAbogado";
import VistaConsultasAbogado from "./components/vistaConsultasAbogado/VistaConsultasAbogado";
import Clientes from "./components/clientes/clientes";
import HomeAbogado from "./components/home-Abogado/HomeAbogado";
import NavAbogado from "./components/home-Abogado/NavAbogado/NavAbogado";
import Footer from "./components/home-Abogado/Footer/Footer";
import Signin from "./components/Sign/singnin";
import Signup from "./components/Sign/signup";
import FormCasos from "./components/FormCasos/FormCasos";
import HomeUsuario from "./components/homeUsuario/HomeUsuario";
import ConsultasUsuario from "./components/homeUsuario/consultasUsuario/ConsultasUsuario";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./components/adminPage/adminPage";
import Loaded from './components/Loaded/Loaded';
import "./App.css";
import { NewPass } from './components/Sign/newpass';
function App() {
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user?.uid) {
        dispatch(getUsuario({ eMail: user.email }));
      }
    });
  }, [])
  //fallback={null}>
  return (
    <div className="App container-fluid p-0">
    <Suspense fallback={Loaded}>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/signup" component={Signup} />
        
        <Route exact path="/consulta">
          <FormCita />
        </Route>
        <Route path="/perfil/:slug">
          <PerfilAbogado />
        </Route>
        <Route exact path="/abogados">
          <Perfiles />
        </Route>
        <Route exact path={usuario?.adminId!=null ? "/admin": "/ingreso"} component={usuario?.adminId !=null ? AdminPage: Signin}></Route>

        <Route  exact path="/ingreso" component={Signin} />
        <Route exact path="/cita" component={FormCita} />
        <Route exact path="/Cambiopass" component={NewPass} />
        <Route exact path={
          (usuario) ?"/user/panel": "/ingreso"}>
          {usuario  ? <HomeUsuario />:<Signin/>}
          //kotoc48625@healteas.com
        </Route>
        <Route exact path={usuario?.clienteId!=null ?"/user/panel/consultas": "/ingreso"}>
        {usuario?.clienteId!=null ? <ConsultasUsuario/>:<Signin/>}
        </Route>
        <div>
          <NavAbogado />
          <Route exact path={usuario?.abogadoId!=null ?"/user/abogado": "/ingreso"}>
          {usuario?.abogadoId!=null ? <HomeAbogado />:<Signin/>}
          </Route>
          <Route exact path={usuario?.abogadoId!=null ?"/user/abogado/clientes": "/ingreso"}>
          {usuario?.abogadoId!=null ? <Clientes />:<Signin/>}
          </Route>
          <Route exact path={usuario?.abogadoId!=null ?"/user/abogado/consultas": "/ingreso"}>
          {usuario?.abogadoId!=null ? <VistaConsultasAbogado />:<Signin/>}
          </Route>
          <Route exact path={usuario?.abogadoId!=null ?"/user/abogado/modificar-perfil": "/ingreso"} component={usuario?.abogadoId!=null ?ModificarAbogado: Signin} />
          <Route exact path={usuario?.abogadoId!=null ?"/user/abogado/nuevo-caso": "/ingreso"}>
          {usuario?.abogadoId!=null ? <FormCasos />:<Signin/>}
          </Route>
          
          {/* <Route component={ErrorPage} path="/:rest*" /> */}
          <Footer />
        </div>
      </Switch>
        </Suspense>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
