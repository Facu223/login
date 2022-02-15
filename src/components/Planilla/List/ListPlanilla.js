import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoaderSpinner from "../../LoaderSpinner/LoaderSpinner";
import api from "../../servicios/api";
import styles from "./ListProducts.module.css";
import Pagination from "./Pagination";
// import stylesPagination from "./Pagination.module.css";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const TOTAL_PER_PAGE = 10;
  const [datosCargados, setDatosCargados] = useState(false);

  //Crea un array con los productos a recorrer por pagina
  let productsToLoad = products.slice(
    (actualPage - 1) * TOTAL_PER_PAGE,
    actualPage * TOTAL_PER_PAGE
  );

  //Obtiene el total de paginas
  const getTotalPages = () => {
    let totalProducts = products.length;
    return Math.ceil(totalProducts / TOTAL_PER_PAGE);
  };

  //Elimina producto llamando deleteP()
  const deleteProduct = (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar este producto?"))
      fetch(`${api}/api/productos/${id}`, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(() => deleteP(id));
  };

  //Elimina un producto
  const deleteP = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
  };

  //Traer todos los productos
  const cargarDatos = () => {
    fetch(`${api}/api/planillas`)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        setDatosCargados(true);
        // setProducts([...products, ...datosRespuesta.productos]);
        setProducts(datosRespuesta.planillas);
      });
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <>
      {datosCargados ? (
        <div className={`${styles.card2}`}>
          <div className="card-body card3">
            <div className={styles["card-header"]}>
              <Link
                to={"/dashboard/planillas/nuevo"}
                type="button"
                className={`button acept__button`}
              >
                <i className={`bi bi-plus ${styles.new__button__icon}`}></i>
                Agregar
              </Link>
            </div>
            <h4>Lista de planillas</h4>
            {products.length === 0 ? (
              <p style={{ textAlign: "center" }}>No hay datos por listar</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Camión (patente)</th>
                    <th>Repartidor</th>
                    <th>Caja inicial</th>
                    <th>Carga</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {productsToLoad.map((x) => (
                    <tr key={x.id}>
                      <td data-titulo="ID">{x.id}</td>
                      <td data-titulo="Fecha">{x.fecha}</td>
                      <td data-titulo="Camión (patente)">
                        {x.empleado.nombre}
                      </td>
                      <td data-titulo="Nombre del repartidor">
                        {x.empleado.nombre}
                      </td>
                      <td data-titulo="Caja inicial">{x.caja_inicial}</td>
                      <td data-titulo="Carga">
                        <Link
                          to={`/dashboard/productos/editar/${x.id}`}
                          className={`button acept__button`}
                        >
                          Ver carga
                        </Link>
                      </td>
                      <td>
                        <div
                          className={`${styles.button__group} ${styles.botones}`}
                        >
                          <Link
                            to={`/dashboard/planillas/editar/${x.id}`}
                            className={`button success__button`}
                          >
                            Ver
                          </Link>
                          {/* <button
                                       onClick={() => deleteProduct(x.id)}
                                       type="button"
                                       className={`${styles.delete__button} button`}
                                    >
                                       Borrar
                                    </button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="paginationContainer">
              <Pagination
                page={actualPage}
                total={getTotalPages()}
                onChange={(page) => {
                  setActualPage(page);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <LoaderSpinner />
      )}
    </>
  );
};

export default ListProducts;
