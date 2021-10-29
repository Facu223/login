import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import api from "../../servicios/api";
import FormGroup from "../../Employees/FormGroup";
import styles from "./EditProduct.module.css";

const EditProduct = () => {
  const initialData = {
    nombre: "",
    descripcion: "",
    precio: "",
  };

  const { id } = useParams();
  const history = useHistory();
  const [initialState, setInitialState] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProductInfo(id);
  }, []);

  const fetchProductInfo = async (id) => {
    try {
      const data = await fetch(`${api}/api/productos/${id}`);
      const {
        producto: { nombre, descripcion, precio },
      } = await data.json();

      const productData = {
        nombre,
        descripcion,
        precio,
      };

      setInitialState(productData);
      console.log(initialState)
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
    const requiredFields = ["nombre", "descripcion", "precio"];

    if (Object.keys(validateInputs(initialState, requiredFields)).length) {
      return setErrors(validateInputs(initialState, requiredFields));
    }

    setErrors({});

    updateProduct(initialState, id);
  };

  const updateProduct = async (data, id) => {
    try {
      const response = await fetch(`${api}/api/productos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 200) return history.push("/dashboard/productos");
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

  const { nombre, descripcion, precio } = initialState;

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h1 className={styles.card__title}>PRODUCTO</h1>
      </div>

      <form className={styles.form} onSubmit={onSubmitHandler}>
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
          labelName={"Descripcion"}
          inputClass={"form__input"}
          inputType={"text"}
          inputName={"descripcion"}
          inputValue={descripcion}
          disabledOp={!editMode}
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
          disabledOp={!editMode}
          onChangeHandler={onChangeHandler}
          checkValid={checkValid}
          errors={errors}
        />

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
            <Link className="button cancel__button" to={"/dashboard/productos"}>
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
    </div>
  );
};

export default EditProduct;
