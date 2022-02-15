import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../servicios/api";
import { useHistory } from "react-router-dom";
// import styles from "./NewEmployee.module.css";
import FormGroup from "../../Employees/FormGroup";
import { useEffect } from "react";
import PlanillaItems from "./PlanillaItems/PlanillaItems";
import PlanillaCarga from "../PlanillaCarga/PlanillaCarga";

const NewPlanilla = () => {
  const initialState = {
    caja_inicial: 0,
    fecha: "",
    repartidor_id: 0,
    camion: "",
    carga_inicial: [],
  };

  /* ESTADOS */
  const [newPlanilla, setNewPlanilla] = useState(initialState);
  const [repartidores, setRepartidores] = useState([]);
  const [camiones, setCamiones] = useState([]);
  const [errors, setErrors] = useState({});
  const [carga_inicial, setOderDetail] = useState(initialState.carga_inicial);
  const history = useHistory();

  /* HANDLERS */
  const onChangeHandler = (e) => {
    setNewPlanilla((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onChangeHandlerCharge = () => {
    setNewPlanilla({ ...newPlanilla, carga_inicial });
  };

  useEffect(() => {
    onChangeHandlerCharge();
  }, [carga_inicial]);

  //const onChangeHandlerCarga = (e) => {
  //setNewPlanilla((carga_inicial) => {
  //return {...carga_inicial, carga_inicial: {
  //[e.traget.name]: e.target.value
  //}}
  //});
  //};

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const requiredFields = ["caja_inicial", "camion", "fecha", "repartidor_id"];

    if (Object.keys(validateInputs(newPlanilla, requiredFields)).length) {
      return setErrors(validateInputs(newPlanilla, requiredFields));
    }

    setErrors({});
    cargarDatos();
  };

  /* HTTP REQUEST */
  const cargarDatos = async () => {
    carga_inicial.forEach((el) => {
      delete el.descripcion;
      delete el.producto;
    });

    const data = await fetch(`${api}/api/planillas/`, {
      method: "POST",
      body: JSON.stringify(newPlanilla),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.status === 201) {
      return history.push("/dashboard/planillas");
    }
  };

  const getRepartidores = async () => {
    const data = await fetch(`${api}/api/empleados/`);
    const empleados = await data.json();
    const employees = empleados.empleados;
    setRepartidores(employees);
  };

  const getCamiones = async () => {
    const data = await fetch(`${api}/api/camiones/`);
    const camiones = await data.json();
    const trucks = camiones.camiones;
    setCamiones(trucks);
  };

  useEffect(() => {
    getRepartidores();
    getCamiones();
  }, []);

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

  const { fecha, caja_inicial } = newPlanilla;

  const addProductToOrder = (item) => {
    if (item.flete === "") item.flete = 0;
    setOderDetail((prevState) => {
      return [...prevState, item];
    });
  };

  return (
    <div className="card-nb">
      <div className="card__header">
        <div className="card__title">Nueva planilla</div>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="form__group">
          <label className="form__label">Caja inicial:</label>
          <input
            className={`form__input form__input__edit ${
              checkValid(errors.caja_inicial) ? "is-invalid" : ""
            }`}
            type="number"
            value={caja_inicial}
            onChange={onChangeHandler}
            name="caja_inicial"
          />
          <small id="helpId" className="invalid-feedback">
            Debes ingresar un monto
          </small>
        </div>

        <div className="row-nb row-nb-2">
          <div className="form__group">
            <label className="form__label">Camión: </label>
            <select
              className={` form__select ${"form__input__edit"} ${
                checkValid(errors.camion) ? "is-invalid" : ""
              }`}
              onChange={onChangeHandler}
              name={"camion"}
            >
              <option>--Seleccionar--</option>
              {camiones.map((camion) => (
                <>
                  <option value={camion.id} key={camion.id}>
                    {camion.marca} {camion.modelo}
                  </option>
                </>
              ))}
            </select>
            <small id="helpId" className="invalid-feedback">
              Debes seleccionar un camión
            </small>
          </div>

          <div className="row-nb row-nb-2">
            <FormGroup
              labelClass={"form__label"}
              labelName={"Fecha"}
              inputClass={"form__input"}
              inputType={"date"}
              value={fecha}
              inputName={"fecha"}
              onChangeHandler={onChangeHandler}
              checkValid={checkValid}
              errors={errors}
            />
          </div>

          <div className="form__group">
            <label className="form__label">Repartidor: </label>
            <select
              className={` form__select ${"form__input__edit"} ${
                checkValid(errors.repartidor_id) ? "is-invalid" : ""
              }`}
              name="repartidor_id"
              onChange={onChangeHandler}
            >
              <option>--Seleccionar--</option>
              {repartidores.map((repartidor) => (
                <>
                  {repartidor.usuario.rol === "repartidor" ? (
                    <option value={repartidor.id} key={repartidor.id}>
                      {repartidor.nombre} {repartidor.apellido}{" "}
                    </option>
                  ) : null}
                </>
              ))}
            </select>
            <small id="helpId" className="invalid-feedback">
              Debes seleccionar un repartidor
            </small>
          </div>
        </div>
        <PlanillaItems addProductToOrder={addProductToOrder} />

        {carga_inicial.length > 0 && (
          <PlanillaCarga orderDetail={carga_inicial} />
        )}

        <div className="button__group">
          {carga_inicial.length > 0 ? (
            <button className="button acept__button">Agregar planilla</button>
          ) : null}
          <Link to="/dashboard/planillas" className="button cancel__button">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewPlanilla;
