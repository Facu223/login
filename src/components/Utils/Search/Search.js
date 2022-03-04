import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import api from '../../servicios/api';
import styles from './Search.module.css';

const Search = ({ setCustomer }) => {
   // States
   const [customersListSearch, setCustomersListSearch] = useState([]);
   // const [selectedCustomer, setSelectedCustomer] = useState({});
   let [alreadySearch, setAlreadySearch] = useState(false);

   const history = useHistory();

   const goToOrdersList = () => {
      history.push("/dashboard/pedidos")
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

      setCustomer(customerFiltered[0]);
   }

   return (
      <Fragment>

         {/* BUSCADOR */}
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

      </Fragment>
   );
};

export default Search;
