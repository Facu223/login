import { Link } from "react-router-dom";
import styles from "./ListTrucks.module.css";
import api from "../../servicios/api";
import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import Backdrop from "../../Backdrop/Backdrop";
import Pagination from "../../Products/List/Pagination";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";

const ListTrucks = () => {
   const [trucks, setTrucks] = useState([]);
   const [successDeleted, setSuccesDeleted] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   const [truckId, setTruckId] = useState("");
   const [actualPage, setActualPage] = useState(1);
   const TOTAL_PER_PAGE = 2;

   let TrucksToLoad = trucks.slice(
      (actualPage - 1) * TOTAL_PER_PAGE,
      actualPage * TOTAL_PER_PAGE
   );

   const getTotalPages = () => {
      let totalTrucks = trucks.length;
      return Math.ceil(totalTrucks / TOTAL_PER_PAGE);
   };

   useEffect(() => {
      fetch(`${api}/api/camiones`)
         .then((data) => data.json())
         .then((response) => setTrucks(response.camiones));

      return () => { };
   }, [trucks]);

   const deleteTruck = (id) => {
      setOpenModal(true);
      setTruckId(id);
   };

   const confirmDelete = async () => {
      setSuccesDeleted(true);

      try {
         const response = await fetch(`${api}/api/camiones/${truckId}`, {
            method: "DELETE",
         });

         if (response.status === 204) setOpenModal(false);
      } catch (e) {
         console.log(e);
      }
   };

   return (
      <div className="card-nb">
         <div className={styles["card-header"]}>
            <Link
               to={"/dashboard/camiones/nuevo"}
               type="button"
               className={`button acept__button`}
            >
               <i className={`bi bi-plus ${styles.new__button__icon}`}></i> Agregar
            </Link>
         </div>
         <h4>Lista de camiones</h4>
         <table className="table">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Dominio</th>
                  <th>Año</th>
                  <th>N° Poliza</th>
                  <th>Vencimiento</th>
                  <th>Acciones</th>
               </tr>
            </thead>
            <tbody>
               {TrucksToLoad.length
                  ? TrucksToLoad.map((truck) => (
                     <tr key={truck.id}>
                        <td data-titulo="ID">{truck.id}</td>
                        <td data-titulo="Marca">{truck.marca}</td>
                        <td data-titulo="Modelo">{truck.modelo}</td>
                        <td data-titulo="Dominio">{truck.dominio}</td>
                        <td data-titulo="Anio">{truck.anio}</td>
                        <td data-titulo="Poliza">
                           {truck.numero_poliza ? truck.numero_poliza : "---"}
                        </td>
                        <td data-titulo="Vencimiento">
                           {truck.vencimiento_poliza
                              ? truck.vencimiento_poliza
                              : "---"}
                        </td>
                        <td>
                           <div
                              className={`${styles.button__group} ${styles.botones}`}
                           >
                              <Link
                                 to={"/dashboard/camiones/editar/" + truck.id}
                                 type="button"
                                 className={`button acept__button acept__button-table`}
                              >
                                 Ver
                              </Link>
                           </div>
                        </td>
                     </tr>
                  ))
                  : null}
            </tbody>
         </table>
         <div className="paginationContainer">
            <Pagination
               page={actualPage}
               total={getTotalPages()}
               onChange={(page) => {
                  setActualPage(page);
               }}
            />
         </div>

         {openModal && (
            <Modal>
               <DeleteModal setOpenModal={setOpenModal} deleteTruck={deleteTruck} />
            </Modal>
         )}
         {openModal && <Backdrop />}
      </div>
   );
};

export default ListTrucks;
