import React from "react";
import { Link } from "react-router-dom";
import api from "../../servicios/api";
import styles from "./ListEmployees.module.css";
import Modal from "../../Modals/Modal";

class ListEmployees extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         datosCargados: false,
         empleados: [],
         isOpen: false,

      };
   }

   borrarRegistros = (id) => {
      if (window.confirm("¿Estás seguro?"))
         fetch(api + "/api/empleados/" + id, {
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
      fetch(api + "/api/empleados")
         .then((respuesta) => respuesta.json())
         .then((datosRespuesta) => {
            console.log(datosRespuesta);
            this.setState({
               datosCargados: true,
               empleados: datosRespuesta.empleados,
            });
         })
         .catch(console.log);
   }

   componentDidMount() {
      this.cargarDatos();
   }

    

   render() {
      const { datosCargados, empleados } = this.state;

      return (
         <div className={`${styles.card2}`}>
            <div className="card-body card3">
               <div className={styles["card-header"]}>
                  <Link
                     to={"/dashboard/empleados/nuevo"}
                     type="button"
                     className={`button acept__button`}
                  >
                     <i
                        className={`bi bi-plus ${styles.new__button__icon}`}
                     ></i>
                     Agregar
                  </Link>

               </div>
               <h4>Lista de empleados</h4>
               <table className="table">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Telefono Personal</th>
                        <th>Telefono Laboral</th>
                        <th>Rol</th>
                        <th>Licencia</th>
                        <th>Vencimiento Licencia</th>
                        <th>Acciones</th>
                     </tr>
                  </thead>
                  <tbody>
                     {empleados.map((empleado) => (
                        <tr key={empleado.id}>
                           <td data-titulo="ID">{empleado.id}</td>
                           <td data-titulo="Nombre">{empleado.nombre}</td>
                           <td data-titulo="Apellido">{empleado.apellido}</td>
                           <td data-titulo="DNI">{empleado.documento}</td>
                           <td data-titulo="Telefono Personal">
                              {empleado.telefono_personal}
                           </td>
                           <td data-titulo="Teléfono Laboral">
                              {empleado.telefono_laboral}
                           </td>
                           <td data-titulo="Rol">{empleado.usuario.rol}</td>
                           <td data-titulo="Licencia">
                              {empleado.licencia_conducir}
                           </td>
                           <td data-titulo="Vencimiento Licencia">
                              {empleado.vencimiento_licencia
                                 ? empleado.vencimiento_licencia
                                 : "-"}
                           </td>
                           <td>
                              <div
                                 className={`${styles.button__group} ${styles.botones}`}
                              >
                                 <Link
                                    to={`/dashboard/empleados/editar/${empleado.id}`}
                                    className={`button ${styles.edit__button}`}
                                 >
                                    {/* <i className="far fa-edit"></i> */}
                                    Ver
                                 </Link>
                                 {/* <button
                                    onClick={() =>
                                       this.borrarRegistros(empleado.id)
                                    }
                                    className={`${styles.delete__button} button`}
                                 >
                                    <i className="far fa-trash-alt"></i>
                                 </button> */}
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      );
   }
}

export default ListEmployees;
