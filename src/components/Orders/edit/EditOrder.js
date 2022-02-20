import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import OrderDetail from '../add/OrderDetail/OrderDetail';
import OrderItems from '../add/OrderItems/OrderItems';

const EditOrder = (props) => {
   // States
   const [customer, setCustomer] = useState({});
   const [orderDetail, setOrderDetail] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const history = useHistory();

   useEffect(() => {
      if (props.location.state.state) {
         setCustomerToEdit(props.location.state.state);
         setOrderDetailToEdit(props.location.state.state);
      }
   }, []);

   const setCustomerToEdit = (cus) => {
      setCustomer(cus.cliente);
      setIsLoading(false);
   }

   const setOrderDetailToEdit = (orderDetail) => {
      // detalle_pedido -> [];
      console.log(orderDetail);
      orderDetail.detalle_pedido.forEach(item => {
         item.producto = item.producto.nombre;
      });

      setOrderDetail(orderDetail.detalle_pedido);
   }

   const onSubmitHandler = () => {

   }

   return (
      <Fragment>

         {!isLoading && <div className='card-nb'>
            <div className='my-3'>
               <span className='back__arrow' onClick={() => { history.push("/dashboard/pedidos") }}><i className="fas fa-long-arrow-alt-left"></i></span>
            </div>
            <form className='form' onSubmit={onSubmitHandler}>
               <div className='row-nb'>
                  <div className='form__group'>
                     <label className='form__label'>Nombre: </label>
                     <input className='form__input' value={customer.nombre} disabled />
                  </div>
                  <div className='form__group'>
                     <label className='form__label'>Apellido: </label>
                     <input className='form__input' value={customer.apellido} disabled />
                  </div>
                  <div className='form__group'>
                     <label className='form__label'>Telefono: </label>
                     <input className='form__input' value={customer.telefono} disabled />
                  </div>
               </div>

               <div className='row-nb row-nb-3'>
                  <div className='form__group'>
                     <label className='form__label'>Domicilio: </label>
                     <input className={`form__input`} value={customer.domicilio} disabled />
                     {/* {!newAddress && <small className='form__input-btn' onClick={() => { setAddNewAddress(true); setOnEditMode(true) }} >Cambiar domicilio de entrega</small>} */}
                  </div>
                  {/* <div className='form__group'>
                        <label className='form__label'>Referencia: </label>
                        <input className={`form__input ${addReference ? "form__input__edit" : ""}`} disabled={addReference ? false : true} value={customer.reference} />
                        {!addReference && !newAddress && <small className='form__input-btn' onClick={() => setAddReference(true)} disabled={addReference ? false : true} >Agregar referencia</small>}
                        {addReference && <small className='form__input-btn' >Guardar</small>}
                     </div> */}
                  <div className='form__group'>
                     <label className='form__label'>Localidad: </label>
                     <input className='form__input' value={customer.ciudad.nombre} disabled />
                  </div>
                  <div className='form__group'>
                     <label className='form__label'>Email: </label>
                     <input className='form__input' value={customer.email} disabled />
                  </div>
               </div>

               {/* NEW ADDRESS */}
               {/* {newAddress && <div className='row-nb row-nb-3'>
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
                  } */}

               <hr></hr>

               <OrderItems />

               {orderDetail.length > 0 && <OrderDetail orderDetail={orderDetail} editMode={true} />}

               {orderDetail.length > 0 &&

                  <div className='row-nb d-flex justify-content-end'>
                     <button className={`button acept__button`} type='submit'>Agregar pedido</button>
                  </div>

               }

            </form>


         </div>
         }

      </Fragment>
   );
};

export default EditOrder;
