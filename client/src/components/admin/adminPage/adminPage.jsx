/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import React, { useEffect } from "react";
import { getClientes, getUsuarios } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { Switch } from "react-router-dom";
import {
  getAuth,
  sendPasswordResetEmail,
  updatePassword,
} from "@firebase/auth";
import Dashboard from "../../Dashboard/Dashboard";
import Sidebar from "../Sidebar/Sidebar";
import AdminUsersPage from "../adminUsersPage/adminUsersPage";
import AdminNewUsersPage from "../adminNewUsersPage/adminNewUsersPage";
import AdminClientes from "../adminClients/clientes";
import AdminBannedUsersPage from "../adminBannedUsersPage/adminBannedUsersPage";
import Navbar from "../../home-page/Navbar/Navbar";
import ModifierHome from "../adminHome/modifierHome";

export default function AdminPage() {
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUsuarios());
    dispatch(getClientes());
  }, []);
  // if (adminId === undefined) return (<Redirect to="/" />)
  return (
    <div style={{ backgroundColor: "#EEEEEE" }}>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <Sidebar />
        <Switch>
          <Route path="/admin" exact component={Dashboard} />
          <Route path="/admin/users" exact component={AdminUsersPage} />
          <Route path="/admin/users/new" exact component={AdminNewUsersPage} />
          <Route path="/admin/users/clientes" exact component={AdminClientes} />
          <Route
            path="/admin/users/banned"
            exact
            component={AdminBannedUsersPage}
          />
          <Route path={"/admin/About"} exact component={ModifierHome} />
        </Switch>
      </div>
    </div>
  );
}
