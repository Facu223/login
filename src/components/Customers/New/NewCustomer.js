import React from "react";
import { Link } from "react-router-dom";
import api from "../../servicios/api";
import { Redirect } from "react-router-dom";

class NewCustomer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         nombre: "",
         apellido: "",
         cuit: "",
         domicilio: "",
         telefono: "",
         email: "",
         barrio: "",
         localidad: "",
         referencia: "",
         errores: [],
         isCharged: false,
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

      const { nombre, apellido, cuit, domicilio, barrio, localidad, telefono, email, referencia } = this.state;

      let errores = [];
      if (!nombre) errores.push("error_nombre");
      if (!apellido) errores.push("error_apellido");
      if (!cuit) errores.push("error_cuit")
      if (!domicilio) errores.push("error_domicilio");
      if (!telefono) errores.push("error_telefono");
      if (!email) errores.push("error_email");
      if (!barrio) errores.push("error_barrio");
      if (!localidad) errores.push("error_localidad");

      this.setState({ errores: errores });
      if (errores.length > 0) return false;

      var datosEnviar = {
         nombre: nombre,
         apellido: apellido,
         cuit: cuit,
         domicilio: domicilio,
         barrio: barrio,
         localidad: localidad,
         referencia: referencia,
         telefono: telefono,
         email: email,
      };

      console.log(datosEnviar);

      await fetch(api + "/api/clientes", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(datosEnviar),
      })
         .then((respuesta) => respuesta.json())
         .then((datosRespuesta) => {
            console.log(datosRespuesta);
            if (datosRespuesta.status === 'OK') {
               this.setState({ isCharged: true });
            }
         })
         .catch(console.log);

   };

   render() {
      const { nombre, apellido, cuit, telefono, domicilio, barrio, localidad, referencia, email, isCharged } =
         this.state;

      return (
         <div className={"card-nb"}>
            <div>Nuevo Cliente</div>
            <form onSubmit={this.enviarDatos}>
               <div className="form-group">
                  <label className="form__label">Nombre:</label>
                  <input
                     onChange={this.cambioValor}
                     value={nombre}
                     type="text"
                     name="nombre"
                     id="nombre"
                     className={
                        (this.verificarError("error_nombre")
                           ? "is-invalid form__input form__input__edit"
                           : "") + " form__input form__input__edit"
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
                  <label className="form__label">Apellido:</label>
                  <input
                     onChange={this.cambioValor}
                     value={apellido}
                     type="text"
                     name="apellido"
                     id="apellido"
                     className={
                        (this.verificarError("error_apellido")
                           ? "is-invalid form__input form__input__edit"
                           : "") + " form__input form__input__edit"
                     }
                     placeholder=""
                     aria-describedby="helpId"
                  />
                  <small id="helpId" className="invalid-feedback">
                     Ecribe el apellido del cliente
                  </small>
               </div>
               <br></br>

               <div className="row-nb row-nb-3">
                  <div className="form__group">
                     <label className="form__label">Domicilio:</label>
                     <input
                        onChange={this.cambioValor}
                        value={domicilio}
                        type="text"
                        name="domicilio"
                        id="domicilio"
                        className={
                           (this.verificarError("error_domicilio")
                              ? "is-invalid form__input form__input__edit"
                              : "") + " form__input form__input__edit"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el domicilio del cliente
                     </small>
                  </div>
                  <br></br>

                  <div className="form__group">
                     <label className="form__label">Barrio: </label>
                     <input
                        onChange={this.cambioValor}
                        value={barrio}
                        type="text"
                        name="barrio"
                        id="barrio"
                        className={
                           (this.verificarError("error_barrio")
                              ? "is-invalid form__input form__input__edit"
                              : "") + " form__input form__input__edit"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Escribe el barrio del cliente
                     </small>
                  </div>
                  <br></br>

                  <div className="form__group">
                     <label className="form__label">Localidad: </label>
                     <input
                        onChange={this.cambioValor}
                        value={localidad}
                        type="text"
                        name="localidad"
                        id="localidad"
                        className={
                           (this.verificarError("error_localidad")
                              ? "is-invalid form__input form__input__edit"
                              : "") + " form__input form__input__edit"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Escribe la localidad del cliente
                     </small>
                  </div>
                  <br></br>
               </div>

               <div className='row-nb row-nb-3'>
                  <div className="form__group">
                     <label className="form__label">Cuit/Cuil:</label>
                     <input
                        onChange={this.cambioValor}
                        value={cuit}
                        type="text"
                        name="cuit"
                        id="cuit"
                        className={
                           (this.verificarError("error_cuit")
                              ? "is-invalid form__input form__input__edit"
                              : "") + " form__input form__input__edit"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Escribe el cuit o cuil del cliente
                     </small>
                  </div>
                  <br></br>

                  <div className="form__group">
                     <label className="form__label">Teléfono:</label>
                     <input
                        onChange={this.cambioValor}
                        value={telefono}
                        type="text"
                        name="telefono"
                        id="telefono"
                        className={
                           (this.verificarError("error_telefono")
                              ? "is-invalid form__input form__input__edit"
                              : "") + " form__input form__input__edit"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el teléfono del empleado
                     </small>
                  </div>
                  <br></br>

                  <div className="form__group">
                     <label className="form__label">E-mail:</label>
                     <input
                        onChange={this.cambioValor}
                        value={email}
                        type="text"
                        name="email"
                        id="email"
                        className={
                           (this.verificarError("error_email")
                              ? "is-invalid form__input form__input__edit"
                              : "") + " form__input form__input__edit"
                        }
                        placeholder=""
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ecribe el E-mail del empleado
                     </small>
                  </div>
                  <br></br>
               </div>

               <div className="button__group" role="group">
                  <button type="submit" className="button acept__button">
                     Agregar
                  </button>
                  <Link to={"/dashboard/clientes"} className="button cancel__button">
                     Cancelar
                  </Link>
               </div>
            </form>
            {isCharged ? (
               <Redirect
                  to="/dashboard/clientes"
               />
            ) : null}
         </div>
      );
   }
}
export default NewCustomer;
