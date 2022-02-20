import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoaderSpinner from "../../LoaderSpinner/LoaderSpinner";
import api from "../../servicios/api";
import styles from "./ListProducts.module.css";
import Pagination from "./Pagination";
import ModalCarga from "../.././Modal/ModalCarga/ModalCarga";
import Backdrop from "../../Backdrop/Backdrop";

const ListPlanilla = () => {
  const [planillas, setPlanillas] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const TOTAL_PER_PAGE = 10;
  const [datosCargados, setDatosCargados] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [carga, setCarga] = useState([]);
  const [idPlanilla, setIdPlanilla] = useState()

  console.log(carga);

  //Crea un array con los productos a recorrer por pagina
  let planillasToLoad = planillas.slice(
    (actualPage - 1) * TOTAL_PER_PAGE,
    actualPage * TOTAL_PER_PAGE
  );

  const fetchProductInfo = async (id) => {
    try {
      const data = await fetch(`${api}/api/planillas/${id}`);
      const respuesta = await data.json();
      console.log(respuesta.planillas);
      const { carga } = respuesta.planillas;
      setCarga(carga[0].detalle_carga);
    } catch (e) {
      console.log(e);
    }
  };

  const onShowModal = (planillaId) => {
    fetchProductInfo(planillaId);
    setShowModal(true);
  };

  //Obtiene el total de paginas
  const getTotalPages = () => {
    let totalPlanillas = planillas.length;
    return Math.ceil(totalPlanillas / TOTAL_PER_PAGE);
  };

  //Traer todos los productos
  const cargarDatos = () => {
    fetch(`${api}/api/planillas`)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        setDatosCargados(true);
        setPlanillas(datosRespuesta.planillas);
      });
  };

  //Convierte a mayuscula la primera letra de un texto
  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

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
            {planillas.length === 0 ? (
              <p style={{ textAlign: "center" }}>No hay datos por listar</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Camión (Modelo y N° Poliza)</th>
                    <th>Repartidor</th>
                    <th>Caja inicial</th>
                    <th>Carga</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {planillasToLoad.map((x) => (
                    <tr key={x.id}>
                      <td data-titulo="ID">{x.id}</td>
                      <td data-titulo="Fecha">{x.fecha}</td>
                      <td data-titulo="Camión (patente)">
                        {capitalize(x.camion.marca)} - {x.camion.modelo} -{" "}
                        {x.camion.numero_poliza}
                      </td>
                      <td data-titulo="Nombre del repartidor">
                        {capitalize(x.empleado.nombre)}{" "}
                        {capitalize(x.empleado.apellido)}
                      </td>
                      <td data-titulo="Caja inicial">{x.caja_inicial}</td>
                      <td data-titulo="Carga">
                        <button
                          onClick={() => {
                            setIdPlanilla(x.id)
                            onShowModal(x.id);
                          }}

                          className={`button acept__button`}
                        >
                          Ver carga
                        </button>
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
      {showModal && <ModalCarga closeModal={setShowModal} carga={carga} idPlanilla={idPlanilla}/>}
      {showModal && <Backdrop />}
    </>
  );
};

export default ListPlanilla;
