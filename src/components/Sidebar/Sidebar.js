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
                  to={`${url}/empleados`}
                  onClick={props.closeMenu}
                  className={styles.sidebar__link}
               >
                  Empleados
               </Link>
            </li>
            <li className={styles.sidebar__item}>
               <Link
                  to={`${url}/pedidos`}
                  onClick={props.closeMenu}
                  className={styles.sidebar__link}
               >
                  Pedidos
               </Link>
            </li>
            <li className={styles.sidebar__item}>
               <Link
                  to={`${url}/camiones`}
                  onClick={props.closeMenu}
                  className={styles.sidebar__link}
               >
                  Camiones
               </Link>
            </li>
            <li className={styles.sidebar__item}>
               <Link
                  to={`${url}/ventas`}
                  onClick={props.closeMenu}
                  className={styles.sidebar__link}
               >
                  Ventas
               </Link>
            </li>
            <li className={styles.sidebar__item}>
               <Link
                  to={`${url}/informes`}
                  onClick={props.closeMenu}
                  className={styles.sidebar__link}
               >
                  Informes
               </Link>
            </li>
         </ul>
      </div>
   );
};

export default Sidebar;
