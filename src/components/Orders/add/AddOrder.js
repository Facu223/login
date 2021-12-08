import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router';

import api from '../../servicios/api';
import OrderDetail from '../OrderDetail/OrderDetail';

import styles from './AddOrder.module.css';

const AddOrder = () => {
   const [customersListSearch, setCustomersListSearch] = useState([]);
   const [selectedCustomer, setSelectedCustomer] = useState({});
   let [alreadySearch, setAlreadySearch] = useState(false);

   // Order detail states
   const [orderItem, setOrderItem] = useState({ producto: undefined, cantidad: undefined, precio: undefined, flete: 0 });
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
      setOrderItem({ id_producto: undefined, cantidad: undefined, precio: undefined, flete: undefined })
   }

   // Add a new product to the order
   const addProductToOrder = () => {
      setOderDetail(prevState => {
         return [...prevState, orderItem]
      })
   }

   const onInputChange = (e) => {
      setOrderItem(prevState => {
         return { ...prevState, [e.target.name]: e.target.value }
      });;
   }

   const onSubmitHandler = (e) => {
      e.preventDefault();

      orderDetail.forEach(el => delete el["itemTotal"]);

      const order = {
         id_cliente: selectedCustomer.id,
         domicilio_entrega: selectedCustomer.domicilio,
         telefono: selectedCustomer.telefono,
         referencia: "alguna referencia",
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

   const { id_producto, cantidad, precio, flete } = orderItem;
   // const {referencia} = 

   return (
      <Fragment>

         {Object.keys(selectedCustomer).length < 1 &&
            <div className='card-nb'>

               <div className={`form__group ${styles.searchInput}`}>
                  <label className='form__label'>Buscar cliente: </label>
                  <input className='form__input  form__input__edit' type='text' placeholder='Nombre o direccion' onInput={(e) => search(e)} />
                  {/* {customersListSearch &&
                  <div className={`${styles.searchResults}`}>
                     {customersListSearch.map(customer => {
                        return <li className={`${styles.resultItem}`} key={customer.id} onClick={() => { onSelectCustomer(customer.id) }} >{customer.nombre} | {customer.domicilio}</li>
                     })}
                  </div>
               } */}
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
                           {customersListSearch.map((customer) => (
                              <tr key={customer.id}>
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
                  <span className='back__arrow' onClick={() => { onChooseAnotherCustomer() }}><i class="fas fa-long-arrow-alt-left"></i></span>
                  <span className='edit__user'><i class="fas fa-user-edit"></i></span>
               </div>
               <form className='form' onSubmit={onSubmitHandler}>
                  <div className='row-nb'>
                     <div className='form__group'>
                        <label className='form__label'>Nombre: </label>
                        <input className='form__input' value={selectedCustomer.nombre} />
                     </div>
                     <div className='form__group'>
                        <label className='form__label'>Apellido: </label>
                        <input className='form__input' value={selectedCustomer.apellido} />
                     </div>
                     <div className='form__group'>
                        <label className='form__label'>Domicilio: </label>
                        <input className='form__input' value={selectedCustomer.domicilio} />
                     </div>

                  </div>

                  <div className='row-nb row-nb-3'>
                     {/* <div className='form__group'>
                        <label className='form__label'>Referencia: </label>
                        <input className='form__input form__input__edit' value={referencia} />
                     </div> */}
                     <div className='form__group'>
                        <label className='form__label'>Telefono: </label>
                        <input className='form__input' value={selectedCustomer.telefono} />
                     </div>
                     <div className='form__group'>
                        <label className='form__label'>Email: </label>
                        <input className='form__input' value={selectedCustomer.email} />
                     </div>
                  </div>

                  <hr></hr>

                  <div className='row-nb'>
                     <div className='form__group'>
                        <label className='form__label'>
                           Producto:
                        </label>
                        <select className='form__select form__input__edit'
                           value={!id_producto ? 'seleccionar' : id_producto}
                           onChange={(e) => onInputChange(e)}
                           name='id_producto'>
                           <option value='seleccionar'>--Seleccionar--</option>
                           <option value={1}>Gas 10kg</option>
                           <option value={2}>Gas 15kg</option>
                           <option value={3}>Gas 45kg</option>
                           <option value={4}>Gas 30kg</option>
                           <option value={5}>Carbon 2kg</option>
                           <option value={6}>Carbon 4kg</option>
                           <option value={7}>Carbon elegido</option>
                           <option value={8}>Contenedor</option>
                           <option value={9}>Obrador</option>
                           <option value={10}>Leña 7kg</option>
                           <option value={11}>Leña a ganel</option>
                        </select>
                     </div>

                     <div className='row-nb row-nb-3'>
                        <div className='form__group'>
                           <label className='form__label'>
                              Cantidad:
                           </label>
                           <input className='form__input form__input__edit'
                              type='number'
                              value={cantidad}
                              onChange={(e) => onInputChange(e)}
                              name='cantidad' />
                        </div>
                        <div className='form__group'>
                           <label className='form__label'>
                              Precio:
                           </label>
                           <input className='form__input form__input__edit'
                              type='number'
                              value={precio}
                              onChange={(e) => onInputChange(e)}
                              name='precio' />
                        </div>
                        <div className='form__group'>
                           <label className='form__label'>
                              Flete:
                           </label>
                           <input className='form__input form__input__edit'
                              type='number'
                              value={flete}
                              onChange={(e) => onInputChange(e)}
                              name='flete' />
                        </div>
                     </div>
                  </div>

                  <div className='row-nb my-0'>
                     <button className='button success__button mb-3' type='button' onClick={addProductToOrder} >Agregar</button>
                  </div>

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
