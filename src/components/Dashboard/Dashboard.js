import { Route, useRouteMatch } from "react-router-dom";
import { Fragment, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Backdrop from "../Backdrop/Backdrop";
import styles from "./Dashboard.module.css";
import ListEmployees from "../Employees/List/ListEmployees";
import NewEmployee from "../Employees/New/NewEmployee";
import ListTrucks from "../Trucks/List/ListTrucks";
import NewTruck from "../Trucks/New/NewTruck";
import EditTruck from "../Trucks/Edit/EditTruck";
import EditEmployee from "../Employees/Edit/EditEmployee";

function Dashboard() {
   const [backdropOpen, setOpen] = useState(false);
   const [menuOpen, setMenuOpen] = useState(false);
   const { path } = useRouteMatch();

   const openMenu = () => {
      setOpen(true);
      setMenuOpen(true);
   };

   const closeMenu = () => {
      setOpen(false);
      setMenuOpen(false);
   };

   return (
      <Fragment>
         <Header openMenu={openMenu} />

         <main className={styles.main}>
            <Route path={`${path}/empleados`} exact>
               <ListEmployees />
            </Route>
            <Route path={`${path}/empleados/editar/:id`} exact>
               <EditEmployee />
            </Route>
            <Route path={`${path}/empleados/nuevo`}>
               <NewEmployee />
            </Route>
            <Route path={`${path}/camiones`} exact>
               <ListTrucks />
            </Route>
            <Route path={`${path}/camiones/nuevo`} exact>
               <NewTruck />
            </Route>
            <Route path={`${path}/camiones/editar/:id`} exact>
               <EditTruck />
            </Route>
         </main>

         {menuOpen ? <Sidebar isOpen={true} closeMenu={closeMenu} /> : null}
         {backdropOpen ? <Backdrop closeMenu={closeMenu} /> : null}
      </Fragment>
   );
}

export default Dashboard;
