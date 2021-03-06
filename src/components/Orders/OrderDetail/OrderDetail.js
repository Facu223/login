import React, { Fragment, useEffect, useState } from 'react'

import styles from './OrderDetail.module.css';

const OrderDetail = ({ orderDetail }) => {

   const [total, setTotal] = useState(0);

   const calcTotal = () => {
      let total = 0;
      orderDetail.forEach(item => {
         total += (Number(item.precio) + Number(item.flete)) * Number(item.cantidad)
      });

      setTotal(total);
   }

   const calcItemTotal = () => {
      let itemTotal = 0;
      orderDetail.forEach(item => {
         itemTotal = (Number(item.precio) + Number(item.flete)) * Number(item.cantidad);
         item["itemTotal"] = itemTotal
      })
   }

   useEffect(() => {
      calcTotal();
      calcItemTotal();
   }, [orderDetail]);

   return (
      <Fragment>
         <hr></hr>
         <h5 className='text-center my-3 text-black-50'>Detalle del pedido</h5>
         <table className='table'>
            <tbody>
               <tr>
                  <th style={{ width: '10rem' }}>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Flete</th>
                  <th>Total</th>
               </tr>
               {orderDetail.map((product, index) => {
                  return (
                     <tr key={index}>
                        <td>{product.producto}</td>
                        <td>{product.cantidad}</td>
                        <td>${product.precio}</td>
                        <td>${product.flete}</td>
                        <td>${product.itemTotal}</td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
         <div className={styles.footer}>
            <div className={styles.total}>Total: ${total}</div>
         </div>
      </Fragment>
   )
}

export default OrderDetail
