import React from "react";
import { Link } from "react-router-dom";
import api from "../../servicios/api";
import styles from "../New/NewEmployee.module.css";
import {cargarDatos} from '../List/ListCustomers';

class Editar extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         nombre: "",
         apellido: "",
         domicilio: "",
         telefono: "",
         email: "",
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

      const { nombre, apellido, domicilio, telefono, email } = this.state;

      let errores = [];
      if (!nombre) errores.push("error_nombre");
      if (!apellido) errores.push("error_apellido");
      if (!domicilio) errores.push("error_domicilio");
      if (!telefono) errores.push("error_telefono");
      if (!email) errores.push("error_email");

      this.setState({ errores: errores });
      if (errores.length > 0) return false;

      var datosEnviar = {
         nombre: nombre,
         apellido: apellido,
         domicilio: domicilio,
         telefono: telefono,
         email: email,
      };

      console.log(datosEnviar);

      await fetch(api + "/api/clientes", {
         method: "PATCH",
         headers:{
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(datosEnviar),
      }).then(respuesta => {
         console.log(respuesta.status);
         return respuesta.json();
      })
         .then((datosRespuesta) => {
            console.log(datosRespuesta);
            // this.props.history.push("/dasboard/empleados");
         })
         .catch(console.log);
   };

   render() {
      const { nombre, apellido, domicilio, telefono, email  } = this.state;

      return (
         <div className={styles.card}>
            <div className="card-header">Editar Empleado</div>
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
                        Ecribe el nombre del cliente
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
                        Ecribe el apellido del cliente
                     </small>
                  </div>
                  <br></br>

                  <div className="form-group">
                     <label htmlFor="">Domicilio:</label>
                     <input
                        onChange={this.cambioValor}
                        value={domicilio}
                        type="text"
                        name="domicilio"
                        id="domicilio"
                        className={
                           (this.verificarError("error_domicilio")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el domicilio del cliente
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
                     <label htmlFor="">E-mail:</label>
                     <input
                        onChange={this.cambioValor}
                        value={email}
                        type="text"
                        name="email"
                        id="email"
                        className={
                           (this.verificarError("error_email")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el E-mail del empleado
                     </small>
                  </div>
                  <br></br>

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

export default Editar;
