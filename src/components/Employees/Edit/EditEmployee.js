import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Backdrop from "../../Backdrop/Backdrop";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import api from "../../servicios/api";
import FormGroup from "../FormGroup";
import Modal from '../../Modal/Modal';

import styles from "./EditEmployee.module.css";

const EditEmployee = () => {
   const initialData = {
      id: null,
      nombre: "",
      apellido: "",
      documento: 0,
      cuil: "",
      telefono_personal: "",
      email: "",
      rol: "",
      telefono_laboral: "",
      licencia_conducir: "",
      vencimiento_licencia: "",
   };

   const { id } = useParams();
   const history = useHistory();
   const [initialState, setInitialState] = useState(initialData);
   const [errors, setErrors] = useState({});
   const [editMode, setEditMode] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   const [employeeId, setEmployeeId] = useState("");

   useEffect(() => {
      fetchEmployeInfo(id);
   }, []);

   const fetchEmployeInfo = async (id) => {
      try {
         const data = await fetch(`${api}/api/empleados/${id}`);
         const {
            empleado: {
               nombre,
               apellido,
               documento,
               cuil,
               telefono_personal,
               email,
               usuario: { rol },
               telefono_laboral,
               licencia_conducir,
               vencimiento_licencia,
            },
         } = await data.json();

         const employeeData = {
            id,
            nombre,
            apellido,
            documento,
            cuil,
            telefono_personal,
            email,
            rol,
            telefono_laboral,
            licencia_conducir,
            vencimiento_licencia,
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

   const deleteHandler = (id) => {
      setOpenModal(true);
      setEmployeeId(id);
   };

   const onDeleteHandler = async () => {
      // setSuccesDeleted(true);
      try {
         const response = await fetch(`${api}/api/empleados/${employeeId}`, {
            method: "DELETE",
         });

         if (response.status === 204) setOpenModal(false);
         history.push('/dashboard/empleados');
      } catch (e) {
         console.log(e);
      }
   };

   const {
      nombre,
      apellido,
      documento,
      cuil,
      telefono_personal,
      email,
      rol,
      telefono_laboral,
      licencia_conducir,
      vencimiento_licencia,
   } = initialState;

   return (
      <div className='card-nb'>
         <div className="card__header">
            <div className="card__title">EMPLEADO</div>
         </div>

         <div className="delete__button__container" onClick={() => { deleteHandler(id) }}>
            <span className="delete__button"><i className="fas fa-trash-alt"></i></span>
         </div>

         <form className='form' onSubmit={onSubmitHandler}>
            <FormGroup
               labelClass={"form__label"}
               labelName={"Nombre"}
               inputClass={"form__input"}
               inputType={"text"}
               inputName={"nombre"}
               inputValue={nombre}
               disabledOp={!editMode}
               onChangeHandler={onChangeHandler}
               checkValid={checkValid}
               errors={errors}
            />

            <FormGroup
               labelClass={"form__label"}
               labelName={"Apellido"}
               inputClass={"form__input"}
               inputType={"text"}
               inputName={"apellido"}
               inputValue={apellido}
               disabledOp={!editMode}
               onChangeHandler={onChangeHandler}
               checkValid={checkValid}
               errors={errors}
            />

            <div className="row-nb">
               <FormGroup
                  labelClass={"form__label"}
                  labelName={"N° de Documento"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"documento"}
                  inputValue={documento}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />

               <FormGroup
                  labelClass={"form__label"}
                  labelName={"N° de Cuil"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"cuil"}
                  inputValue={cuil}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
            </div>

            <div className={"row-nb"}>
               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Telefono Personal"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"telefono_personal"}
                  inputValue={telefono_personal}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />

               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Email"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"email"}
                  inputValue={email}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
            </div>

            <div className={"row-nb"}>
               <div className="form__group">
                  <label className="form__label">Rol: </label>
                  <select
                     className={`${styles.form__select} ${editMode ? styles.form__input__edit : ""
                        } ${checkValid(errors.rol) ? "is-invalid" : ""}`}
                     name="rol"
                     value={rol}
                     onChange={onChangeHandler}
                     disabled={!editMode}
                  >
                     <option value="">--Seleccionar--</option>
                     <option value="admin">Administrador</option>
                     <option value="repartidor">Repartidor</option>
                  </select>
                  <small id="helpId" className="invalid-feedback">
                     Debes seleccionar un rol
                  </small>
               </div>

               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Telefono Laboral"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"telefono_laboral"}
                  inputValue={telefono_laboral}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
            </div>

            <div className="row-nb">
               <div className="form__group">
                  <label className="form__label">Licencia de conducir:</label>
                  <select
                     className={`${styles.form__select} ${editMode ? styles.form__input__edit : ""
                        } ${checkValid(errors.licencia_conducir) ? "is-invalid" : ""
                        }`}
                     name="licencia_conducir"
                     value={licencia_conducir}
                     onChange={onChangeHandler}
                     disabled={!editMode}
                  >
                     <option value="">--Seleccionar--</option>
                     <option value="A1">A1 - Moto</option>
                     <option value="B1">B1 - Auto y utilitarios</option>
                     <option value="B2">
                        B2 - Auto y utilitarios + acoplado
                     </option>
                     <option value="C1">C1 - Camiones sin acoplado</option>
                     <option value="D1">D1 - Transporte de pasajeros</option>
                     <option value="E1">
                        E1 - Camiones articulados o con acoplado
                     </option>
                     <option value="E3">E1 - Cargas Peligrosas</option>
                  </select>
                  <small id="helpId" className="invalid-feedback">
                     Debes seleccionar un tipo de licencia de conducir
                  </small>
               </div>

               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Vecimiento de la Licencia"}
                  inputClass={"form__input"}
                  inputType={"date"}
                  inputName={"vencimiento_licencia"}
                  inputValue={vencimiento_licencia}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
            </div>

            <div className={"button button__group"}>
               {!editMode && (
                  <button
                     className="button acept__button"
                     type="button"
                     onClick={() => {
                        setEditMode(true);
                     }}
                  >
                     <i class="far fa-edit"></i> Editar
                  </button>
               )}

               {!editMode && (
                  <Link
                     className="button cancel__button"
                     to={"/dashboard/empleados"}
                  >
                     Cancelar
                  </Link>
               )}

               {editMode && (
                  <button className="button acept__button" type="submit">
                     Actualizar
                  </button>
               )}

               {editMode && (
                  <button
                     className="button cancel__button"
                     type="button"
                     onClick={() => setEditMode(false)}
                  >
                     Cancelar
                  </button>
               )}
            </div>
         </form>
         {openModal && (
            <Modal>
               <DeleteModal
                  setOpenModal={setOpenModal}
                  deleteHandler={onDeleteHandler}
                  modalContent={{ title: 'Eliminar empleado', message: '¿Estas seguro que quiere eliminar el empleado?' }}
               />
            </Modal>
         )}
         {openModal && <Backdrop />}
      </div>
   );
};

export default EditEmployee;
