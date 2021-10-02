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
         documento: "",
         cuil: "",
         telefono: "",
         usuario: "",
         contraseña: "",
         rol: "",
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

   enviarDatos = (e) => {
      e.preventDefault();

      const {
         nombre,
         apellido,
         documento,
         telefono,
         usuario,
         contraseña,
         rol,
      } = this.state;

      let errores = [];
      if (!nombre) errores.push("error_nombre");
      if (!apellido) errores.push("error_apellido");
      if (!documento) errores.push("error_documento");
      if (!usuario) errores.push("error_usuario");
      if (!telefono) errores.push("error_telefono");
      if (!contraseña) errores.push("error_contraseña");
      if (!rol) errores.push("error_rol");

      this.setState({ errores: errores });
      if (errores.length > 0) return false;

      var datosEnviar = {
         nombre,
         apellido,
         documento: +documento,
         usuario,
         telefono,
         password: contraseña,
         rol,
      };

      console.log(datosEnviar);

      fetch(api + "/api/usuarios/admin/signup", {
         method: "POST",
         body: JSON.stringify(datosEnviar),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((respuesta) => respuesta.json())
         .then((datosRespuesta) => {
            console.log(datosRespuesta);
            this.props.history.push("/dasboard/empleados");
         })
         .catch(console.log);
   };

   render() {
      const {
         nombre,
         apellido,
         documento,
         telefono,
         usuario,
         contraseña,
         rol,
      } = this.state;

      return (
         <div className={`card-nb`}>
            <div className="card-header">Nuevo</div>
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
                     <label htmlFor="">N° de Documento:</label>
                     <input
                        onChange={this.cambioValor}
                        value={documento}
                        type="text"
                        name="documento"
                        id="documento"
                        className={
                           (this.verificarError("error_documento")
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
                     <label htmlFor="">Usuario:</label>
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
                        Escribe el usuario del empleado
                     </small>
                  </div>
                  <br></br>

                  <div className="form-group">
                     <label htmlFor="">Contraseña:</label>
                     <input
                        onChange={this.cambioValor}
                        value={contraseña}
                        type="password"
                        name="contraseña"
                        id="contraseña"
                        className={
                           (this.verificarError("error_contraseña")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Escribe una contraseña por defecto para el empleado
                     </small>
                  </div>
                  <br></br>

                  <div className="form-group">
                     <label htmlFor="">Rol:</label>
                     <select
                        onChange={this.cambioValor}
                        value={rol}
                        name="rol"
                        id="rol"
                        className={
                           (this.verificarError("error_rol")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     >
                        <option value="">--Selecciona--</option>
                        <option value="admin">Administrador</option>
                        <option value="repartidor">Repartidor</option>
                     </select>
                     <small id="helpId" className="invalid-feedback">
                        Escribe una rol por defecto para el empleado
                     </small>
                  </div>

                  <br></br>

                  <div className="button__group" role="group" aria-label="">
                     <button type="submit" className="button acept__button">
                        Agregar
                     </button>
                     <Link
                        to={"/dashboard/empleados"}
                        className="button cancel__button"
                     >
                        Cancelar
                     </Link>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}

export default Crear;
