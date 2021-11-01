import { Fragment } from "react";

const DeleteModal = (props) => {

   return (
      <Fragment>
         <h3>{props.modalContent.title}</h3>
         <p>{props.modalContent.message}</p>
         <div className={`modal-nb__buttons`}>
            <button
               type="button"
               className={`button cancel__button`}
               onClick={() => props.setOpenModal(false)}
            >
               Cancelar
            </button>
            <button
               type="button"
               className={`button acept__button`}
               onClick={props.onDeleteHandler}
            >
               Aceptar
            </button>
         </div>
      </Fragment>
   )
}

export default DeleteModal;