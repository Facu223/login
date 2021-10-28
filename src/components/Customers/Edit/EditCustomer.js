import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import api from "../../servicios/api";
// import styles from "../New/NewEmployee.module.css";
import styles from "./EditCustomer.module.css";

class EditCustomer extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         nombre: "",
         apellido: "",
         cuilcuit: "",
         domicilio: "",
         barrio: "",
         localidad: "",
         referencia: "",
         telefono: "",
         email: "",
         errores: [],
         cliente: {}
      };
   }

   componentDidMount(){
      fetch(api + `/api/clientes/${this.props.match.params.id}`)
         .then((respuesta) => respuesta.json())
         .then((datosRespuesta) => {
            this.setState({
               datosCargados: true,
               cliente: datosRespuesta.cliente
            });
            console.log(datosRespuesta.cliente);
         })
         .catch(console.log);
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

      const { nombre, apellido, cuilcuit, domicilio, barrio, localidad, referencia, telefono, email } = this.state;

      let errores = [];
      if (!nombre) errores.push("error_nombre");
      if (!apellido) errores.push("error_apellido");
      if (!cuilcuit) errores.push("error_cuilcuit");
      if (!domicilio) errores.push("error_domicilio");
      if (!barrio) errores.push("error_barrio");
      if (!localidad) errores.push("error_localidad");
      if (!telefono) errores.push("error_telefono");
      if (!email) errores.push("error_email");

      this.setState({ errores: errores });
      if (errores.length > 0) return false;

      var datosEnviar = {
         nombre: nombre,
         apellido: apellido,
         cuilcuit: cuilcuit,
         domicilio: domicilio,
         barrio: barrio,
         localidad: localidad,
         referencia: referencia,
         telefono: telefono,
         email: email,
      };

      console.log(datosEnviar);

      await fetch(api + `/api/clientes/${this.props.match.params.id}`, {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(datosEnviar),
      })
         .then((respuesta) => {
            console.log(respuesta.status);
            return respuesta.json();
         })
         .then((datosRespuesta) => {
            console.log(datosRespuesta);
            this.props.history.push("/dashboard/clientes");
         })
         .catch(console.log);
   };

   render() {
      const { nombre, apellido, cuilcuit, domicilio, barrio, localidad, referencia, telefono, email, cliente } = this.state;

      return (
         <div className="card-nb">
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
                        placeholder={`${cliente.nombre}`}
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
                        placeholder={`${cliente.apellido}`}
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el apellido del cliente
                     </small>
                  </div>
                  <br></br>

                  <div className="form-group">
                     <label htmlFor="">Cuil/Cuit:</label>
                     <input
                        onChange={this.cambioValor}
                        value={cuilcuit}
                        type="text"
                        name="cuilcuit"
                        id="cuilcuit"
                        className={
                           (this.verificarError("error_cuilcuit")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder={`${cliente.cuilcuit}`}
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el Cuil/Cuit del cliente
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
                        placeholder={`${cliente.domicilio}`}
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el domicilio del cliente
                     </small>
                  </div>
                  <br></br>

                  <div className="form-group">
                     <label htmlFor="">Barrio:</label>
                     <input
                        onChange={this.cambioValor}
                        value={barrio}
                        type="text"
                        name="barrio"
                        id="barrio"
                        className={
                           (this.verificarError("error_barrio")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder={`${cliente.barrio}`}
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el barrio del cliente
                     </small>
                  </div>
                  <br></br>

                  <div className="form-group">
                     <label htmlFor="">Localidad:</label>
                     <input
                        onChange={this.cambioValor}
                        value={localidad}
                        type="text"
                        name="localidad"
                        id="localidad"
                        className={
                           (this.verificarError("error_localidad")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder={`${cliente.localidad}`}
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el localidad del cliente
                     </small>
                  </div>
                  <br></br>

                  <div className="form-group">
                     <label htmlFor="">Referencia:</label>
                     <input
                        onChange={this.cambioValor}
                        value={referencia}
                        type="text"
                        name="referencia"
                        id="referencia"
                        className={
                           (this.verificarError("error_referencia")
                              ? "is-invalid"
                              : "") + " form-control"
                        }
                        placeholder={`${cliente.referencia}`}
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el referencia del cliente
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
                        placeholder={`${cliente.telefono}`}
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
                        placeholder={`${cliente.email}`}
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
                     <Link to={"/dashboard/clientes"} className="button">
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
export default withRouter(EditCustomer);

