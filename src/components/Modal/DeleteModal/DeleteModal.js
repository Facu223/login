import { Fragment } from "react";

const DeleteModal = (props) => {
   console.log(props);

   return (
      <Fragment>
         <h3>{props.modalContent.title}</h3>
         <p>{props.modalContent.message}</p>
         <div className={`modal-nb__buttons`}>
            {!props.classBased &&
               <Fragment>
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
                     onClick={() => props.deleteHandler()}
                  >
                     Aceptar
                  </button>
               </Fragment>
            }
            {props.classBased &&
               <Fragment>
                  <button
                     type="button"
                     className={`button cancel__button`}
                     onClick={() => props.onCloseModal()}
                  >
                     Cancelar
                  </button>
                  <button
                     type="button"
                     className={`button acept__button`}
                     onClick={() => props.deleteHandler()}
                  >
                     Aceptar
                  </button>
               </Fragment>

            }
         </div>
      </Fragment>
   )
}

export default DeleteModal;