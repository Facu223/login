import React, { Fragment, useEffect, useState } from "react";
import api from "../../../servicios/api";

const OrderItems = (props) => {
  const itemInitialState = { id_producto: "", producto: "", cantidad: "", descripcion: ""};

  // States
  const [productsList, setProductsList] = useState([]);
  const [errors, setErrors] = useState({});

  // Order detail states
  const [PlanillaItem, setPlanillaItem] = useState(itemInitialState);

  useEffect(() => {
    fetchProductsList();
  }, []);

  const fetchProductsList = async () => {
    try {
      const response = await fetch(`${api}/api/productos/`);
      const data = await response.json();
      setProductsList(data.productos);
    } catch (e) {
      console.log(e);
    }
  };

  const onInputChange = (e) => {
    setPlanillaItem((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

    if (e.target.name === "id_producto") {
      const selectedProduct = productsList.find(
        (el) => el.id === +e.target.value
      );

      setPlanillaItem((prevState) => {
        return { ...prevState, producto: selectedProduct.nombre, descripcion: selectedProduct.descripcion };
      });
    }
  };

  const onAddItemToOrder = () => {
    // Validation
    const requiredFields = ["id_producto", "cantidad", "producto"];
    if (Object.keys(validateInputs(PlanillaItem, requiredFields)).length) {
      setErrors(validateInputs(PlanillaItem, requiredFields));
      return;
    }
    setErrors({});
    // Add item
    props.addProductToOrder(PlanillaItem);
    setPlanillaItem(itemInitialState);
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

  const { id_producto, cantidad } = PlanillaItem;

  return (
    <Fragment>
      <div className="container__carga">
        <h4>Carga</h4>
      <div className="row-nb">
        <div className="form__group">
          <label className="form__label">Producto:</label>
          <select
            className={`form__select form__input__edit ${
              checkValid(errors["id_producto"]) ? "is-invalid" : ""
            }`}
            value={!id_producto ? "default" : id_producto}
            onChange={(e) => onInputChange(e)}
            name="id_producto"
          >
            <option value={"default"} disabled>
              --Seleccionar producto--
            </option>
            {productsList.length > 0 &&
              productsList.map((product) => {
                return (
                  <option value={product.id} key={product.id}>
                    {product.nombre} {product.descripcion}
                  </option>
                );
              })}
          </select>
          <small id="helpId" className="invalid-feedback">
            Debes seleccionar un producto
          </small>
        </div>

        <div className="form__group">
          <label className="form__label">Cantidad:</label>
          <input
            className={`form__input form__input__edit ${
              checkValid(errors["cantidad"]) ? "is-invalid" : ""
            }`}
            type="number"
            value={cantidad}
            onChange={(e) => onInputChange(e)}
            name="cantidad"
          />
          <small id="helpId" className="invalid-feedback">
            Debes ingresar una cantidad
          </small>
        </div>
      </div>

        <button
          className="button success__button mb-3"
          type="button"
          onClick={() => {
            onAddItemToOrder();
          }}
        >
          Agregar
        </button>
      </div>
    </Fragment>
  );
};

export default OrderItems;
