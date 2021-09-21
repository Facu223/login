import { Link, useRouteMatch } from "react-router-dom";

import styles from "./Sidebar.module.css";

const Sidebar = (props) => {
   const { url } = useRouteMatch();
   console.log(url);
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
                  {/* <i class="bi bi-house-door"></i>Dashboard */}
                  <i className={`bi bi-house-door ${styles.sidebar__icon}`}></i>
                  Dashboard
               </Link>
            </li>
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
            <li className={styles.sidebar__item}>
               <Link
                  to={`${url}/ventas`}
                  onClick={props.closeMenu}
                  className={styles.sidebar__link}
               >
                  <i className={`bi bi-shop ${styles.sidebar__icon}`}></i>Ventas
               </Link>
            </li>
            <li className={styles.sidebar__item}>
               <Link
                  to={`${url}/informes`}
                  onClick={props.closeMenu}
                  className={styles.sidebar__link}
               >
                  <i className={`bi bi-bar-chart ${styles.sidebar__icon}`}></i>
                  Informes
               </Link>
            </li>
         </ul>
      </div>
   );
};

export default Sidebar;
