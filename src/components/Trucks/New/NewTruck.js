import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../servicios/api";
import styles from "./NewTruck.module.css";

const NewTruck = () => {
   const initialState = {
      marca: "",
      modelo: "",
      dominio: "",
      anio: 0,
      numero_poliza: "",
   };

   const [truckData, setTruckData] = useState(initialState);
   const [errors, setError] = useState({});
   const history = useHistory();

   const { marca, modelo, dominio, anio, numero_poliza } = truckData;

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
         dominio,
         anio: Number(anio),
         numero_poliza,
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
      <div className={styles.card}>
         <div className="card-header">Nuevo Camion</div>
         <div className="card-body">
            <form onSubmit={submitHandler}>
               <div className="form-group">
                  <label htmlFor="">Marca:</label>
                  <input
                     onChange={onChangeHandler}
                     value={marca}
                     type="text"
                     name="marca"
                     id="marca"
                     className={
                        checkValid(errors.marca)
                           ? "is-invalid form-control"
                           : " form-control"
                     }
                     placeholder=""
                     aria-describedby="helpId"
                  />
                  <small id="helpId" className="invalid-feedback">
                     Escribe la marca del camion
                  </small>
               </div>
               <br></br>

               <div className="form-group">
                  <label htmlFor="">Modelo:</label>
                  <input
                     onChange={onChangeHandler}
                     value={modelo}
                     type="text"
                     name="modelo"
                     id="modelo"
                     className={
                        checkValid(errors.modelo)
                           ? "is-invalid form-control"
                           : " form-control"
                     }
                     placeholder=""
                     aria-describedby="helpId"
                  />
                  <small id="helpId" className="invalid-feedback">
                     Escribe el modelo del camion
                  </small>
               </div>
               <br></br>

               <div className="form-group">
                  <label htmlFor="">Dominio:</label>
                  <input
                     onChange={onChangeHandler}
                     value={dominio}
                     type="text"
                     name="dominio"
                     id="dominio"
                     className={
                        checkValid(errors.dominio)
                           ? "is-invalid form-control"
                           : " form-control"
                     }
                     placeholder=""
                     aria-describedby="helpId"
                  />
                  <small id="helpId" className="invalid-feedback">
                     Escribe el dominio del camion
                  </small>
               </div>

               <br></br>

               <div className="form-group">
                  <label htmlFor="">Año:</label>
                  <select
                     value={anio}
                     name="anio"
                     id="anio"
                     onChange={onChangeHandler}
                     className={
                        checkValid(errors.anio)
                           ? "is-invalid form-select"
                           : `form-select`
                     }
                  >
                     <option>2010</option>
                     <option>2011</option>
                     <option>2012</option>
                     <option>2013</option>
                     <option>2014</option>
                     <option>2015</option>
                     <option>2016</option>
                     <option>2017</option>
                     <option>2018</option>
                     <option>2019</option>
                     <option>2020</option>
                     <option>2021</option>
                  </select>
                  <small id="helpId" className="invalid-feedback">
                     Escribe el año del camion
                  </small>
               </div>
               <br></br>
               <div className="form-group">
                  <label htmlFor="">N° Poliza:</label>
                  <input
                     onChange={onChangeHandler}
                     value={numero_poliza}
                     type="text"
                     name="numero_poliza"
                     id="numero_poliza"
                     className={
                        checkValid(errors.numero_poliza)
                           ? "is-invalid form-control"
                           : " form-control"
                     }
                     placeholder=""
                     aria-describedby="helpId"
                  />
                  <small id="helpId" className="invalid-feedback">
                     Escribe el N° poliza del camion
                  </small>
               </div>
               <br></br>

               <div className={`button__group`} role="group" aria-label="">
                  <button
                     type="submit"
                     className={`${styles.add__button} button`}
                  >
                     Agregar
                  </button>
                  <Link
                     to={"/dashboard/camiones"}
                     className="button cancel__button"
                  >
                     Cancelar
                  </Link>
               </div>
            </form>
         </div>
      </div>
   );
};

export default NewTruck;
