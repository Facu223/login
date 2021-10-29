import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../servicios/api";
import { useHistory } from "react-router-dom";
// import styles from "./NewEmployee.module.css";
import FormGroup from "../../Employees/FormGroup";

const NewProduct = () => {
  const initialState = {
    nombre: "",
    descripcion: "",
    precio: "",
  };

  /* ESTADOS */
  const [newProduct, setNewProduct] = useState(initialState);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  /* HANDLERS */
  const onChangeHandler = (e) => {
    setNewProduct((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const requiredFields = ["nombre", "descripcion", "precio"];

    if (Object.keys(validateInputs(newProduct, requiredFields)).length) {
      return setErrors(validateInputs(newProduct, requiredFields));
    }

    setErrors({});
    cargarDatos();
  };

  /* HTTP REQUEST */
  const cargarDatos = async () => {
    const data = await fetch(`${api}/api/productos/`, {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.status === 201) {
      return history.push("/dashboard/productos");
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

  console.log(newProduct)

  const { nombre, descripcion, precio } = newProduct;

  return (
    <div className="card-nb">
      <div>Nuevo Producto</div>
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
          labelName={"Descripción"}
          inputClass={"form__input"}
          inputType={"text"}
          inputName={"descripcion"}
          inputValue={descripcion}
          onChangeHandler={onChangeHandler}
          checkValid={checkValid}
          errors={errors}
        />

        <FormGroup
          labelClass={"form__label"}
          labelName={"Precio"}
          inputClass={"form__input"}
          inputType={"text"}
          inputName={"precio"}
          inputValue={precio}
          onChangeHandler={onChangeHandler}
          checkValid={checkValid}
          errors={errors}
        />

        <div className="button__group">
          <button className="button acept__button">Aceptar</button>
          <Link to="/dashboard/productos" className="button cancel__button">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;