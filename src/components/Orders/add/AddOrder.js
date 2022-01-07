import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router';

import api from '../../servicios/api';
import OrderDetail from '../OrderDetail/OrderDetail';

import styles from './AddOrder.module.css';
import OrderItems from './OrderItems/OrderItems';

const AddOrder = () => {
   const [customersListSearch, setCustomersListSearch] = useState([]);
   const [selectedCustomer, setSelectedCustomer] = useState({});
   const [addReference, setAddReference] = useState(false);
   const [newAddress, setAddNewAddress] = useState(false);
   const [onEditMode, setOnEditMode] = useState(false);
   const [address, setNewAddress] = useState();
   const [referenceNewAddres, setReferenceNewAddress] = useState();
   let [alreadySearch, setAlreadySearch] = useState(false);
   const [error, setError] = useState(false);

   const [orderDetail, setOderDetail] = useState([]);

   // Hooks
   const history = useHistory();

   useEffect(() => {
      fetchCustomers();
   }, [])

   const fetchCustomers = async () => {
      try {
         const response = await fetch(`${api}/api/clientes/`, {
            method: 'GET',
            headers: {
               'Content-type': 'json/application'
            }
         })

         const data = await response.json();

         console.log(data);
      } catch (e) {
         console.log(e)
      }
   }

   const search = (e) => {
      searchCustomer(e.target.value)
      setAlreadySearch(true)
   }

   const searchCustomer = async (searchValue) => {
      if (!searchValue) searchValue = 'emptyInput'

      try {
         const url = new URL(`${api}/api/clientes/buscar/`)
         const params = { search: searchValue };

         url.search = new URLSearchParams(params).toString();

         const respose = await fetch(url);
         const data = await respose.json();

         if (data.cliente.length) {
            setCustomersListSearch(data.cliente)
         }
         else {
            setCustomersListSearch([...data.cliente])
         }

      } catch (e) {
         console.log(e)
      }
   }

   const onSelectCustomer = (customerId) => {
      const customerFiltered = customersListSearch.filter(customer => {
         return customer.id === customerId
      })

      setSelectedCustomer(customerFiltered[0]);
   }

   const onChooseAnotherCustomer = () => {
      setSelectedCustomer({})
      setCustomersListSearch([])
      setOderDetail([]);
      setAddNewAddress(false);
      resetForm();
   }

   const goToOrdersList = () => {
      history.push("/dashboard/pedidos")
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

         {/* BUSCADOR */}
         {Object.keys(selectedCustomer).length < 1 &&
            <div className='card-nb'>

               <div className='my-3'>
                  <span className='back__arrow' onClick={() => { goToOrdersList() }}><i className="fas fa-long-arrow-alt-left"></i></span>
               </div>

               <div className={`form__group ${styles.searchInput}`}>
                  <label className='form__label'>Buscar cliente: </label>
                  <input className='form__input  form__input__edit' type='text' placeholder='Nombre o direccion' onInput={(e) => search(e)} />
               </div>

               {(customersListSearch.length < 1 && alreadySearch) && <p className='text-center text-secondary'>No se encontraron resultados</p>}

               {customersListSearch.length > 0 &&

                  <div className='table__container search__table'>
                     <table className="table ">
                        <thead>
                           <tr>
                              <th>ID</th>
                              <th>Nombre</th>
                              <th>Domicilio</th>
                              <th>Telefono</th>
                              <th>Acciones</th>
                           </tr>
                        </thead>
                        <tbody className='tbody-nb' style={{ maxHeight: '10px' }} >
                           {customersListSearch.map((customer, index) => (
                              <tr key={index}>
                                 <td data-titulo="ID">{customer.id}</td>
                                 <td data-titulo="Nombre">{customer.nombre} {customer.apellido}</td>
                                 <td data-titulo="Domicilio">{customer.domicilio}</td>
                                 <td data-titulo="Telefono">
                                    {customer.telefono}
                                 </td>
                                 <td>
                                    <div
                                       className={`${styles.button__group} ${styles.botones}`}
                                    >
                                       <button className='button acept__button' onClick={() => onSelectCustomer(customer.id)} >Seleccionar</button>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>

                  </div>
               }
            </div>
         }

         {Object.keys(selectedCustomer).length > 0 &&
            <div className='card-nb'>
               <div className={styles["order__customer-options"]}>
                  <span className='back__arrow' onClick={() => { onChooseAnotherCustomer() }}><i className="fas fa-long-arrow-alt-left"></i></span>
                  <span className='edit__user'><i className="fas fa-user-edit"></i></span>
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
                     <div className='form__group'>
                        <label className='form__label'>Referencia: </label>
                        <input className={`form__input ${addReference ? "form__input__edit" : ""}`} disabled={addReference ? false : true} value={selectedCustomer.reference} />
                        {!addReference && !newAddress && <small className='form__input-btn' onClick={() => setAddReference(true)} disabled={addReference ? false : true} >Agregar referencia</small>}
                        {addReference && <small className='form__input-btn' >Guardar</small>}
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
      </Fragment >
   )
}

export default AddOrder
