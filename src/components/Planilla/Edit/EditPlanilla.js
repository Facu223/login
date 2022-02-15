import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import api from "../../servicios/api";
import FormGroup from "../../Employees/FormGroup";
import FormGroup2 from "../../Employees/FormGroup2";
import styles from "./EditProduct.module.css";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import Backdrop from "../../Backdrop/Backdrop";
import Modal from "../../Modal/Modal";

const EditProduct = () => {
  const initialData = {
    caja_inicial: 0,
    fecha: "",
    repartidor_id: 0,
    empleado: {
      nombre: "",
      apellido: "",
    },
    carga: [],
  };

  const { id } = useParams();
  const [charge, setCharge] = useState(initialData.carga);
  const history = useHistory();
  const [initialState, setInitialState] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState("");
  const [repartidores, setRepartidores] = useState([]);
  const [productList, setProductsList] = useState([]);

  useEffect(() => {
    fetchProductInfo(id);
    getRepartidores();
    fetchProductsList();
  }, []);

  const getRepartidores = async () => {
    const data = await fetch(`${api}/api/empleados/`);
    const empleados = await data.json();
    const employees = empleados.empleados;
    setRepartidores(employees);
  };

  const fetchProductsList = async () => {
    try {
      const response = await fetch(`${api}/api/productos/`);
      const data = await response.json();
      setProductsList(data.productos);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProductInfo = async (id) => {
    try {
      const data = await fetch(`${api}/api/planillas/${id}`);
      const respuesta = await data.json();
      console.log(respuesta.planillas);

      const {
        carga,
        fecha,
        caja_inicial,
        empleado: { nombre, apellido },
        repartidor_id,
      } = respuesta.planillas;

      const productData = {
        fecha,
        caja_inicial,
        empleado: {
          nombre,
          apellido,
        },
        repartidor_id,
      };

      setInitialState(productData);
      console.log("carga", carga)
      setCharge(carga[0].detalle_carga);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeHandler = (e) => {
    setInitialState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onChangeHandlerCharge = (e) => {
    setCharge((prevState) => {
      return [...prevState, {[e.target.name]: e.target.value}]
    })
    // setCharge([{[e.target.name]: e.target.value}])
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const requiredFields = ["nombre", "descripcion", "precio"];
    if (Object.keys(validateInputs(initialState, requiredFields)).length) {
      return setErrors(validateInputs(initialState, requiredFields));
    }
    setErrors({});
    setInitialState({...initialState, charge})
    updateProduct(initialState, id);
  };

  const updateProduct = async (data, id) => {
    try {
      const response = await fetch(`${api}/api/planillas/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(response);

      if (response.status === 200) return history.push("/dashboard/planillas");
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

  const deleteHandler = (id) => {
    setOpenModal(true);
    setProductId(id);
  };

  const onDeleteHandler = async () => {
    // setSuccesDeleted(true);
    try {
      const response = await fetch(`${api}/api/planillas/${productId}`, {
        method: "DELETE",
      });

      if (response.status === 204) setOpenModal(false);
      history.push("/dashboard/planillas");
    } catch (e) {
      console.log(e);
    }
  };

  const { fecha, caja_inicial, repartidor_id, empleado } = initialState;

  const { nombre, apellido } = empleado;

  const nombreCompleto = `${nombre} ${apellido}`;

  return (
    <div className="card-nb">
      <div className={styles.card__header}>
        <h1 className={styles.card__title}>PLANILLA</h1>
      </div>

      <div
        className="delete__button__container"
        onClick={() => {
          deleteHandler(id);
        }}
      >
        <span className="delete__button">
          <i className="fas fa-trash-alt"></i>
        </span>
      </div>

      <form className={styles.form} onSubmit={onSubmitHandler}>
        <FormGroup
          labelClass={"form__label"}
          labelName={"Fecha"}
          inputClass={"form__input"}
          inputType={"date"}
          inputName={"fecha"}
          inputValue={fecha}
          disabledOp={!editMode}
          onChangeHandler={onChangeHandler}
          checkValid={checkValid}
          errors={errors}
        />

        <FormGroup
          labelClass={"form__label"}
          labelName={"Caja inicial"}
          inputClass={"form__input"}
          inputType={"text"}
          inputName={"caja_inicial"}
          inputValue={caja_inicial}
          disabledOp={!editMode}
          onChangeHandler={onChangeHandler}
          checkValid={checkValid}
          errors={errors}
        />

        <div className="form__group">
          <label className="form__label">Repartidor:</label>
          <select
            name="repartidor_id"
            className="form__select"
            value={repartidor_id}
            onChange={onChangeHandler}
            disabled={!editMode}
          >
            {repartidores.map((repartidor) => {
              return (
                <option className="" key={repartidor.id} value={repartidor.id}>
                  {repartidor.nombre} {repartidor.apellido}
                </option>
              );
            })}
          </select>
        </div>

        <h4 className="charge">CARGA</h4>
        <div className="title__items">
          <p>Producto</p>
          <p>Cantidad</p>
        </div>
        <hr />
        {charge.map((e) => (
          <>
            <div className="row-nb row-nb-1">
              <select
                name="producto"
                className="form__select"
                value={e.producto}
                onChange={onChangeHandlerCharge}
                disabled={!editMode}
              >
                {productList.map((product) => {
                  return (
                    <option className="" key={product.id} value={product.id}>
                      {product.nombre} {product.descripcion}
                    </option>
                  );
                })}
              </select>

              <FormGroup2
                labelClass={"form__label"}
                labelName={"Cantidad"}
                inputClass={"form__input"}
                inputType={"number"}
                inputName={"cantidad"}
                inputValue={e.cantidad}
                disabledOp={!editMode}
                onChangeHandler={onChangeHandlerCharge}
                checkValid={checkValid}
                errors={errors}
              />
            </div>
          </>
        ))}

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
            <Link className="button cancel__button" to={"/dashboard/planillas"}>
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

      {openModal && (
        <Modal>
          <DeleteModal
            setOpenModal={setOpenModal}
            deleteHandler={onDeleteHandler}
            modalContent={{
              title: "Eliminar planilla",
              message: "¿Estas seguro que quiere eliminar la planilla?",
            }}
          />
        </Modal>
      )}
      {openModal && <Backdrop />}
    </div>
  );
};

export default EditProduct;
