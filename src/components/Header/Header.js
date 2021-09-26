import { useState } from "react";
import { Redirect } from "react-router-dom";
import styles from "./Header.module.css";

const Header = (props) => {
   const [isLoggin, setLogin] = useState(true);

   const onLogout = () => {
      localStorage.removeItem("authToken");
      setLogin(false);
   };

   return (
      <header className={styles.header}>
         <div className={styles["header__toggle-btn"]} onClick={props.openMenu}>
            <i className="bi bi-list"></i>
         </div>
         <div className={styles.header__logo}>Josecito Gas</div>
         <div className={styles.header__user}>
            <div className={styles.user}>Luciano</div>
            <div className={styles.user__logout} onClick={onLogout}>
               <i className="bi bi-power"></i>
            </div>
         </div>
         {!isLoggin && <Redirect to="/login" />}
      </header>
   );
};

export default Header;
