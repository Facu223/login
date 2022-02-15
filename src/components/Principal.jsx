// import { Route, BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Fragment, useState } from "react";
import Crear from "./Crear";
import Editar from "./Editar";
import Listar from "./Listar";
import estilos2 from "./estilos2.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Backdrop from "./Backdrop/Backdrop";

function Principal() {
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
      // <Router>
      //    <nav className="navbar n avbar-expand navbar-light bg-light">
      //       <div className="nav navbar-nav">
      //          <Link className="nav-item nav-link" to={"/"}>
      //             Sistema
      //          </Link>
      //       </div>
      //    </nav>

      //    <div className="container flex">
      //       <br></br>

      //       <Route exact path="/" component={Listar}></Route>
      //       <Route path="/crear" component={Crear}></Route>
      //       <Route path="/editar/:id" component={Editar}></Route>
      //    </div>
      // </Router>
      <Fragment>
         <Header openMenu={openMenu} />

         <div className="container flex">
            <Route path={`${path}/empleados`} exact>
               <Listar />
            </Route>
         </div>

         {menuOpen ? <Sidebar isOpen={true} closeMenu={closeMenu} /> : null}
         {backdropOpen ? <Backdrop closeMenu={closeMenu} /> : null}
      </Fragment>
   );
}

export default Principal;
