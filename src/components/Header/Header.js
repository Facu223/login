import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./Header.module.css";

const Header = (props) => {
   const dispatch = useDispatch();
   const state = useSelector((state) => state);
   console.log(state);

   const onLogout = () => {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("authToken");
   };

   return (
      <header className={styles.header}>
         <div className={styles["header__toggle-btn"]} onClick={props.openMenu}>
            <i className="bi bi-list"></i>
         </div>
         <div className={styles.header__logo}>Josecito Gas</div>
         <div className={styles.header__user}>
            {console.log(state.user)}
            <div className={styles.user}>{state.user.usuario}</div>
            <div className={styles.user__logout} onClick={onLogout}>
               <i className="bi bi-power"></i>
            </div>
         </div>
         {!state.isAuthenticated && <Redirect to="/login" />}
      </header>
   );
};

export default Header;
