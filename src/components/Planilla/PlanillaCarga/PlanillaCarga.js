import React, { Fragment } from 'react'

const OrderDetail = ({ orderDetail }) => {

   return (
      <Fragment>
         <h5 className='text-center my-3 text-black-50'>Detalle de la carga</h5>
         <table className='table'>
            <tbody>
               <tr>
                  <th style={{ width: '10rem' }}>Producto</th>
                  <th>Cantidad</th>
               </tr>
               {orderDetail.map((product, index) => {
                  return (
                     <tr key={index}>
                        <td>{product.producto} {product.descripcion}</td>
                        <td>{product.cantidad}</td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
      </Fragment>
   )
}

export default OrderDetail