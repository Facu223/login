import React, { useState, Fragment } from 'react'
import estilos2 from './estilos2.css';
import Input from './Input';
import Principal from './Principal';
import gas from './images/gas.png';
import imagen from './imagen.css';


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
    
      function ifMatch(param) {
        if (param.user.length > 0 && param.password.length > 0) {
          if (
            (param.user === "facundo" && param.password === "123456") ||
            (param.user === "vanesa" && param.password === "123456") ||
            (param.user === "jeremias" && param.password === "123456") ||
            (param.user === "anto" && param.password === "123456") ||
            (param.user === "luciano" && param.password === "123456")
          ) {
            const { user, password } = param;
            let ac = { user, password };
            let account = JSON.stringify(ac);
            localStorage.setItem("account", account);
            setIsLogin(true);
          } else {
            setIsLogin(false);
            setHasError(true);
          }
        } else {
          setIsLogin(false);
        }
      }
    
      function handleSubmit() {
        let account = { user, password };
        if (account) {
          ifMatch(account);
        }
      }

    return (
        <Fragment>
        {isLogin ? (
            <Principal />
          ) : (
        <div className="contenedor2">
            <div className="relative">
                <h1 className="titulo">Bienvenido</h1>
                <img src={gas} alt="Gas" className="imagen"/>
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
              <label className="label-error">
                Contraseña invalida
              </label>
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
}
 
export default Login;