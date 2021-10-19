import { Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Sidebar.module.css";

const Sidebar = (props) => {
   const { url } = useRouteMatch();
   const user = useSelector((state) => state.user);
   return (
      <div className={`${styles.sidebar} ${props.isOpen ? styles.open : ""}`}>
         <p className={styles["sidebar__close-btn"]} onClick={props.closeMenu}>
            X
         </p>
         <h2 className={styles.sidebar__title}>Menu</h2>
         <ul className={styles.sidebar__items}>
            <li className={styles.sidebar__item}>
               <Link
                  to={`/dashboard`}
                  onClick={props.closeMenu}
                  className={styles.sidebar__link}
               >
                  <i className={`bi bi-house-door ${styles.sidebar__icon}`}></i>
                  Dashboard
               </Link>
            </li>
            {console.log(user)}
            {user.rol === "admin" && (
               <li className={styles.sidebar__item}>
                  <Link
                     to={`${url}/empleados`}
                     onClick={props.closeMenu}
                     className={styles.sidebar__link}
                  >
                     <i className={`bi bi-people ${styles.sidebar__icon}`}></i>
                     Empleados
                  </Link>
               </li>
            )}

            <li className={styles.sidebar__item}>
               <Link
                  to={`${url}/clientes`}
                  onClick={props.closeMenu}
                  className={styles.sidebar__link}
               >
                  <i className={`bi bi-people ${styles.sidebar__icon}`}></i>
                  Clientes
               </Link>
            </li>

            <li className={styles.sidebar__item}>
               <Link
                  to={`${url}/clientes`}
                  onClick={props.closeMenu}
                  className={styles.sidebar__link}
               >
                  <i className={`bi bi-people ${styles.sidebar__icon}`}></i>
                  Clientes
               </Link>
            </li>
            <li className={styles.sidebar__item}>
               <Link
                  to={`${url}/pedidos`}
                  onClick={props.closeMenu}
                  className={styles.sidebar__link}
               >
                  <i
                     className={`bi bi-clipboard-check ${styles.sidebar__icon}`}
                  ></i>
                  Pedidos
               </Link>
            </li>

            {user.rol === "admin" && (
               <li className={styles.sidebar__item}>
                  <Link
                     to={`${url}/camiones`}
                     onClick={props.closeMenu}
                     className={styles.sidebar__link}
                  >
                     <i className={`bi bi-truck ${styles.sidebar__icon}`}></i>
                     Camiones
                  </Link>
               </li>
            )}

            {user.rol === "admin" && (
               <li className={styles.sidebar__item}>
                  <Link
                     to={`${url}/ventas`}
                     onClick={props.closeMenu}
                     className={styles.sidebar__link}
                  >
                     <i className={`bi bi-shop ${styles.sidebar__icon}`}></i>
                     Ventas
                  </Link>
               </li>
            )}

            {user.rol === "admin" && (
               <li className={styles.sidebar__item}>
                  <Link
                     to={`${url}/informes`}
                     onClick={props.closeMenu}
                     className={styles.sidebar__link}
                  >
                     <i
                        className={`bi bi-bar-chart ${styles.sidebar__icon}`}
                     ></i>
                     Informes
                  </Link>
               </li>
            )}
         </ul>
      </div>
   );
};

export default Sidebar;
