import { Link } from "react-router-dom";
import styles from "./ModalCarga.module.css";

const ModalCarga = ({ closeModal, carga, idPlanilla }) => {

  return (
    <div className={styles.modal__container}>
      <p style={{textAlign: "center"}}>
        <b>Detalles de carga de planilla {idPlanilla}</b>
      </p>
      <div className={`text-black-50 ${styles.modal__options}`}>
        <div class={`${styles["modal__option-btn"]}`}>
          <span
            class=""
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fas fa-ellipsis-v"></i>
          </span>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link class="dropdown-item" to={`/dashboard/planillas/editar/${idPlanilla}`}>
              Editar
            </Link>
          </div>
        </div>

        <i
          className={`fas fa-times ${styles["modal__close-btn"]}`}
          onClick={() => {
            closeModal(false);
          }}
        ></i>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {carga.map((c) => (
            <tr>
              <td>{c.producto}</td>
              <td>{c.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles["modal__actions"]}>
        <button
          className="button cancel__button"
          onClick={() => {
            closeModal(false);
          }}
        >
          Cerrar ventana
        </button>
      </div>
    </div>
  );
};

export default ModalCarga;
