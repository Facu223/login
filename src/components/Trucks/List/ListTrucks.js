import { Link } from "react-router-dom";
import styles from "./ListTrucks.module.css";
import api from "../../servicios/api";
import { useEffect, useState } from "react";

const ListTrucks = () => {
   const [trucks, setTrucks] = useState([]);

   useEffect(() => {
      fetch(`${api}/api/camiones`)
         .then((data) => data.json())
         .then((response) => setTrucks(response.camiones));
   }, []);

   return (
      <div className={`${styles.card2}`}>
         <div className="card-body card3">
            <div className={styles["card-header"]}>
               <Link
                  to={"/dashboard/camiones/nuevo"}
                  type="button"
                  className={`button ${styles.new__button}`}
               >
                  <i className={`bi bi-plus ${styles.new__button__icon}`}></i>{" "}
                  Agregar
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
                     <th>Acciones</th>
                  </tr>
               </thead>
               <tbody>
                  {trucks.length
                     ? trucks.map((truck) => (
                          <tr key={truck.id}>
                             <td data-titulo="ID">{truck.id}</td>
                             <td data-titulo="Marca">{truck.marca}</td>
                             <td data-titulo="Modelo">{truck.modelo}</td>
                             <td data-titulo="Dominio">{truck.dominio}</td>
                             <td data-titulo="Dominio">{truck.anio}</td>
                             <td data-titulo="Dominio">
                                {truck.numero_poliza}
                             </td>
                             <td>
                                <div
                                   className={`${styles.button__group} ${styles.botones}`}
                                >
                                   <Link
                                      to={
                                         "/dashboard/camiones/editar/" +
                                         truck.id
                                      }
                                      type="button"
                                      // className="btn btn-warning padding-button"
                                      className={`button ${styles.edit__button}`}
                                   >
                                      Editar
                                   </Link>
                                   <button
                                      onClick={() =>
                                         this.borrarRegistros(truck.id)
                                      }
                                      type="button"
                                      className={`${styles.delete__button} button`}
                                   >
                                      Borrar
                                   </button>
                                </div>
                             </td>
                          </tr>
                       ))
                     : null}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default ListTrucks;
