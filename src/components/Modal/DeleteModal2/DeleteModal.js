import React, { Fragment } from 'react';
import api from '../../servicios/api';

import styles from './DeleteModal.module.css'

const DeleteModal = ({ showModal, id, updateCityArray }) => {

   const deleteCity = async () => {
      const response = await fetch(`${api}/api/ciudades/${id}`, {
         method: "DELETE"
      });

      if (response.status === 204) {
         showModal(false);
         updateCityArray();
      }
   }

   return (
      <Fragment>

         <div className={`${styles["delete-modal"]}`}>
            <div className='modal__options'></div>

            <div className={`${styles["modal__content"]}`}>
               {/* icon */}
               <div className={`${styles["modal__icon"]} text-danger`}>
                  <i className="fas fa-exclamation-triangle"></i>
               </div>
               {/* Content */}
               <div>
                  <h3 className={`${styles["modal__title"]}`}>Eliminar ciudad</h3>
                  <span className={`${styles["modal__message"]} text-black-50`}>Estas seguro que quiere eliminar esta ciudad?</span>
               </div>
            </div>

            <div className={`${styles["modal__buttons"]}`}>
               <button className='button success__button' onClick={deleteCity}>Aceptar</button>
               <button className='button cancel__button' onClick={() => { showModal(false) }} >Cancelar</button>
            </div>
         </div>

         <div className={`${styles["delete-modal__backdrop"]}`}></div>
      </Fragment>
   )
}

export default DeleteModal
