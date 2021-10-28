import { Route, useRouteMatch } from "react-router-dom";
import { Fragment, useState } from "react";
// import estilos2 from "./estilos2.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Backdrop from "../Backdrop/Backdrop";
import styles from "./Dashboard.module.css";
import ListEmployees from "../Employees/List/ListEmployees";
import NewEmployee from "../Employees/New/NewEmployee";
import EditEmployee from "../Employees/Edit/EditEmployee";
import ListTrucks from "../Trucks/List/ListTrucks";
import NewTruck from "../Trucks/New/NewTruck";
import EditTruck from "../Trucks/Edit/EditTruck";
import AddOrder from "../Orders/add/AddOrder";

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
            <Route path={`${path}/empleados/nuevo`}>
               <NewEmployee />
            </Route>
            <Route path={`${path}/empleados/editar/:id`}>
               <EditEmployee />
            </Route>

            <Route path={`${path}/clientes`} exact>
               <ListCustomers />
            </Route>
            <Route path={`${path}/clientes/nuevo`} exact>
               <NewCustomer />
            </Route>
            <Route path={`${path}/clientes/editar/:id`} exact>
               <EditCustomer />
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
            <Route path={`${path}/pedidos`} exact>
               <AddOrder />
            </Route>
         </main>

         {menuOpen ? <Sidebar isOpen={true} closeMenu={closeMenu} /> : null}
         {backdropOpen ? <Backdrop closeMenu={closeMenu} /> : null}
      </Fragment>
   );
}

export default Dashboard;
