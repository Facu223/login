import React, { useState, Fragment } from "react";
import estilos2 from "./estilos2.css";
import Input from "./Input";
import Principal from "./Principal";
import gas from "./images/gas.png";
import imagen from "./imagen.css";
import { Redirect } from "react-router";

const Login = () => {
   const [user, setUser] = useState("");
   const [password, setPassword] = useState("");
   const [passwordError, setPasswordError] = useState(false);
   const [isLogin, setIsLogin] = useState(false);
   const [hasError, setHasError] = useState(false);

   function handleChange(name, value) {
      if (name === "usuario") {
         setUser(value);
         setHasError(false);
      } else {
         if (value.length < 6) {
            setPasswordError(true);
            setHasError(false);
         } else {
            setPasswordError(false);
            setPassword(value);
            setHasError(false);
         }
      }
   }

   const handleSubmit = async () => {
      try {
         const userData = { user, password };

         const baseUrl = `http://localhost:5000/api/usuarios/admin/login`;

         const data = await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
               "Content-type": "application/json",
            },
         });
         const response = await data.json();

         localStorage.setItem("authToken", response.token);
         setIsLogin(true);
      } catch (e) {
         console.log(e);
      }
   };

   return (
      <Fragment>
         {isLogin ? (
            <Redirect to={"/dashboard"} />
         ) : (
            <div className="contenedor2">
               <div className="relative">
                  <h1 className="titulo">Bienvenido</h1>
                  <img src={gas} alt="Gas" className="imagen" />
               </div>

               {hasError && (
                  <label className="label-alert">
                     Su contraseña o usuario son incorrectos, o no existen.
                  </label>
               )}

               <div>
                  <label className="label1">Usuario</label>
               </div>

               <div>
                  <Input
                     attribute={{
                        id: "usuario",
                        name: "usuario",
                        type: "text",
                     }}
                     handleChange={handleChange}
                  />
               </div>

               <div>
                  <label className="label2">Contraseña</label>
               </div>

               <div>
                  <Input
                     attribute={{
                        id: "contraseña",
                        name: "contraseña",
                        type: "password",
                     }}
                     handleChange={handleChange}
                     param={passwordError}
                  />
               </div>

               {passwordError && (
                  <label className="label-error">Contraseña invalida</label>
               )}

               <div>
                  <button onClick={handleSubmit} className="botonsito">
                     Ingresar
                  </button>
               </div>
            </div>
         )}
      </Fragment>
   );
};

export default Login;
