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
    caja_inicial: "",
    fecha: "",
    repartidor_id: 0,
    camion_id: "",
    carga_inicial: [],
  };

  /* ESTADOS */
  const [newPlanilla, setNewPlanilla] = useState(initialState);
  const [repartidores, setRepartidores] = useState([]);
  const [camiones, setCamiones] = useState([]);
  const [errors, setErrors] = useState({});
  const [carga_inicial, setCarga_inicial] = useState(
    initialState.carga_inicial
  );
  const history = useHistory();

  /* HANDLERS */
  const onChangeHandler = (e) => {
    setNewPlanilla((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onChangeHandlerCarga = () => {
    setNewPlanilla({ ...newPlanilla, carga_inicial });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const requiredFields = ["caja_inicial", "camion", "fecha", "repartidor_id"];
    if (Object.keys(validateInputs(newPlanilla, requiredFields)).length) {
      return setErrors(validateInputs(newPlanilla, requiredFields));
    }

    setErrors({});
    cargarDatos();
  };

  useEffect(() => {
    onChangeHandlerCarga();
  }, [carga_inicial]);

  /* HTTP REQUEST */
  const cargarDatos = async () => {
    carga_inicial.forEach((el) => {
      delete el.descripcion;
      delete el.producto;
    });

    try {
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
    } catch (error) {}
  };

  const getRepartidores = async () => {
    try {
      const data = await fetch(`${api}/api/empleados/`);
      const empleados = await data.json();
      const employees = empleados.empleados;
      setRepartidores(employees);
    } catch (error) {}
  };

  const getCamiones = async () => {
    try {
      const data = await fetch(`${api}/api/camiones/`);
      const camiones = await data.json();
      const trucks = camiones.camiones;
      setCamiones(trucks);
    } catch (error) {}
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
    const carga_inicial_parse = Number(carga_inicial.cantidad);
    const itemCantidadParse = parseInt(item.cantidad);
    item.cantidad = itemCantidadParse;
    carga_inicial.cantidad = carga_inicial_parse;

    if (carga_inicial.find((x) => x.id_producto === item.id_producto)) {
      const newCarga = carga_inicial.map((x) =>
        x.id_producto === item.id_producto
          ? {
              ...x,
              cantidad: x.cantidad + item.cantidad,
            }
          : x
      );
      setCarga_inicial(newCarga);
    } else {
      setCarga_inicial((prevState) => {
        return [...prevState, item];
      });
    }
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
                checkValid(errors.camion_id) ? "is-invalid" : ""
              }`}
              onChange={onChangeHandler}
              name={"camion_id"}
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
        <PlanillaItems
          addProductToOrder={addProductToOrder}
          carga_inicial={carga_inicial}
          setCarga_inicial={setCarga_inicial}
        />

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
