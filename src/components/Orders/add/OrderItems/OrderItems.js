import React, { Fragment, useEffect, useState } from 'react'
import api from '../../../servicios/api';

const OrderItems = (props) => {
   const itemInitialState = { id_producto: "", producto: "", cantidad: "", precio: "", flete: "" }

   // States
   const [productsList, setProductsList] = useState([]);
   const [errors, setErrors] = useState({});

   // Order detail states
   const [orderItem, setOrderItem] = useState(itemInitialState);

   useEffect(() => {
      fetchProductsList();
   }, []);

   const fetchProductsList = async () => {
      try {
         const response = await fetch(`${api}/api/productos/`);
         const data = await response.json();

         setProductsList(data.productos);

      } catch (e) {
         console.log(e)
      }
   }

   const onInputChange = (e) => {
      setOrderItem(prevState => {
         return { ...prevState, [e.target.name]: e.target.value }
      });

      if (e.target.name === 'id_producto') {
         const selectedProduct = productsList.find(el => el.id === +e.target.value);

         setOrderItem(prevState => {
            return { ...prevState, precio: selectedProduct.precio, producto: selectedProduct.nombre }
         });

      }
   }

   const onAddItemToOrder = () => {
      // Validation
      const requiredFields = ["id_producto", "cantidad", "precio"]

      if (Object.keys(validateInputs(orderItem, requiredFields)).length) {
         setErrors(validateInputs(orderItem, requiredFields));
         return;
      }

      setErrors({});

      // Add item
      props.addProductToOrder(orderItem);

      setOrderItem(itemInitialState);
   }

   const validateInputs = (inputs, requiredFields) => {
      const keyInputs = Object.keys(inputs);
      const errors = {};

      keyInputs.forEach((input) => {
         if (!inputs[input] && requiredFields.includes(input)) {
            errors[input] = `${input}__error`;
         }
      });

      return errors;
   };

   const checkValid = (field) => {
      const value = Object.values(errors);
      if (value.indexOf(field) !== -1) return true;
      return false;
   };

   const { id_producto, cantidad, precio, flete } = orderItem;

   return (
      <Fragment>
         <div className='row-nb'>
            <div className='form__group'>
               <label className='form__label'>
                  Producto:
               </label>
               <select className={`form__select form__input__edit ${checkValid(errors["id_producto"]) ? "is-invalid" : ""}`}
                  value={!id_producto ? 'default' : id_producto}
                  onChange={(e) => onInputChange(e)}
                  name='id_producto'>
                  <option value={"default"} disabled>--Seleccionar--</option>
                  {productsList.length > 0 && productsList.map(product => {
                     return <option value={product.id} key={product.id} >{product.nombre}</option>
                  })}
               </select>
               <small id="helpId" className="invalid-feedback">Debes seleccionar un producto</small>
            </div>

            <div className='row-nb row-nb-3'>
               <div className='form__group'>
                  <label className='form__label'>
                     Cantidad:
                  </label>
                  <input className={`form__input form__input__edit ${checkValid(errors["cantidad"]) ? "is-invalid" : ""}`}
                     type='number'
                     value={cantidad}
                     onChange={(e) => onInputChange(e)}
                     name='cantidad' />
                  <small id="helpId" className="invalid-feedback">Debes ingresar una cantidad</small>
               </div>
               <div className='form__group'>
                  <label className='form__label'>
                     Precio:
                  </label>
                  <input className={`form__input form__input__edit ${checkValid(errors["precio"]) ? "is-invalid" : ""}`}
                     type='number'
                     value={precio}
                     onChange={(e) => onInputChange(e)}
                     name='precio' />
                  <small id="helpId" className="invalid-feedback">Debes ingresar un precio</small>
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
            <button className='button success__button mb-3' type='button' onClick={() => { onAddItemToOrder() }} >Agregar</button>
         </div>
      </Fragment>
   )
}

export default OrderItems
