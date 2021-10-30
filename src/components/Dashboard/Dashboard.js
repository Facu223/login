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
import ListCustomers from "../Customers/List/ListCustomers";
import NewCustomer from "../Customers/New/NewCustomer";
import EditCustomer from "../Customers/Edit/EditCustomer";
import ListTrucks from "../Trucks/List/ListTrucks";
import NewTruck from "../Trucks/New/NewTruck";
import EditTruck from "../Trucks/Edit/EditTruck";

import ListProducts from "../Products/List/ListProducts";
import NewProduct from "../Products/New/NewProduct";
import EditProduct from "../Products/Edit/EditProduct";
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
            <Route path={`${path}/empleados`} exact component={ListEmployees} />
            <Route path={`${path}/empleados/nuevo`} component={NewEmployee} />
            <Route path={`${path}/empleados/editar/:id`} component={EditEmployee} />

            <Route path={`${path}/clientes`} exact component={ListCustomers} />
            <Route path={`${path}/clientes/nuevo`} exact component={NewCustomer} />
            <Route path={`${path}/clientes/editar/:id`} exact component={EditCustomer}
            />

            <Route path={`${path}/camiones`} exact component={ListTrucks} />
            <Route path={`${path}/camiones/nuevo`} exact component={NewTruck} />
            <Route path={`${path}/camiones/editar/:id`} exact component={EditTruck}
            />

            <Route path={`${path}/productos`} exact component={ListProducts} />
            <Route path={`${path}/productos/nuevo`} exact component={NewProduct} />
            <Route path={`${path}/productos/editar/:id`} exact component={EditProduct}
            />

            <Route path={`${path}/pedidos`} exact component={AddOrder} />
         </main>

         {menuOpen ? <Sidebar isOpen={true} closeMenu={closeMenu} /> : null}
         {backdropOpen ? <Backdrop closeMenu={closeMenu} /> : null}
      </Fragment>
   );
}

export default Dashboard;
