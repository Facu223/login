import styles from "./Header.module.css";

const Header = (props) => {
   return (
      <header className={styles.header}>
         <div className={styles["header__toggle-btn"]} onClick={props.openMenu}>
            <i className="bi bi-list"></i>
         </div>
         <div className={styles.header__logo}>Josecito Gas</div>
         <div className={styles.header__user}>Luciano</div>
      </header>
   );
};

export default Header;
