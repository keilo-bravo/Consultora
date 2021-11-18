import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getUsuarios } from "../../redux/actions/index.js";
import { correoNoOK, createOK } from "./alert.js";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import Navbar from "../home-page/Navbar/Navbar.jsx";

import "./sign.css";

export const NewPass = ({history}) => {
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getUsuarios());
    }, [dispatch]);

    const { usuarios } = useSelector((state) => state);

    const [eMail, setEmail] = useState("");
    const [CAPTCHA, setCAPTCHA] = useState(false);

    const auth = getAuth();
  
    const Cambiopass = async () => {
        // cambio.preventDefault();
        
        if (CAPTCHA && usuarios.some((e) => e.eMail.toString() === eMail.toString())) {
            // 
            await sendPasswordResetEmail(auth, eMail)
            .then(()=>{
                createOK()
                setTimeout((history.push("/ingreso")),5000)
            },function (error){
                correoNoOK()
            })
        }
        else { 
            correoNoOK()
        }
    }
    return (
        <>
        <Navbar navId={"menu"} ></Navbar>
        <div className="container p-4">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-8 mx-auto">
                    <div className="card text-center">
                        <div className="card-header">
                            <h3>Nueva clave</h3>
                        </div>
                        <form className="card-body form-sign" onSubmit={Cambiopass}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={eMail}
                                    name="Mail"
                                    autoComplete="off"
                                    placeholder="Email : Ejemplo@ejemplo.com"
                                    className="form-control"
                                    required
                                    onChange={(e) => {
                                      setEmail(e.target.value);
                                    }}
                              />
                            </div>
                            <ReCAPTCHA
                                sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA}
                                onChange={()=>{setCAPTCHA(true)}}
                            />

                            <div className="form-group">
                                <button
                                    className="btn btn-success btn-block"
                                    // onClick={(e)=>Cambiopass(e)}
                                    disabled={
                                      eMail === ""
                                    }
                                >
                                    Cambiar
                                </button>
                            </div>
                        </form>
                        <div className="card-footer">
                            <Link to="/ingreso">
                            <label className="pointer">
                                Ya tengo una cuenta. INGRESAR
                            </label>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
export default NewPass;