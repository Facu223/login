import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import api from "../../servicios/api";
import { Redirect } from "react-router-dom";
import AddLocationModal from "../../Modal/AddLocationModal/AddLocationModal";
import Backdrop from "../../Backdrop/Backdrop";

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
         ciudad: "",
         referencia: "",
         errores: [],
         isCharged: false,
         showModal: false,
         ciudades: [],
      };
   }

   componentDidMount() {
      this.fetchCities();
   }

   async fetchCities() {
      try {
         const response = await (await fetch(`${api}/api/ciudades/`)).json();

         this.setState({ ciudades: response.cities });
      } catch (e) {
         console.log(e);
      }
   }

   addCity(city) {
      this.setState({ ciudades: [...this.state.ciudades, city] })
   }

   updateCitiesArray(ciudades) {
      this.setState({ ciudades });
   }

   updateCity(cityToUpdate) {
      console.log(cityToUpdate);
      const cities = this.state.ciudades

      const citiesToUpdate = cities.filter(city => city.id !== cityToUpdate.id)
      citiesToUpdate.push(cityToUpdate);

      this.setState({ ciudades: citiesToUpdate })
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

      const { nombre, apellido, cuit, domicilio, barrio, ciudad, telefono, email, referencia } = this.state;

      let errores = [];
      if (!nombre) errores.push("error_nombre");
      if (!apellido) errores.push("error_apellido");
      if (!domicilio) errores.push("error_domicilio");
      if (!telefono) errores.push("error_telefono");
      if (!ciudad) errores.push("error_ciudad");

      this.setState({ errores: errores });
      if (errores.length > 0) return false;

      var datosEnviar = {
         nombre: nombre,
         apellido: apellido,
         cuit: cuit,
         domicilio: domicilio,
         barrio: barrio,
         ciudad: ciudad,
         referencia: referencia,
         telefono: telefono,
         email: email,
      };

      await fetch(api + "/api/clientes", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(datosEnviar),
      })
         .then((respuesta) => respuesta.json())
         .then((datosRespuesta) => {
            if (datosRespuesta.status === 'OK') {
               this.setState({ isCharged: true });
            }
         })
         .catch(console.log);

   };

   onCloseModal() {
      this.setState({ showModal: false });
   }

   render() {
      const { nombre, apellido, cuit, telefono, domicilio, barrio, ciudad, referencia, email, isCharged } =
         this.state;

      return (
         <div className={"card-nb"}>
            <div className="d-flex justify-content-between align-items-center">
               <div className="card__title">Nuevo cliente</div>
               <div>
                  {/* Dropdown */}
                  <div>
                     <span type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-ellipsis-v"></i>
                     </span>
                     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" type="button" href="www.google.com" onClick={() => this.setState({ showModal: true })}>Agregar ciudad</button>
                     </div>
                  </div>
               </div>

            </div>

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
                     Debes ingresar un nombre
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
                     Debes ingresar un apellido
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
                        Debes ingresar un domiclio
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
                     <label className="form__label">Ciudad:</label>
                     <select name="ciudad" value={ciudad} onChange={this.cambioValor}
                        className={`form__select form__select__edit ${this.verificarError("error_ciudad") ? "is-invalid" : ""}`}
                     >
                        <option defaultChecked="seleccionar" value="seleccionar">--Seleccionar--</option>
                        {this.state.ciudades.map(ciudad => {
                           return <option className="" key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
                        })}
                     </select>
                     <small id="helpId" className="invalid-feedback">
                        Debes seleccionar una ciudad
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
                        Debes ingresar un cuit o cuil del cliente
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
                        Debes ingresar un numero de contacto
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
                        Debes ingresar un email
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

            {/* Add location modal */}
            {this.state.showModal && (
               <Fragment>
                  <AddLocationModal
                     closeModal={this.onCloseModal.bind(this)}
                     cities={this.state.ciudades}
                     addCity={this.addCity.bind(this)}
                     updateCity={this.updateCity.bind(this)}
                     updateCitiesArray={this.updateCitiesArray.bind(this)}
                  />
                  <Backdrop />
               </Fragment>
            )}
         </div>
      );
   }
}
export default NewCustomer;
