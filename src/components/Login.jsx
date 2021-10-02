import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import estilos2 from "./estilos2.css";
import Input from "./Input";
import gas from "./images/gas.png";
import imagen from "./imagen.css";
import { Redirect } from "react-router";

const Login = () => {
   const [user, setUser] = useState("");
   const [password, setPassword] = useState("");
   const [isLogin, setIsLogin] = useState(false);
   const [hasError, setHasError] = useState(false);
   const state = useSelector((state) => state);
   const dispatch = useDispatch();

   function handleChange(name, value) {
      if (name === "usuario") {
         setUser(value);
         setHasError(false);
      } else {
         if (value.length < 6) {
            setHasError(false);
         } else {
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

         if (data.status === 401) {
            setHasError(true);
            return;
         }

         dispatch({
            type: "LOGIN",
            payload: {
               token: response.token,
               user: { usuario: response.user.usuario, rol: response.user.rol },
            },
         });

         // Save user information in local storage
         localStorage.setItem("authToken", response.token);
         localStorage.setItem("user", JSON.stringify(response.user));

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
                  <div className="invalid__credentials">
                     <p>Su contraseña o usuario son incorrectos</p>
                  </div>
               )}

               <div>
                  <label className="label1">Usuario</label>
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
                  <Input
                     attribute={{
                        id: "contraseña",
                        name: "contraseña",
                        type: "password",
                     }}
                     handleChange={handleChange}
                  />
               </div>

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
