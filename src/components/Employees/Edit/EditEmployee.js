import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import api from "../../servicios/api";

import styles from "./EditEmployee.module.css";

const EditEmployee = () => {
   const initialData = {
      nombre: "",
      apellido: "",
      documento: 0,
      cuil: "",
      telefono: "",
      rol: "",
   };

   const { id } = useParams();
   const history = useHistory();
   const [initialState, setInitialState] = useState(initialData);
   const [errors, setErrors] = useState({});

   useEffect(() => {
      fetchEmployeInfo(id);
   }, []);

   const fetchEmployeInfo = async (id) => {
      try {
         const data = await fetch(`${api}/api/empleados/${id}`);
         const response = await data.json();

         const employeeData = {
            nombre: response.empleado.nombre,
            apellido: response.empleado.apellido,
            documento: response.empleado.documento,
            cuil: response.empleado.cuil,
            telefono: response.empleado.telefono,
            rol: response.empleado.usuario.rol,
         };

         setInitialState(employeeData);
      } catch (e) {
         console.log(e);
      }
   };

   const onChangeHandler = (e) => {
      setInitialState((prevState) => {
         return { ...prevState, [e.target.name]: e.target.value };
      });
   };

   const onSubmitHandler = (e) => {
      e.preventDefault();
      const requiredFields = [
         "nombre",
         "apellido",
         "documento",
         "cuil",
         "telefono",
         "rol",
      ];

      if (Object.keys(validateInputs(initialState, requiredFields)).length) {
         return setErrors(validateInputs(initialState, requiredFields));
      }

      setErrors({});

      updateEmployee(initialState, id);
   };

   const updateEmployee = async (data, id) => {
      try {
         const response = await fetch(`${api}/api/empleados/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
               "Content-type": "application/json",
            },
         });

         if (response.status === 200)
            return history.push("/dashboard/empleados");
      } catch (e) {
         console.log(e);
      }
   };

   const validateInputs = (inputs, requiredFields) => {
      const keyInputs = Object.keys(inputs);
      const errors = {};

      keyInputs.forEach((input) => {
         if (!inputs[input] && requiredFields.includes(input)) {
            errors[input] = `${input}__error`;
         }
      });

      return errors;
   };

   const checkValid = (field) => {
      const value = Object.values(errors);
      if (value.indexOf(field) !== -1) return true;
      return false;
   };

   const { nombre, apellido, documento, cuil, telefono, rol } = initialState;

   return (
      <div className={styles.card}>
         <div className={styles.card__header}>
            <h1 className={styles.card__title}>Editar empleado</h1>
         </div>

         <form className={styles.form} onSubmit={onSubmitHandler}>
            <div className={styles.row}>
               <div className={styles.form__group}>
                  <label className={styles.form__label}>Nombre:</label>
                  <input
                     className={`${styles.form__input} ${
                        checkValid(errors.nombre) ? "is-invalid" : ""
                     }`}
                     type="text"
                     name="nombre"
                     placeholder="Ingrese un nombre"
                     value={nombre}
                     onChange={onChangeHandler}
                  />
                  <small id="helpId" className="invalid-feedback">
                     Debes ingresar un nombre
                  </small>
               </div>
               <div className={styles.form__group}>
                  <label className={styles.form__label}>Apellido:</label>
                  <input
                     className={`${styles.form__input} ${
                        checkValid(errors.apellido) ? "is-invalid" : ""
                     }`}
                     type="text"
                     name="apellido"
                     placeholder="Ingrese un apellido"
                     value={apellido}
                     onChange={onChangeHandler}
                  />
                  <small id="helpId" className="invalid-feedback">
                     Debes ingresar un apellido
                  </small>
               </div>
            </div>

            <div className={styles.row}>
               <div className={styles.form__group}>
                  <label className={styles.form__label}>N° de Documento:</label>
                  <input
                     className={`${styles.form__input} ${
                        checkValid(errors.documento) ? "is-invalid" : ""
                     }`}
                     type="text"
                     name="documento"
                     placeholder="Ingrese un documento"
                     value={documento}
                     onChange={onChangeHandler}
                  />
                  <small id="helpId" className="invalid-feedback">
                     Debes ingresar un documento
                  </small>
               </div>
               <div className={styles.form__group}>
                  <label className={styles.form__label}>N° de Cuil:</label>
                  <input
                     className={`${styles.form__input} ${
                        checkValid(errors.cuil) ? "is-invalid" : ""
                     }`}
                     type="text"
                     name="cuil"
                     placeholder="Ingrese un cuil"
                     value={cuil}
                     onChange={onChangeHandler}
                  />
                  <small id="helpId" className="invalid-feedback">
                     Debes ingresar un cuil
                  </small>
               </div>
            </div>

            <div className={styles.row}>
               <div className={styles.form__group}>
                  <label className={styles.form__label}>Telefono</label>
                  <input
                     className={`${styles.form__input} ${
                        checkValid(errors.telefono) ? "is-invalid" : ""
                     }`}
                     type="text"
                     name="telefono"
                     placeholder="Ingrese un telefono"
                     value={telefono}
                     onChange={onChangeHandler}
                  />
                  <small id="helpId" className="invalid-feedback">
                     Debes ingresar un telefono
                  </small>
               </div>
               <div className={styles.form__group}>
                  <label className={styles.form__label}>Rol</label>
                  <select
                     className={`${styles.form__select} ${
                        checkValid(errors.rol) ? "is-invalid" : ""
                     }`}
                     name="rol"
                     value={rol}
                     onChange={onChangeHandler}
                  >
                     <option value="">--Seleccionar--</option>
                     <option value="admin">Administrador</option>
                     <option value="repartidor">Repartidor</option>
                  </select>
                  <small id="helpId" className="invalid-feedback">
                     Debes seleccionar un rol
                  </small>
               </div>
            </div>

            <div className={"button button__group"}>
               <button className="button acept__button">Actualizar</button>
               <Link
                  className="button cancel__button"
                  to={"/dashboard/empleados"}
               >
                  Cancelar
               </Link>
            </div>
         </form>
      </div>
   );
};

export default EditEmployee;
