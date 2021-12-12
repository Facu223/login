import React from "react";
import { Link } from "react-router-dom";
import api from "../../servicios/api";
// import styles from "./ListEmployees.module.css";
import styles from "./ListCustomers.module.css";
// import Modal from "../../Modals/Modal";
import Pagination from "../../Products/List/Pagination";

class ListCustomers extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         datosCargados: false,
         clientes: [],
         isOpen: false,
         TOTAL_PER_PAGE: 10,
         actualPage: 1,
      };
   }


   borrarRegistros = (id) => {
      if (window.confirm("¿Estás seguro?"))
         fetch(api + "/api/clientes/" + id, {
            method: "DELETE",
            header: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
         })
            .then(() => this.cargarDatos())
            .catch(console.log);
   };

   openModal() {
      this.setState({ isOpen: true });
   }

   closeModal = () => {
      this.setState({ isOpen: false });
   };

   cargarDatos() {
      fetch(api + "/api/clientes")
         .then((respuesta) => respuesta.json())
         .then((datosRespuesta) => {
            this.setState({
               datosCargados: true,
               clientes: datosRespuesta.clientes,
            });
         })
         .catch(console.log);
   }

   componentDidMount() {
      this.cargarDatos();
   }

   render() {


      const { datosCargados, clientes, actualPage, TOTAL_PER_PAGE } = this.state;
      const clientsToLoad = clientes.slice(
         (actualPage - 1) * TOTAL_PER_PAGE,
         actualPage * TOTAL_PER_PAGE
      )

      let getTotalClients = clientes.length;
      getTotalClients = Math.ceil(getTotalClients / TOTAL_PER_PAGE)

      if (!datosCargados) {
         return <div>Cargando</div>;
      } else {
         return (
            <div className='card-nb'>
               <Link
                  to={"/dashboard/clientes/nuevo"}
                  type="button"
                  className={`button acept__button`}
               >
                  <i className={`bi bi-plus ${styles.new__button__icon}`}></i>
                  Agregar
               </Link>
               <h4>Lista de clientes</h4>
               <table className="table">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Domicilio</th>
                        <th>Telefono</th>
                        <th>E-mail</th>
                        <th>Acciones</th>
                     </tr>
                  </thead>
                  <tbody>
                     {clientsToLoad.map((cliente) => (
                        <tr key={cliente.id}>
                           <td data-titulo="ID">{cliente.id}</td>
                           <td data-titulo="Nombre">{cliente.nombre}</td>
                           <td data-titulo="Apellido">{cliente.apellido}</td>
                           <td data-titulo="DNI">{cliente.domicilio}</td>
                           <td data-titulo="Telefono">{cliente.telefono}</td>
                           <td data-titulo="Telefono">{cliente.email}</td>
                           <td>
                              <div
                                 className={`${styles.button__group} ${styles.botones}`}
                              >
                                 {/* <button
                                    type="button"
                                    onClick={this.openModal}
                                    className={`button ${styles.edit__button}`}
                                 >
                                    Editar
                                 </button>
                                 <button
                                    onClick={() => this.borrarRegistros(cliente.id)}
                                    type="button"
                                    className={`${styles.delete__button} button`}
                                 >
                                    Borrar
                                 </button> */}
                                 <Link to={`/dashboard/clientes/editar/${cliente.id}`} className="button success__button acept__button-table">Ver</Link>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               <div className="paginationContainer">
                  <Pagination
                     page={actualPage}
                     total={getTotalClients}
                     onChange={(page) => {
                        this.setState({ actualPage: page });
                     }}
                  />
               </div>
            </div>
         );
      }
   }
}
export default ListCustomers;
