import React, { Fragment, useState } from 'react';
import api from '../../servicios/api';
import DeleteModal from '../DeleteModal2/DeleteModal';

import styles from "./AddLocationModal.module.css";

const AddLocationModal = ({ closeModal, cities, addCity, updateCity, updateCitiesArray }) => {
   // States
   const [showForm, setShowForm] = useState(false);
   const [name, setName] = useState("");
   const [error, setError] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [showAlert, setShowAlert] = useState(false);
   const [onEditMode, setOnEditMode] = useState(false);
   const [cityToEditId, setCityToEditId] = useState();
   const [cityToDelete, setCityToDelete] = useState();

   const onChangeHandler = (e) => {
      setName(e.target.value);
   }

   const onSaveCity = (e, cityToEdit = null) => {
      if (name === undefined || name === "") {
         return setError(true);
      }

      setError(false);
      setShowForm(false);

      sendHttpRequest();
   }

   const onEditCity = (id) => {
      if (!showForm) {
         setShowForm(true);
      }

      const cityToEdit = cities.find(city => city.id === id);

      if (!cityToEdit) return setShowAlert(true);

      setCityToEditId(cityToEdit.id);
      setName(cityToEdit.nombre);
      setOnEditMode(true);
   }

   const onDeleteCity = (id) => {
      setCityToDelete(id)
      setShowDeleteModal(true);
   }

   const updateCityArray = () => {
      const citiesUpdated = cities.filter(city => city.id !== cityToDelete);

      updateCitiesArray(citiesUpdated);
   }

   const sendHttpRequest = async () => {
      let url = `${api}/api/ciudades/`;
      let method = "POST";

      if (onEditMode) {
         url = `${url}${cityToEditId}`;
         method = "PATCH"
      }

      try {
         const response = await fetch(url, {
            method: method,
            body: JSON.stringify({ nombre: name }),
            headers: {
               "Content-Type": "application/json"
            }
         });

         const { cityUpdated, city } = await response.json();

         if (response.status === 201) {
            addCity(city);
         }

         if (response.status === 200) {
            updateCity(cityUpdated);
         }

         setName("");

      } catch (e) {
         console.log(e);
      }
   }

   return (
      <Fragment>

         <div className='modal__container'>

            <div className='modal__options'>
               <i className="fas fa-times modal__close-btn" onClick={() => { closeModal() }}></i>
            </div>

            <div className='modal__header'>
               <h3 className='text-black-50'>Ciudades</h3>
               <button className='button success__button' onClick={() => { setShowForm(true) }} >Agregar</button>
            </div>

            {showForm && (
               <div className='form__group'>
                  <label className='form__label'>Nombre:</label>
                  <input className='form__input form__input__edit is-invalid' type="text" name="name" value={name} onChange={onChangeHandler} />
                  {error && <small className='invalid-feedback'>Debes ingresar un nombre</small>}
                  <small className='form__input-btn mt-1' onClick={onSaveCity}>Guardar</small>
                  <small className='form__input-btn mt-1' onClick={() => { setShowForm(false); setError(false); setName("") }}>Cancelar</small>
               </div>
            )}

            <ul className={`${styles["cities__list"]}`}>

               {cities.length > 0 && cities.map(city => {
                  return (
                     <li className={`${styles["cities__item"]}`} key={city.id}>
                        <span>{city.nombre}</span>
                        <span className={`${styles["cities__options"]}`}>
                           <div className={``}>
                              <span className="" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                                 <i className="fas fa-ellipsis-v"></i>
                              </span>
                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                 <button className='dropdown-item' type='button' onClick={() => { onEditCity(city.id) }} >Editar</button>
                                 <div className='dropdown-divider'></div>
                                 <button className='text-danger dropdown-item' type='button' onClick={() => { onDeleteCity(city.id) }} >Eliminar</button>
                              </div>
                           </div>
                        </span>
                     </li>
                  );
               })}

            </ul>

         </div>

         {showDeleteModal && (
            <Fragment>
               <DeleteModal showModal={setShowDeleteModal} id={cityToDelete} updateCityArray={updateCityArray} />
            </Fragment>
         )}
      </Fragment>
   )
}

export default AddLocationModal
