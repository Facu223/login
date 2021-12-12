import React from 'react'
// import './Modal.css'

const Modal = ({ closeModal }) => {
   return (
      <div className="modal ">
         <div className="modal-container">
            <button className="modal-close" onClick={closeModal}>X</button>
            <h1>Hola</h1>
         </div>
      </div>
   );
}

export default Modal;