import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

const Order = ({ order, showModal }) => {
   const history = useHistory();

   return (
      <Fragment>
         <tr className='cursor-pointer' onClick={() => { showModal(order.id) }}>
            <td>{order.id}</td>
            <td>{order.cliente.nombre} {order.cliente.apellido} </td>
            <td>{order.domicilio_entrega}</td>
            <td className='text-center'>{order.referencia ? order.referencia : "---"}</td>
            <td>{order.cliente.ciudad.nombre}</td>
            <td>{order.telefono}</td>
            <td>
               <button className='button btn-warning text-white' onClick={(e) => { e.stopPropagation(); history.push("/dashboard/pedidos/editar", { state: order }) }} >Editar</button>
            </td>
         </tr>
      </Fragment >
   )
}

export default Order
