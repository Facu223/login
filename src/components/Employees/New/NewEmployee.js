import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../servicios/api";
import { Redirect, useHistory } from "react-router-dom";
import styles from "./NewEmployee.module.css";
import FormGroup from "../FormGroup";

const NewEmployee = () => {
   const initialState = {
      nombre: "",
      apellido: "",
      documento: "",
      cuil: "",
      telefono: "",
      usuario: "",
      contraseña: "",
      rol: "",
      telefono_personal: "",
      telefono_laboral: "",
      email: "",
      licencia_conducir: "",
      vencimiento_licencia: "",
   };

   /* ESTADOS */
   const [newEmployeeData, setNewEmployeeData] = useState(initialState);
   const [errors, setErrors] = useState({});
   const history = useHistory();

   /* HANDLERS */
   const onChangeHandler = (e) => {
      setNewEmployeeData((prevState) => {
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
         "telefono_personal",
         "usuario",
         "contraseña",
         "rol",
      ];

      if (Object.keys(validateInputs(newEmployeeData, requiredFields)).length) {
         return setErrors(validateInputs(newEmployeeData, requiredFields));
      }

      setErrors({});

      sendHttpRequest();
   };

   /* HTTP REQUEST */
   const sendHttpRequest = async () => {
      const data = await fetch(`${api}/api/usuarios/admin/signup`, {
         method: "POST",
         body: JSON.stringify(newEmployeeData),
         headers: {
            "Content-Type": "application/json",
         },
      });

      if (data.status === 201) {
         return history.push("/dashboard/empleados");
      }
   };

   /* VALIDATORS */
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

   const {
      nombre,
      apellido,
      documento,
      cuil,
      telefono_personal,
      telefono_laboral,
      email,
      licencia_conducir,
      vencimiento_licencia,
      usuario,
      contraseña,
      rol,
   } = newEmployeeData;

   return (
      <div className="card-nb">
         <div>Nuevo Empleado</div>
         <form onSubmit={onSubmitHandler}>
            <FormGroup
               labelClass={"form__label"}
               labelName={"Nombre"}
               inputClass={"form__input"}
               inputType={"text"}
               inputName={"nombre"}
               inputValue={nombre}
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
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
            </div>

            <div className="row-nb row-nb-3">
               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Telefono Personal"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"telefono_personal"}
                  inputValue={telefono_personal}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />

               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Telefono Laboral"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"telefono_laboral"}
                  inputValue={telefono_laboral}
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
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
            </div>

            <div className="row-nb">
               <div className="form__group">
                  <label className="form__label">Licencia de conducir:</label>
                  <select
                     className={` form__select ${"form__input__edit"} ${
                        checkValid(errors.licencia_conducir) ? "is-invalid" : ""
                     }`}
                     name="licencia_conducir"
                     value={licencia_conducir}
                     onChange={onChangeHandler}
                  >
                     <option value="">--Seleccionar--</option>
                     <option value="admin">A1</option>
                     <option value="repartidor">A2</option>
                     <option value="repartidor">B1</option>
                     <option value="repartidor">B2</option>
                     <option value="repartidor">C1</option>
                  </select>
                  <small id="helpId" className="invalid-feedback">
                     Debes seleccionar un tipo de licencia de conducir
                  </small>
               </div>

               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Vencimiento Licencia"}
                  inputClass={"form__input"}
                  inputType={"date"}
                  inputName={"vencimiento_licencia"}
                  inputValue={vencimiento_licencia}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
            </div>

            <div className="row-nb row-nb-3">
               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Usuario"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"usuario"}
                  inputValue={usuario}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />

               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Contraseña"}
                  inputClass={"form__input"}
                  inputType={"password"}
                  inputName={"contraseña"}
                  inputValue={contraseña}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />

               <div className="form__group">
                  <label className="form__label">Rol:</label>
                  <select
                     onChange={onChangeHandler}
                     value={rol}
                     name="rol"
                     id="rol"
                     className={`form__select form__input__edit ${
                        checkValid(errors.rol) ? "is-invalid " : ""
                     }`}
                     placeholder=""
                     aria-describedby="helpId"
                  >
                     <option value="">--Selecciona--</option>
                     <option value="admin">Administrador</option>
                     <option value="repartidor">Repartidor</option>
                  </select>
                  <small id="helpId" className="invalid-feedback">
                     Escribe una rol por defecto para el empleado
                  </small>
               </div>
            </div>

            <div className="button__group">
               <button className="button acept__button">Aceptar</button>
               <Link
                  to="/dashboard/empleados"
                  className="button cancel__button"
               >
                  Cancelar
               </Link>
            </div>
         </form>
      </div>
   );
};

export default NewEmployee;
