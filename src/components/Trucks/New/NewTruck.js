import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../servicios/api";
// import styles from "./NewTruck.module.css";
import FormGroup from "../../Employees/FormGroup";

const NewTruck = () => {
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

   const [truckData, setTruckData] = useState(initialState);
   const [errors, setError] = useState({});
   const history = useHistory();

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
      const requiredFields = ["marca", "modelo", "dominio", "anio"];

      if (Object.keys(validateInputs(truckData, requiredFields)).length) {
         return setError(validateInputs(truckData, requiredFields));
      }

      setError({});

      const truck = {
         marca,
         modelo,
         tipo,
         dominio,
         anio: Number(anio),
         numero_motor,
         numero_chasis,
         compania_seguro,
         numero_poliza,
         vencimiento_poliza,
      };
      const url = `${api}/api/camiones/`;

      console.log(truck);

      sedHttpRequest(truck, url);
   };

   const sedHttpRequest = (truck, url) => {
      fetch(url, {
         method: "POST",
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
   };

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

   const onChangeHandler = (e) => {
      e.preventDefault();

      setTruckData((state) => {
         return { ...state, [e.target.name]: e.target.value };
      });
   };

   return (
      <div className={`card-nb`}>
         {/* <div className="card-header">Nuevo Camion</div> */}
         {/* <div className="card-body"> */}

         <form onSubmit={submitHandler} className="form">
            <div className="row-nb">
               <FormGroup
                  labelClass={"form__label"}
                  labelName={"Marca"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"marca"}
                  inputValue={marca}
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
                     className={`${"form__input__edit"} ${checkValid(errors.anio)
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
                     Debes ingresar el año del camion
                  </small>
               </div>

               <FormGroup
                  labelClass={"form__label"}
                  labelName={"N° Motor"}
                  inputClass={"form__input"}
                  inputType={"text"}
                  inputName={"numero_motor"}
                  inputValue={numero_motor}
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
                  onChangeHandler={onChangeHandler}
                  checkValid={checkValid}
                  errors={errors}
               />
            </div>

            <div className="button__group">
               <button className="button acept__button">Guardar</button>

               <Link
                  to={"/dashboard/camiones"}
                  className={`button cancel__button`}
               >
                  Cancelar
               </Link>
            </div>
         </form>
      </div>
   );
};

export default NewTruck;
