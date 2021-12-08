import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Backdrop from '../../Backdrop/Backdrop';
import OrderDetailModal from '../../Modal/OrderDetailModal/OrderDetailModal';
import api from '../../servicios/api';
import Order from './Order/Order';

const ListOrders = () => {
   // States
   const [orders, setOrders] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [orderDetail, setOrderDetail] = useState({});

   useEffect(() => {
      sendHttpRequest();
   }, [])

   const sendHttpRequest = async () => {
      try {
         const response = await fetch(`${api}/api/pedidos/`)

         const data = await response.json();

         setOrders(data.orders);
      } catch (e) {
         console.log(e);
      }
   }

   // Modal functionality
   const onShowModal = (orderId) => {
      const order = orders.filter(order => order.id === orderId);

      setOrderDetail(order[0]);
      setShowModal(true);
   }

   return (
      <Fragment>
         <div className='card-nb'>
            <div className='text-left'>
               <Link
                  to={"/dashboard/pedidos/nuevo"}
                  type="button"
                  className={`button acept__button`}
               >
                  <i className={`bi bi-plus`}></i>
                  Agregar
               </Link>
            </div>

            <h4 className='text-center my-2 text-black-50'>
               <span>Lista de pedidos</span>
            </h4>

            <table className='table'>
               <thead>
                  <tr>
                     <th>N° Pedido</th>
                     <th>Cliete</th>
                     <th>Domicilio de entrega</th>
                     <th>Referencia</th>
                     <th>Localidad</th>
                     <th>Telefono</th>
                     <th>Accion</th>
                  </tr>
               </thead>
               <tbody>
                  {orders.length > 0 ? orders.map(order => {
                     return <Order order={order} showModal={onShowModal} />
                  }) : null}
               </tbody>
            </table>

         </div>

         {showModal && <OrderDetailModal closeModal={setShowModal} order={orderDetail} />}
         {showModal && <Backdrop />}
      </Fragment>
   )
}

export default ListOrders
