import React, { useEffect, useState } from 'react'

import styles from './OrderDetailModal.module.css'

const OrderDetailModal = ({ closeModal, order }) => {
   // States
   const [total, setTotal] = useState({});

   const calTotals = () => {
      const products = order.detalle_pedido;

      products.forEach(product => {
         product["itemTotal"] = product.precio * product.cantidad
      });

      products.forEach(product => {
         product["itemFlete"] = product.flete * product.cantidad
      })

      const subTotal = products.reduce((accum, curr) => accum + curr.itemTotal, 0);
      const fleteTotal = products.reduce((accum, curr) => accum + (curr.flete * curr.cantidad), 0);
      const orderTotal = subTotal + fleteTotal;

      setTotal({
         subTotal,
         fleteTotal,
         orderTotal
      });
   }

   useEffect(() => {
      calTotals();
   }, []);

   return (

      <div className={styles.modal__container}>

         <i class={`fas fa-times ${styles.modal__close}`} onClick={() => { closeModal(false) }} ></i>

         <div className={styles.modal__header}>
            <h3 className={styles["order__customer"]}>{order.cliente.nombre} {order.cliente.apellido}</h3>
            <p className={styles["order__number"]}>#{order.id}</p>
         </div>

         <div className={styles["modal__customer-info"]}>
            <p className={styles["customer-info__title"]}>Informacion del cliente</p>
            <ul className={styles["customer-info__list"]}>
               <div className={styles["customer-info__address"]}>
                  <li><strong>Domicilio: </strong> {order.domicilio_entrega}</li>
                  <li><strong>Localidad: </strong>{order.cliente.localidad} </li>
                  <li><strong>Referencia: </strong>{order.referencia} </li>
               </div>
               <div className={styles["customer-info__contact"]}>
                  <li><strong>Telefono: </strong>{order.telefono} </li>
                  <li><strong>Email: </strong>{order.cliente.email} </li>
               </div>
            </ul>
         </div>

         <div className={styles["modal__order-detail"]}>
            <p>Detalle del pedido</p>
            <ul className={styles["order-detail__list"]}>
               {order.detalle_pedido.map(product => {
                  return (

                     <li className={styles["order-detail__item"]}>
                        <div className={styles["order-detail__product"]}>
                           <p>{product.cantidad}</p>
                           <p>{product.producto.nombre}</p>
                        </div>
                        <div className={styles["order-detail__price"]}>
                           <p>${product.precio}</p>
                           <p>${product.itemTotal}</p>
                        </div>
                     </li>
                  )
               })}
            </ul>
         </div>

         <div className={styles["modal__order-total"]}>
            <div className={styles["total__detail"]}>
               <p>Subtotal: ${total.subTotal}</p>
               <p>Flete: ${total.fleteTotal}</p>
            </div>
            <p className={styles["total"]}>Total: ${total.orderTotal}</p>
         </div>

         <div className={styles["modal__actions"]}>
            <button className='button success__button'>Completado</button>
         </div>

      </div>

   )
}

export default OrderDetailModal
