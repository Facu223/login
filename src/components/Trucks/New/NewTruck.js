import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../servicios/api";
import styles from "./NewTruck.module.css";

const NewTruck = () => {
   const initialState = {
      marca: "",
      modelo: "",
      dominio: "",
   };

   const [truckData, setTruckData] = useState(initialState);
   const [errors, setError] = useState({});
   const history = useHistory();

   const { marca, modelo, dominio } = truckData;

   const submitHandler = (e) => {
      e.preventDefault();

      if (Object.keys(validateInputs(truckData)).length) {
         return setError(validateInputs(truckData));
      }

      setError({});

      const truck = { marca, modelo, dominio };
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

   const validateInputs = (inputs) => {
      const keys = Object.keys(inputs);
      let errors = {};

      keys.forEach((key) => {
         if (!inputs[key]) errors[key] = `${key}__error`;
      });

      return errors;
   };

   const checkValid = (field) => {
      const value = Object.values(errors);
      if (value.indexOf(field) != -1) return true;
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
                           ? "is-invalid"
                           : "" + " form-control"
                     }
                     placeholder=""
                     aria-describedby="helpId"
                  />
                  <small id="helpId" className="invalid-feedback">
                     Ecribe la marca del camion
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
                           ? "is-invalid"
                           : "" + " form-control"
                     }
                     placeholder=""
                     aria-describedby="helpId"
                  />
                  <small id="helpId" className="invalid-feedback">
                     Ecribe el modelo del camion
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
                           ? "is-invalid"
                           : "" + " form-control"
                     }
                     placeholder=""
                     aria-describedby="helpId"
                  />
                  <small id="helpId" className="invalid-feedback">
                     Ecribe el dominio del camion
                  </small>
               </div>
               <br></br>

               <div
                  className={`${styles.button__group}`}
                  role="group"
                  aria-label=""
               >
                  <button
                     type="submit"
                     className={`${styles.add__button} button`}
                  >
                     Agregar
                  </button>
                  <Link to={"/dashboard/camiones"} className="button">
                     Cancelar
                  </Link>
               </div>
            </form>
         </div>
      </div>
   );
};

export default NewTruck;
