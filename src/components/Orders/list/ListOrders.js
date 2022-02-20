import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Backdrop from '../../Backdrop/Backdrop';
import OrderDetailModal from '../../Modal/OrderDetailModal/OrderDetailModal';
import Pagination from '../../Products/List/Pagination';
import api from '../../servicios/api';
import Order from './Order/Order';

const ListOrders = () => {
   // States
   const [orders, setOrders] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [orderDetail, setOrderDetail] = useState({});
   const [actualPage, setActualPage] = useState(1);

   const TOTAL_PER_PAGE = 10;

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

   // Pagnation functionality
   //Crea un array con los productos a recorrer por pagina
   let ordersToLoad = orders.slice(
      (actualPage - 1) * TOTAL_PER_PAGE,
      actualPage * TOTAL_PER_PAGE
   );

   //Obtiene el total de paginas
   const getTotalPages = () => {
      let totalProducts = orders.length;
      return Math.ceil(totalProducts / TOTAL_PER_PAGE);
   };

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

            <h4 className='my-2'>
               <span>Lista de pedidos</span>
            </h4>

            <table className='table table-hover'>
               <thead className='text-center'>
                  <tr>
                     <th>N° Pedido</th>
                     <th>Cliente</th>
                     <th>Domicilio de entrega</th>
                     <th>Referencia</th>
                     <th>Localidad</th>
                     <th>Telefono</th>
                     <th>Accion</th>
                  </tr>
               </thead>
               <tbody className='text-center'>
                  {orders.length > 0 ? ordersToLoad.map((order, index) => {
                     return <Order order={order} key={index} showModal={onShowModal} />
                  }) : null}
               </tbody>
            </table>


            <div className='text-center'>
               <Pagination
                  page={actualPage}
                  total={getTotalPages()}
                  onChange={(page) => {
                     setActualPage(page);
                  }} />
            </div>

         </div>

         {showModal && <OrderDetailModal closeModal={setShowModal} order={orderDetail} />}
         {showModal && <Backdrop />}
      </Fragment>
   )
}

export default ListOrders
