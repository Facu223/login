import React from "react";
import { Link } from "react-router-dom";
import api from "../../servicios/api";
import styles from "./NewEmployee.module.css";

class Crear extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         nombre: "",
         apellido: "",
         dni: "",
         telefono: "",
         usuario: "",
         password: "",
         rol: "admin",
         errores: [],
      };
   }

   cambioValor = (e) => {
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState({ state, errores: [] });
   };

   verificarError(elemento) {
      return this.state.errores.indexOf(elemento) !== -1;
   }

   enviarDatos = async (e) => {
      e.preventDefault();

      const { nombre, apellido, dni, telefono, usuario, password, rol } = this.state;

      let errores = [];
      if (!nombre) errores.push("error_nombre");
      if (!apellido) errores.push("error_apellido");
      if (!dni) errores.push("error_dni");
      if (!telefono) errores.push("error_telefono");
      if (!usuario) errores.push("error_usuario");
      if (!password) errores.push("error_password");
      if (!rol) errores.push("error_rol");
      // if (!cuil) errores.push("error_cuil");
      // if (!puesto) errores.push("error_puesto");

      this.setState({ errores: errores });
      if (errores.length > 0) return false;

      var datosEnviar = {
         nombre: nombre,
         apellido: apellido,
         documento: dni,
         telefono: telefono,
         usuario: usuario,
         password: password,
         rol: rol
         // cuil: cuil,
         // puesto: puesto,
      };

      console.log(datosEnviar);

      await fetch(api + "/api/usuarios/admin/signup", {
         method: "POST",
         headers:{
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(datosEnviar),
      })
         .then((respuesta) => respuesta.json())
         .then((datosRespuesta) => {
            console.log(datosRespuesta);
            // this.props.history.push("/dasboard/empleados");
         })
         .catch(console.log);
   };

   render() {
      const { nombre, apellido, dni, telefono, usuario , password } = this.state;

      return (
         <div className={styles.card}>
            <div className="card-header">Nuevo Empleado</div>
            <div className="card-body">
               <form onSubmit={this.enviarDatos}>
                  <div className="form-group">
                     <label htmlFor="">Nombre:</label>
                     <input
                        onChange={this.cambioValor}
                        value={nombre}
                        type="text"
                        name="nombre"
                        id="nombre"
                        className={
                           (this.verificarError("error_nombre")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el nombre del empleado
                     </small>
                  </div>
                  <br></br>

                  <div className="form-group">
                     <label htmlFor="">Apellido:</label>
                     <input
                        onChange={this.cambioValor}
                        value={apellido}
                        type="text"
                        name="apellido"
                        id="apellido"
                        className={
                           (this.verificarError("error_apellido")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el apellido del empleado
                     </small>
                  </div>
                  <br></br>

                  <div className="form-group">
                     <label htmlFor="">DNI:</label>
                     <input
                        onChange={this.cambioValor}
                        value={dni}
                        type="text"
                        name="dni"
                        id="dni"
                        className={
                           (this.verificarError("error_dni")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el apellido del empleado
                     </small>
                  </div>
                  <br></br>

                  <div className="form-group">
                     <label htmlFor="">Teléfono:</label>
                     <input
                        onChange={this.cambioValor}
                        value={telefono}
                        type="text"
                        name="telefono"
                        id="telefono"
                        className={
                           (this.verificarError("error_telefono")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el teléfono del empleado
                     </small>
                  </div>
                  <br></br>

                  <div className="form-group">
                     <label htmlFor="">nombre de usuario:</label>
                     <input
                        onChange={this.cambioValor}
                        value={usuario}
                        type="text"
                        name="usuario"
                        id="usuario"
                        className={
                           (this.verificarError("error_usuario")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el nombre de usuario del empleado
                     </small>
                  </div> 
                  <br></br>

                  <div className="form-group">
                     <label htmlFor="">contraseña:</label>
                     <input
                        onChange={this.cambioValor}
                        value={password}
                        type="text"
                        name="password"
                        id="password"
                        className={
                           (this.verificarError("error_usuario")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe la contraseña del usuario
                     </small>
                  </div> 
                  <br></br>
                        
                  {/* <div className="form-group">
                     <label>
                       Selecciona el Rol
                       <select value={rol} onChange={this.cambioValor}>
                         <option value="admin">Administrador</option>
                         <option value="repartidor">Repartidor</option>
                       </select>
                     </label>
                  </div>
                  <br></br> */}

                  <div className="btn-group" role="group" aria-label="">
                     <button type="submit" className="button">
                        Agregar
                     </button>
                     <Link to={"/dashboard/empleados"} className="button">
                        Cancelar
                     </Link>
                  </div>
               </form>
            </div>
            <div className="card-footer text-muted"></div>
         </div>
      );
   }
}

export default Crear;
