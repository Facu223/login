import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../servicios/api";
import FormGroup from "../../Employees/FormGroup";
import styles from "./EditTruck.module.css";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import Backdrop from "../../Backdrop/Backdrop";
import Modal from '../../Modal/Modal';

const EditTruck = () => {
   const initialState = {
      marca: "",
      modelo: "",
      tipo: "",
      dominio: "",
      anio: 0,
      numero_motor: "",
      numero_chasis: "",
      compania_seguro: "",
      numero_poliza: "",
      vencimiento_poliza: "",
   };

   const params = useParams();
   const history = useHistory();
   const [truckData, setTruckData] = useState(initialState);
   const [errors, setError] = useState({});
   const [editMode, setEditMode] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   const [truckId, setTruckId] = useState("");

   useEffect(() => {
      fetch(api + `/api/camiones/${params.id}`)
         .then((data) => data.json())
         .then((response) => {
            setTruckData(response.truck);
         });
   }, []);

   /* HANDLERS */

   const onChangeHandler = (e) => {
      setTruckData((prevState) => {
         return { ...prevState, [e.target.name]: e.target.value };
      });
   };
   const {
      marca,
      modelo,
      tipo,
      dominio,
      anio,
      numero_motor,
      numero_chasis,
      compania_seguro,
      numero_poliza,
      vencimiento_poliza,
   } = truckData;

   const submitHandler = (e) => {
      e.preventDefault();
      const requiredFields = [
         "marca",
         "modelo",
         "tipo",
         "dominio",
         "anio",
         "numero_motor",
         "numero_chasis",
      ];

      if (Object.keys(validateInputs(truckData, requiredFields)).length) {
         return setError(validateInputs(truckData, requiredFields));
      }

      setError({});

      const updatedTruck = {
         marca,
         modelo,
         tipo,
         dominio,
         anio: +anio,
         numero_motor,
         numero_chasis,
         compania_seguro,
         numero_poliza,
         vencimiento_poliza,
      };

      sendHttpRequest(updatedTruck, `${api}/api/camiones/${params.id}`);
   };

   const sendHttpRequest = (truck, url) => {
      try {
         fetch(url, {
            method: "PATCH",
            body: JSON.stringify(truck),
            headers: {
               "Content-Type": "application/json",
            },
         })
            .then((data) => data.json())
            .then((response) => {
               if (response.status === "OK") {
                  history.push("/dashboard/camiones");
               }
            });
      } catch (e) {
         console.log(e);
      }
   };

   /* VALIDATORS */
   const validateInputs = (inputs, requiredFields) => {
      const keys = Object.keys(inputs);
      let errors = {};

      keys.forEach((key) => {
         if (!inputs[key] && requiredFields.includes(key))
            errors[key] = `${key}__error`;
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
      setTruckId(id);
   };

   const onDeleteHandler = async () => {
      // setSuccesDeleted(true);

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

         <div className="card__header">
            <div className="card__title">CAMION</div>
         </div>

         <div className="delete__button__container" onClick={deleteHandler}>
            <span className="delete__button"><i class="fas fa-trash-alt"></i></span>
         </div>

         <form onSubmit={submitHandler} className="form">
            <div className="row-nb">
               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Marca"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"marca"}
                  inputValue={marca}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />

               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Modelo"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"modelo"}
                  inputValue={modelo}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
            </div>

            <div className="row-nb">
               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Tipo"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"tipo"}
                  inputValue={tipo}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Dominio"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"dominio"}
                  inputValue={dominio}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
            </div>

            <div className="row-nb row-nb-3">
               <div className="form__group">
                  <label className={`form__label`}>Año:</label>
                  <select
                     value={anio}
                     name="anio"
                     onChange={onChangeHandler}
                     disabled={!editMode}
                     className={`${editMode ? "form__input__edit" : ""} ${checkValid(errors.anio)
                        ? "is-invalid form__select"
                        : `form__select`
                        }`}
                  >
                     <option value="">--Seleccionar--</option>
                     <option value="2021">2021</option>
                     <option value="2020">2020</option>
                     <option value="2019">2019</option>
                     <option value="2018">2018</option>
                     <option value="2017">2017</option>
                     <option value="2016">2016</option>
                     <option value="2015">2015</option>
                     <option value="2014">2014</option>
                     <option value="2013">2013</option>
                     <option value="2012">2012</option>
                     <option value="2011">2011</option>
                     <option value="2010">2010</option>
                  </select>
                  <small id="helpId" className="invalid-feedback">
                     Escribe el año del camion
                  </small>
               </div>

               <FormGroup
                  labelClass={"form__label"}
                  labelName={"N° Motor"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"numero_motor"}
                  inputValue={numero_motor}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />

               <FormGroup
                  labelClass={"form__label"}
                  labelName={"N° Chasis"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"numero_chasis"}
                  inputValue={numero_chasis}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
            </div>

            <div className="row-nb row-nb-3">
               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Compañia de Seguro"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"compania_seguro"}
                  inputValue={compania_seguro}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
               <FormGroup
                  labelClass={"form__label"}
                  labelName={"N° Poliza"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"numero_poliza"}
                  inputValue={numero_poliza}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Vencimiento de Poliza"}
                  inputClass={"form__input"}
                  inputType={"date"}
                  inputName={"vencimiento_poliza"}
                  inputValue={vencimiento_poliza}
                  disabledOp={!editMode}
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
            </div>

            <div className="button__group">
               {!editMode && (
                  <button
                     className="button acept__button"
                     onClick={() => {
                        setEditMode(true);
                     }}
                  >
                     <i className="far fa-edit"></i> Editar
                  </button>
               )}

               {editMode && (
                  <button type="submit" className={`button acept__button`}>
                     Actualizar
                  </button>
               )}

               {editMode && (
                  <button
                     className="button cancel__button"
                     onClick={() => {
                        setEditMode(false);
                        setError({});
                     }}
                  >
                     Cancelar
                  </button>
               )}

               {!editMode && (
                  <Link
                     to={"/dashboard/camiones"}
                     className={`button cancel__button`}
                  >
                     Cancelar
                  </Link>
               )}
            </div>
         </form>
         {openModal && (
            <Modal>
               <DeleteModal
                  setOpenModal={setOpenModal}
                  deleteHandler={onDeleteHandler}
                  modalContent={{ title: 'Eliminar camion', message: '¿Estas seguro que quiere eliminar el camion?' }}
               />
            </Modal>
         )}
         {openModal && <Backdrop />}
      </div>
   );
};

export default EditTruck;
