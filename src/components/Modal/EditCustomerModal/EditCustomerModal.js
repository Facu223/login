import React, { Fragment, useEffect, useState } from 'react';
import FormGroup from '../../Employees/FormGroup';
import api from '../../servicios/api';
import { validateInputs } from '../../Utils/ValidationsFunctions';

const EditCustomerModal = ({ customer, showModal, updateCustomer }) => {
   // States
   const [errors, setErrors] = useState([]);
   const [ciudades, setCiudades] = useState([]);
   const [customerData, setCustomerData] = useState(customer)

   useEffect(() => {
      fetchCities();
   }, []);

   const fetchCities = async () => {
      const response = await fetch(`${api}/api/ciudades`)
      const data = await response.json();

      setCiudades(data.cities);
   }

   const onChangeHandler = (e) => {
      setCustomerData(prevState => {
         return { ...prevState, [e.target.name]: e.target.value }
      });
   }

   const onSubmitHandler = (e) => {
      e.preventDefault();

      if (customerData.ciudad.id) {
         customerData.id_ciudad = customerData.ciudad.id;
      }

      delete customerData["ciudad"];

      const requiredFields = ["nombre", "apellido", "domicilio", "telefono", "ciudad"];
      const errorsArr = validateInputs(customerData, requiredFields);

      if (Object.keys(errorsArr).length > 0) {
         return setErrors(errorsArr);
      }

      setErrors([]);

      sendHttpRequest(customerData);
   }

   const sendHttpRequest = async (customerData) => {
      const url = `${api}/api/clientes/${customer.id}`;
      try {
         const data = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(customerData),
            headers: {
               'Content-Type': 'application/json'
            }
         });

         const response = await data.json();

         if (response.status === 'OK') {
            updateCustomer(response.clienteActualizado);
         }

         return showModal(false);
      } catch (e) {

      }
   }

   const checkValid = (field) => {
      const value = Object.values(errors);
      if (value.indexOf(field) !== -1) return true;
      return false;
   };

   return (
      <Fragment>
         <div className='modal-nb'>
            <h3>Editar cliente</h3>
            <form className='form' onSubmit={onSubmitHandler}>
               <div className='row-nb'>
                  <FormGroup
                     labelClass={"form__label"}
                     labelName={"Nombre:"}
                     inputClass={"form__input"}
                     inputType={"text"}
                     inputName={"nombre"}
                     inputValue={customerData.nombre}
                     onChangeHandler={onChangeHandler}
                     checkValid={checkValid}
                     errors={errors}
                  />
                  <FormGroup
                     labelClass={"form__label"}
                     labelName={"Apellido:"}
                     inputClass={"form__input"}
                     inputType={"text"}
                     inputName={"apellido"}
                     inputValue={customerData.apellido}
                     onChangeHandler={onChangeHandler}
                     checkValid={checkValid}
                     errors={errors}
                  />
               </div>

               <div className='row-nb'>
                  <FormGroup
                     labelClass={"form__label"}
                     labelName={"Domicilio:"}
                     inputClass={"form__input"}
                     inputType={"text"}
                     inputName={"domicilio"}
                     inputValue={customerData.domicilio}
                     onChangeHandler={onChangeHandler}
                     checkValid={checkValid}
                     errors={errors}
                  />
                  <div className="form__group">
                     <label className="form__label">Ciudad:</label>
                     <select name="id_ciudad" className="form__select" value={customer.ciudad.id} onChange={onChangeHandler}>
                        {ciudades.map(ciudad => {
                           return <option className="" key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
                        })}
                     </select>
                  </div>
               </div>
               <div className='row-nb'>
                  <FormGroup
                     labelClass={"form__label"}
                     labelName={"Barrio:"}
                     inputClass={"form__input"}
                     inputType={"text"}
                     inputName={"barrio"}
                     inputValue={customerData.barrio}
                     onChangeHandler={onChangeHandler}
                     checkValid={checkValid}
                     errors={errors}
                  />

                  <FormGroup
                     labelClass={"form__label"}
                     labelName={"Telefono:"}
                     inputClass={"form__input"}
                     inputType={"text"}
                     inputName={"telefono"}
                     inputValue={customerData.telefono}
                     onChangeHandler={onChangeHandler}
                     checkValid={checkValid}
                     errors={errors}
                  />


               </div>

               <div className='row-nb'>
                  <FormGroup
                     labelClass={"form__label"}
                     labelName={"Cuil"}
                     inputClass={"form__input"}
                     inputType={"text"}
                     inputName={"cuil"}
                     inputValue={customerData.cuil}
                     onChangeHandler={onChangeHandler}
                     checkValid={checkValid}
                     errors={errors}
                  />
                  <FormGroup
                     labelClass={"form__label"}
                     labelName={"Email:"}
                     inputClass={"form__input"}
                     inputType={"text"}
                     inputName={"email"}
                     inputValue={customerData.email}
                     onChangeHandler={onChangeHandler}
                     checkValid={checkValid}
                     errors={errors}
                  />
               </div>

               <div className='button__group'>
                  <button className='button acept__button' type='submit'>Aceptar</button>
                  <button className='button cancel__button' type='button' onClick={() => { showModal(false) }}>Cancelar</button>
               </div>
            </form>
         </div>
      </Fragment>
   )
};

export default EditCustomerModal;
