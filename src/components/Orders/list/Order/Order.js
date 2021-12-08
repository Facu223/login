import React, { Fragment } from 'react'

const Order = ({ order, showModal }) => {

   return (
      <Fragment>
         <tr>
            <td>{order.id}</td>
            <td>{order.cliente.nombre} {order.cliente.apellido} </td>
            <td>{order.domicilio_entrega}</td>
            <td>{order.referencia}</td>
            <td>{order.cliente.localidad}</td>
            <td>{order.telefono}</td>
            <td>
               <button className='button success__button' onClick={() => { showModal(order.id) }} >Ver</button>
            </td>
         </tr>
      </Fragment >
   )
}

export default Order
