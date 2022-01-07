import React from "react";
import { Link } from "react-router-dom";
import Backdrop from "../../Backdrop/Backdrop";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import api from "../../servicios/api";
import styles from "./EditCustomer.module.css";
import Modal from '../../Modal/Modal';

class EditCustomer extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         id: null,
         nombre: "",
         apellido: "",
         cuit: "",
         domicilio: "",
         barrio: "",
         ciudad: "",
         referencia: "",
         telefono: "",
         email: "",
         errores: [],
         ciudades: [],
         editMode: false,
         openModal: false,
      };
      this.customerId = props.match.params.id;
   }

   componentDidMount() {
      this.httpRequest();
      this.fetchCities();
   }

   httpRequest() {
      fetch(`${api}/api/clientes/${this.customerId}`)
         .then(response => response.json())
         .then(data => {
            const { id, nombre, apellido, domicilio, barrio, ciudad, referencia, cuit, telefono, email } = data.cliente;
            this.setState({ id, nombre, apellido, domicilio, barrio, ciudad, referencia, cuit, telefono, email });
         })
   }

   async fetchCities() {
      try {
         const response = await fetch(`${api}/api/ciudades`)
         const data = await response.json();

         this.setState({ ciudades: data.cities })

      } catch (e) {
         console.log(e);
      }
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

      const { nombre, apellido, domicilio, telefono, email, ciudad } = this.state;

      let errores = [];
      if (!nombre) errores.push("error_nombre");
      if (!apellido) errores.push("error_apellido");
      if (!domicilio) errores.push("error_domicilio");
      if (!telefono) errores.push("error_telefono");
      if (!email) errores.push("error_email");
      if (!ciudad) errores.push("error_ciudad");

      this.setState({ errores: errores });
      if (errores.length > 0) return false;

      var datosEnviar = {
         nombre: nombre,
         apellido: apellido,
         domicilio: domicilio,
         telefono: telefono,
         email: email,
         id_ciudad: ciudad
      };

      await fetch(`${api}/api/clientes/${this.customerId}`, {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(datosEnviar),
      })
         .then((respuesta) => {
            return respuesta.json();
         })
         .then((datosRespuesta) => {
            return this.props.history.push("/dashboard/clientes");
         })
         .catch(console.log);
   };

   changeEditMode(inEditMode) {
      this.setState({ editMode: inEditMode })
   }

   deleteHandler(id) {
      this.setState({ openModal: true });
   }

   onCloseModal() {
      this.setState({ openModal: false });
   }

   async onDeleteHandler(employeeId = this.state.id) {

      try {
         const response = await fetch(`${api}/api/clientes/${employeeId}`, {
            method: "DELETE",
         });

         if (response.status === 204) this.setState({ openModal: false })

         this.props.history.push('/dashboard/clientes');
      } catch (e) {
         console.log(e);
      }
   };

   render() {
      const { id, nombre, apellido, domicilio, barrio, ciudad, referencia, cuit, telefono, email, openModal } = this.state;
      let { editMode } = this.state;

      return (
         <div className='card-nb'>
            <div className="card__header">
               <div className='card__title'>Cliente</div>
            </div>

            <div className="delete__button__container" onClick={() => { this.deleteHandler(id) }}>
               <span className="delete__button"><i className="fas fa-trash-alt"></i></span>
            </div>

            <form onSubmit={this.enviarDatos}>
               <div className="form__group">
                  <label className='form__label'>Nombre: </label>
                  <input
                     onChange={this.cambioValor}
                     value={nombre}
                     type="text"
                     name="nombre"
                     id="nombre"
                     className={`${this.verificarError("error_nombre") ? "is-invalid" : ""} ${editMode ? "form__input__edit" : ""} form__input`}
                     placeholder=""
                     disabled={!editMode}
                     aria-describedby="helpId"
                  />
                  <small id="helpId" className="invalid-feedback">
                     Ingresa el nombre del cliente
                  </small>
               </div>

               <div className="form__group">
                  <label className='form__label'>Apellido: </label>
                  <input
                     onChange={this.cambioValor}
                     value={apellido}
                     type="text"
                     name="apellido"
                     id="apellido"
                     className={`${this.verificarError("error_nombre") ? "is-invalid" : ""} ${editMode ? "form__input__edit" : ""} form__input`}
                     placeholder=""
                     disabled={!editMode}
                     aria-describedby="helpId"
                  />
                  <small id="helpId" className="invalid-feedback">
                     Ingresa el apellido del cliente
                  </small>
               </div>

               <div className="row-nb row-nb-3">
                  <div className="form__group">
                     <label className="form__label">Domicilio: </label>
                     <input
                        onChange={this.cambioValor}
                        value={domicilio}
                        type="text"
                        name="domicilio"
                        id="domicilio"
                        className={`${this.verificarError("error_nombre") ? "is-invalid" : ""} ${editMode ? "form__input__edit" : ""} form__input`}
                        placeholder=""
                        disabled={!editMode}
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ingresa el domicilio del cliente
                     </small>
                  </div>

                  <div className="form__group">
                     <label className="form__label">Barrio: </label>
                     <input
                        onChange={this.cambioValor}
                        value={barrio}
                        type="text"
                        name="barrio"
                        id="barrio"
                        className={`${this.verificarError("error_nombre") ? "is-invalid" : ""} ${editMode ? "form__input__edit" : ""} form__input`}
                        placeholder=""
                        disabled={!editMode}
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Escribe el barrio del cliente
                     </small>
                  </div>

                  <div className="form__group">
                     <label className="form__label">Ciudad:</label>
                     <select name="ciudad" className="form__select" value={ciudad.id} onChange={this.cambioValor} disabled={!editMode}>
                        {this.state.ciudades.map(ciudad => {
                           return <option className="" key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
                        })}
                     </select>
                  </div>

               </div>

               <div className='row-nb row-nb-3'>
                  <div className="form__group">
                     <label className="form__label">Cuit/Cuil: </label>
                     <input
                        onChange={this.cambioValor}
                        value={cuit}
                        type="text"
                        name="cuit"
                        id="cuit"
                        className={`${this.verificarError("error_nombre") ? "is-invalid" : ""} ${editMode ? "form__input__edit" : ""} form__input`}
                        placeholder=""
                        disabled={!editMode}
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Escribe el cuit o cuil del cliente
                     </small>
                  </div>

                  <div className="form__group">
                     <label className="form__label">Teléfono: </label>
                     <input
                        onChange={this.cambioValor}
                        value={telefono}
                        type="text"
                        name="telefono"
                        id="telefono"
                        className={`${this.verificarError("error_nombre") ? "is-invalid" : ""} ${editMode ? "form__input__edit" : ""} form__input`}
                        placeholder=""
                        disabled={!editMode}
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ingresa el teléfono del empleado
                     </small>
                  </div>

                  <div className="form__group">
                     <label className="form__label">E-mail: </label>
                     <input
                        onChange={this.cambioValor}
                        value={email}
                        type="text"
                        name="email"
                        id="email"
                        className={`${this.verificarError("error_nombre") ? "is-invalid" : ""} ${editMode ? "form__input__edit" : ""} form__input`}
                        placeholder=""
                        disabled={!editMode}
                        aria-describedby="helpId"
                     />
                     <small id="helpId" className="invalid-feedback">
                        Ingresa el E-mail del empleado
                     </small>
                  </div>
               </div>


               {editMode &&
                  <div className="button__group" role="group" aria-label="">
                     <button type="submit" className="button acept__button" onClick={this.enviarDatos}>
                        Actualizar
                     </button>
                     <button type='button' onClick={() => this.changeEditMode(false)} className="button cancel__button">
                        Cancelar
                     </button>
                  </div>
               }

               {!editMode &&
                  <div className="button__group" role="group" aria-label="">
                     <button type="button" className="button acept__button" onClick={() => this.changeEditMode(true)}>
                        <i className="far fa-edit"></i> Editar
                     </button>
                     <Link to={"/dashboard/clientes"} className="button cancel__button">
                        Cancelar
                     </Link>
                  </div>
               }
            </form >
            {openModal && (
               <Modal>
                  <DeleteModal
                     onCloseModal={this.onCloseModal.bind(this)}
                     deleteHandler={this.onDeleteHandler.bind(this)}
                     modalContent={{ title: 'Eliminar cliente', message: '¿Estas seguro que quiere eliminar el cliente?' }}
                     classBased={true}
                  />
               </Modal>
            )}
            {openModal && <Backdrop />}
         </div >
      );
   }
}
export default EditCustomer;

