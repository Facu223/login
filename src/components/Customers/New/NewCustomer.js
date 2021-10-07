import React from "react";
import { Link } from "react-router-dom";
import api from "../../servicios/api";
import { Redirect } from "react-router";

class Crear extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         nombre: "",
         apellido: "",
         domicilio: "",
         telefono: "",
         email: "",
         errores: [],
         isCharged: false
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

      const { nombre, apellido, domicilio, telefono, email  } = this.state;

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
         method: "POST",
         headers:{
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(datosEnviar),
      }).then((respuesta) => respuesta.json())
         .then((datosRespuesta) => {
            console.log(datosRespuesta);
            this.props.history.push("/dasboard/clientes");
         })
         .catch(console.log);

         this.setState({isCharged: true})
   };

   render() {
      const { nombre, apellido, dni, telefono, isCharged  } = this.state;

      return (
         <div className={styles.card}>
            <div className="card-header">Nuevo Cliente</div>
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
                        placeholder="example@gmail.com"
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
               {isCharged
               ?<Redirect 
               from='/dashboard/clientes/nuevo'
                to='/dashboard/clientes'/>
               : null}
            </div>
            <div className="card-footer text-muted"></div>
         </div>
      );
   }
}

export default Crear;
