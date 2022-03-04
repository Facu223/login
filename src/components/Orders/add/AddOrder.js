import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router';
import Backdrop from '../../Backdrop/Backdrop';
import EditCustomerModal from '../../Modal/EditCustomerModal/EditCustomerModal';

import api from '../../servicios/api';
import Search from '../../Utils/Search/Search';
import OrderDetail from './OrderDetail/OrderDetail';

import styles from './AddOrder.module.css';
import OrderItems from './OrderItems/OrderItems';

const AddOrder = (props) => {
   const [selectedCustomer, setSelectedCustomer] = useState({});
   const [addReference, setAddReference] = useState(false);
   const [newAddress, setAddNewAddress] = useState(false);
   const [onEditMode, setOnEditMode] = useState(false);
   const [address, setNewAddress] = useState();
   const [referenceNewAddres, setReferenceNewAddress] = useState();
   const [error, setError] = useState(false);
   const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);

   const [orderDetail, setOderDetail] = useState([]);

   // Hooks
   const history = useHistory();

   const onUpdateCustomer = (customerUpdated) => {
      setSelectedCustomer(customerUpdated);
   }

   const onChooseAnotherCustomer = () => {
      setSelectedCustomer({})
      setOderDetail([]);
      setAddNewAddress(false);
      resetForm();
   }

   // Add a new product to the order
   const addProductToOrder = (item) => {
      if (item.flete === "") item.flete = 0;

      setOderDetail(prevState => {
         return [...prevState, item]
      })

   }

   const onSetNewAddress = () => {
      // Validate new address input
      if (address === '' || address === undefined) {
         setError(true);
         return;
      }

      setError(false);
      setOnEditMode(false);
   }

   const resetForm = () => {
      setNewAddress(undefined);
      setReferenceNewAddress(undefined);
   }

   const onSubmitHandler = (e) => {
      e.preventDefault();

      orderDetail.forEach(el => delete el["itemTotal"]);
      orderDetail.forEach(el => delete el["producto"]);

      const order = {
         id_cliente: selectedCustomer.id,
         domicilio_entrega: newAddress ? address : selectedCustomer.domicilio,
         telefono: selectedCustomer.telefono,
         referencia: newAddress ? referenceNewAddres : selectedCustomer.referencia,
         productos: orderDetail,
         estado: false
      }
      sendHttpRequest(order);
   }

   const sendHttpRequest = async (order) => {
      try {
         const response = await fetch(`${api}/api/pedidos/`, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
               "Content-Type": "application/json",
            },
         });

         if (response.status === 201) {
            history.push('/dashboard/pedidos')
         }


      } catch (e) {
         console.log(e);
      }
   };

   return (
      <Fragment>

         {Object.keys(selectedCustomer).length < 1 && <Search setCustomer={setSelectedCustomer} />}

         {Object.keys(selectedCustomer).length > 0 &&
            <div className='card-nb'>
               <div className={styles["order__customer-options"]}>
                  <span className='back__arrow' onClick={() => { onChooseAnotherCustomer() }}><i className="fas fa-long-arrow-alt-left"></i></span>
                  <span className='edit__user' onClick={() => { setShowEditCustomerModal(true) }} ><i className="fas fa-user-edit"></i></span>
               </div>
               <form className='form' onSubmit={onSubmitHandler}>
                  <div className='row-nb'>
                     <div className='form__group'>
                        <label className='form__label'>Nombre: </label>
                        <input className='form__input' value={selectedCustomer.nombre} disabled />
                     </div>
                     <div className='form__group'>
                        <label className='form__label'>Apellido: </label>
                        <input className='form__input' value={selectedCustomer.apellido} disabled />
                     </div>
                     <div className='form__group'>
                        <label className='form__label'>Telefono: </label>
                        <input className='form__input' value={selectedCustomer.telefono} disabled />
                     </div>
                  </div>

                  <div className='row-nb row-nb-3'>
                     <div className='form__group'>
                        <label className='form__label'>Domicilio: </label>
                        <input className={`form__input`} value={selectedCustomer.domicilio} disabled />
                        {!newAddress && <small className='form__input-btn' onClick={() => { setAddNewAddress(true); setOnEditMode(true) }} >Cambiar domicilio de entrega</small>}
                     </div>
                     {/* <div className='form__group'>
                        <label className='form__label'>Referencia: </label>
                        <input className={`form__input ${addReference ? "form__input__edit" : ""}`} disabled={addReference ? false : true} value={selectedCustomer.reference} />
                        {!addReference && !newAddress && <small className='form__input-btn' onClick={() => setAddReference(true)} disabled={addReference ? false : true} >Agregar referencia</small>}
                        {addReference && <small className='form__input-btn' >Guardar</small>}
                     </div> */}
                     <div className='form__group'>
                        <label className='form__label'>Localidad: </label>
                        <input className='form__input' value={selectedCustomer.ciudad.nombre} disabled />
                     </div>
                     <div className='form__group'>
                        <label className='form__label'>Email: </label>
                        <input className='form__input' value={selectedCustomer.email} disabled />
                     </div>
                  </div>

                  {/* NEW ADDRESS */}
                  {newAddress && <div className='row-nb row-nb-3'>
                     <div className='form__group'>
                        <label className='form__label'>Domicilio de entrega: </label>
                        <input className={`form__input ${onEditMode ? "form__input__edit" : ""} ${error ? "is-invalid" : ""} `} value={address} onChange={(e) => setNewAddress(e.target.value)} />
                        {error && <small className='invalid-feedback'>Debes ingresar un docimilio de entrega</small>}
                        {onEditMode && (
                           <Fragment>
                              <small className='form__input-btn' onClick={() => { onSetNewAddress() }}>Aceptar</small>
                              <small className='form__input-btn' onClick={() => { setAddNewAddress(false); setOnEditMode(false); setError(false) }}>Cancelar</small>
                           </Fragment>
                        )
                        }
                     </div>
                     <div className='form__group'>
                        <label className='form__label'>Referencia: </label>
                        <input className={`form__input ${onEditMode ? "form__input__edit" : ""}`} value={referenceNewAddres} onChange={(e) => setReferenceNewAddress(e.target.value)} />
                     </div>
                     <div className='form__group'></div>
                  </div>
                  }

                  <hr></hr>

                  <OrderItems addProductToOrder={addProductToOrder} />

                  {orderDetail.length > 0 && <OrderDetail orderDetail={orderDetail} />}

                  {orderDetail.length > 0 &&

                     <div className='row-nb d-flex justify-content-end'>
                        <button className={`button acept__button`} type='submit'>Agregar pedido</button>
                     </div>

                  }

               </form>


            </div>
         }

         {/* Edit customer modal */}

         {showEditCustomerModal && (
            <Fragment>
               <EditCustomerModal customer={selectedCustomer} showModal={setShowEditCustomerModal} updateCustomer={(customerUpdated) => { onUpdateCustomer(customerUpdated) }} />
               <Backdrop />
            </Fragment>
         )}
      </Fragment >
   )
}

export default AddOrder
