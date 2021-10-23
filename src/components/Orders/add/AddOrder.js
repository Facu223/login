import React, { useEffect, useState } from 'react'

import api from '../../servicios/api';

import styles from './AddOrder.module.css';

const AddOrder = () => {  
   const [customersListSearch, setCustomersListSearch] = useState([]);
   const [selectedCustomer, setSelectedCustomer] = useState({});

   useEffect(() => {
      fetchCustomers()
   }, [])

   const fetchCustomers = async () => {
      const response = await fetch(`${api}/api/clientes/`, {
         method: 'GET',
         headers: {
            'Content-type': 'json/application'
         }
      })

      const data = await response.json();

      console.log(data);
   }

   const search = (e) => {
     searchCustomer(e.target.value)
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
      
      <div className='card-nb'>

         {Object.keys(selectedCustomer).length < 1 && <div className={`form__group ${styles.searchInput}`}>
               <label className='form__label'>Buscar cliente: </label>
               <input className='form__input  form__input__edit' type='text' placeholder='Nombre o direccion' onInput={(e) => search(e)} />
               {customersListSearch && 
                  <div className={`${styles.searchResults}`}>
                     {customersListSearch.map(customer => {
                        return <li className={`${styles.resultItem}`} key={customer.id} onClick={() => {onSelectCustomer(customer.id)}} >{customer.nombre}</li>
                     })}
                  </div>
               }
            </div> }
            

         
         {Object.keys(selectedCustomer).length > 0 && 
         <div>
            <button onClick={() => {onChooseAnotherCustomer()}}>Volver</button>   
            <form className='form'>
               <div className='form__group'>
                  <label className='form__label'>Nombre: </label>
                  <input className='form__input form__input__edit' value={selectedCustomer.nombre} />
               </div>   
            </form>
         </div>
         }
      </div>
   )
}

export default AddOrder
