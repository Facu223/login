import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import api from "../../servicios/api";

import styles from "./EditTruck.module.css";

const EditTruck = () => {
   const initialState = {
      id: "",
      marca: "",
      modelo: "",
      dominio: "",
      anio: 0,
      numero_poliza: "",
   };

   const params = useParams();
   const history = useHistory();
   const [truckData, setTruckData] = useState(initialState);
   const [errors, setError] = useState({});

   useEffect(() => {
      fetch(api + `/api/camiones/${params.id}`)
         .then((data) => data.json())
         .then((response) => {
            setTruckData(response.truck);
         });
   }, []);

   const onChangeHandler = (e) => {
      setTruckData((prevState) => {
         return { ...prevState, [e.target.name]: e.target.value };
      });
   };
   const { marca, modelo, dominio, anio, numero_poliza, id } = truckData;

   const submitHandler = (e) => {
      e.preventDefault();
      const requiredFields = ["marca", "modelo", "dominio", "anio"];

      if (Object.keys(validateInputs(truckData, requiredFields)).length) {
         return setError(validateInputs(truckData, requiredFields));
      }

      setError({});

      const updatedTruck = {
         id,
         marca,
         modelo,
         dominio,
         anio: +anio,
         numero_poliza,
      };

      sendHttpRequest(updatedTruck, `${api}/api/camiones/${id}`);
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

   return (
      <div className={styles.card}>
         <div className="card-header">Editar camion</div>
         <div className="card-body">
            <form onSubmit={submitHandler}>
               <div className="form-group">
                  <label htmlFor="">Id: </label>
                  <input
                     type="text"
                     readOnly
                     className="form-control"
                     name="id"
                     id="id"
                     value={id}
                     aria-describedby="helpId"
                     placeholder=""
                  />
                  <small id="helpId" className="form-text text-muted">
                     Clave
                  </small>
               </div>
               <div className="form-group">
                  <label htmlFor="">Marca:</label>
                  <input
                     onChange={onChangeHandler}
                     value={marca}
                     type="text"
                     name="marca"
                     id="marca"
                     placeholder=""
                     aria-describedby="helpId"
                     className={
                        checkValid(errors.marca)
                           ? "is-invalid form-control"
                           : " form-control"
                     }
                  />
                  <small id="helpId" className="invalid-feedback">
                     Debes ingresar una marca
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
                     placeholder=""
                     aria-describedby="helpId"
                     className={
                        checkValid(errors.modelo)
                           ? "is-invalid form-control"
                           : " form-control"
                     }
                  />
                  <small id="helpId" className="invalid-feedback">
                     Debes ingresar el modelo del camion
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
                     placeholder=""
                     aria-describedby="helpId"
                     className={
                        checkValid(errors.dominio)
                           ? "is-invalid form-control"
                           : " form-control"
                     }
                  />
                  <small id="helpId" className="invalid-feedback">
                     Debes ingresar el dominio del camion
                  </small>
               </div>
               <br></br>

               {/* <div className="form-group">
                  <label htmlFor="">Año</label>
                  <input
                     onChange={onChangeHandler}
                     value={anio}
                     type="text"
                     name="anio"
                     id="anio"
                     placeholder=""
                     aria-describedby="helpId"
                     className={
                        checkValid(errors.anio)
                           ? "is-invalid form-control"
                           : " form-control"
                     }
                  />
                  <small id="helpId" className="invalid-feedback">
                     Debes ingresar el año del camion
                  </small>
               </div> */}

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
                  <label htmlFor="">Numero de poliza:</label>
                  <input
                     onChange={onChangeHandler}
                     value={numero_poliza}
                     type="text"
                     name="numero_poliza"
                     id="numero_poliza"
                     placeholder=""
                     aria-describedby="helpId"
                     className="form-control"
                  />
                  <small id="helpId" className="invalid-feedback">
                     Debes ingresar el numero de poliza del seguro
                  </small>
               </div>
               <br></br>

               <br></br>

               <div className="button__group" role="group" aria-label="">
                  <button type="submit" className={`button acept__button`}>
                     Actualizar
                  </button>
                  <Link
                     to={"/dashboard/camiones"}
                     className={`button cancel__button`}
                  >
                     Cancelar
                  </Link>
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditTruck;
