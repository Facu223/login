import React, { Fragment, useEffect, useState } from 'react'

import api from '../../servicios/api';

import styles from './AddOrder.module.css';

const AddOrder = () => {
   const [customersListSearch, setCustomersListSearch] = useState([]);
   const [selectedCustomer, setSelectedCustomer] = useState({});
   let [alreadySearch, setAlreadySearch] = useState(false);

   useEffect(() => {
      fetchCustomers();
      console.log('Buscando...');
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
   }

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

                  <div className='table__container'>
                     <table className="table">
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
               <span className='back__arrow' onClick={() => { onChooseAnotherCustomer() }}><i class="fas fa-long-arrow-alt-left"></i></span>
               <form className='form'>
                  <div className='row-nb'>
                     <div className='form__group'>
                        <label className='form__label'>Nombre: </label>
                        <input className='form__input' value={selectedCustomer.nombre} />
                     </div>
                     <div className='form__group'>
                        <label className='form__label'>Apellido: </label>
                        <input className='form__input' value={selectedCustomer.apellido} />
                     </div>

                  </div>

                  <div className='row-nb row-nb-3'>
                     <div className='form__group'>
                        <label className='form__label'>Domicilio: </label>
                        <input className='form__input' value={selectedCustomer.domicilio} />
                     </div>
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

                  <button className='button acept__button'>+ Productos</button>

               </form>
            </div>
         }
      </Fragment >
   )
}

export default AddOrder
