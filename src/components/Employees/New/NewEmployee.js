import React from "react";
import { Link } from "react-router-dom";
import api from "../../servicios/api";
import { Redirect } from "react-router-dom";
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
         redirect: false,
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
         cuil,
         telefono,
         usuario,
         contraseña,
         rol,
      } = this.state;

      let errores = [];
      if (!nombre) errores.push("error_nombre");
      if (!apellido) errores.push("error_apellido");
      if (!documento) errores.push("error_documento");
      if (!cuil) errores.push("error_cuil");
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
         cuil,
         usuario,
         telefono,
         password: contraseña,
         rol,
      };

      fetch(api + "/api/usuarios/admin/signup", {
         method: "POST",
         body: JSON.stringify(datosEnviar),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((respuesta) => respuesta.json())
         .then((datosRespuesta) => {
            this.setState({ redirect: true });
         })
         .catch((e) => console.log(e));
   };

   render() {
      const {
         nombre,
         apellido,
         documento,
         cuil,
         telefono,
         usuario,
         contraseña,
         rol,
      } = this.state;

      if (this.state.redirect) {
         return <Redirect to="/dashboard/empleados" />;
      }

      return (
         <div className={`card-nb`}>
            <div className="card__header">Nuevo</div>
            <div className="">
               <form onSubmit={this.enviarDatos} className="form">
                  <div className="row-nb">
                     <div className="form__group">
                        <label htmlFor="" className={"form__label"}>
                           Nombre:
                        </label>
                        <input
                           onChange={this.cambioValor}
                           value={nombre}
                           type="text"
                           name="nombre"
                           className={
                              (this.verificarError("error_nombre")
                                 ? "is-invalid"
                                 : "") + " form__input"
                           }
                           placeholder="Ingrese un nombre"
                        />
                        <small id="helpId" className="invalid-feedback">
                           Ecribe el nombre del empleado
                        </small>
                     </div>

                     <div className="form__group">
                        <label className={"form__label"}>Apellido:</label>
                        <input
                           onChange={this.cambioValor}
                           value={apellido}
                           type="text"
                           name="apellido"
                           className={
                              (this.verificarError("error_apellido")
                                 ? "is-invalid"
                                 : "") + " form__input"
                           }
                           placeholder="Ingrese un apellido"
                        />
                        <small id="helpId" className="invalid-feedback">
                           Ecribe el apellido del empleado
                        </small>
                     </div>
                  </div>

                  <div className="row-nb">
                     <div className="form__group">
                        <label className={"form__label"}>
                           N° de Documento:
                        </label>
                        <input
                           onChange={this.cambioValor}
                           value={documento}
                           type="text"
                           name="documento"
                           className={
                              (this.verificarError("error_documento")
                                 ? "is-invalid"
                                 : "") + " form__input"
                           }
                           placeholder="Ingrese un documento"
                        />
                        <small id="helpId" className="invalid-feedback">
                           Ecribe el apellido del empleado
                        </small>
                     </div>
                     <div className="form__group">
                        <label className="form__label">N° de Cuil:</label>
                        <input
                           onChange={this.cambioValor}
                           value={cuil}
                           type="text"
                           name="cuil"
                           className={
                              (this.verificarError("error_cuil")
                                 ? "is-invalid"
                                 : "") + " form__input"
                           }
                           placeholder="Ingrese un cuil"
                        />
                        <small id="helpId" className="invalid-feedback">
                           Escribe el cuil del empleado
                        </small>
                     </div>
                  </div>

                  <div className={"row-nb"}>
                     <div className="form__group">
                        <label htmlFor="">Teléfono:</label>
                        <input
                           onChange={this.cambioValor}
                           value={telefono}
                           type="text"
                           name="telefono"
                           className={
                              (this.verificarError("error_telefono")
                                 ? "is-invalid"
                                 : "") + " form__input"
                           }
                           placeholder="Ingrese un telefono"
                        />
                        <small id="helpId" className="invalid-feedback">
                           Ecribe el teléfono del empleado
                        </small>
                     </div>

                     <div className="form__group">
                        <label htmlFor="">Usuario:</label>
                        <input
                           onChange={this.cambioValor}
                           value={usuario}
                           type="text"
                           name="usuario"
                           className={
                              (this.verificarError("error_usuario")
                                 ? "is-invalid"
                                 : "") + " form__input"
                           }
                           placeholder="Ingresa un usuario"
                        />
                        <small id="helpId" className="invalid-feedback">
                           Escribe el usuario del empleado
                        </small>
                     </div>
                  </div>

                  <div className={"row-nb"}>
                     <div className="form__group">
                        <label htmlFor="">Contraseña:</label>
                        <input
                           onChange={this.cambioValor}
                           value={contraseña}
                           type="password"
                           name="contraseña"
                           className={
                              (this.verificarError("error_contraseña")
                                 ? "is-invalid"
                                 : "") + " form__input"
                           }
                           placeholder="Ingresa una contraseña"
                        />
                        <small id="helpId" className="invalid-feedback">
                           Escribe una contraseña por defecto para el empleado
                        </small>
                     </div>

                     <div className="form__group">
                        <label htmlFor="">Rol:</label>
                        <select
                           onChange={this.cambioValor}
                           value={rol}
                           name="rol"
                           id="rol"
                           className={
                              (this.verificarError("error_rol")
                                 ? "is-invalid"
                                 : "") + " form__select"
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
