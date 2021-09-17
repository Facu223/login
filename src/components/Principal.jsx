import { Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import Crear from "./Crear";
import Editar from "./Editar";
import Listar from "./Listar";
import estilos2 from './estilos2.css'

function Principal() {
  return (
    <Router>
      <nav className="navbar n avbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          <Link className="nav-item nav-link" to={"/"}>
            Sistema
          </Link>

        </div>
      </nav>

      <div className="container flex">
        <br></br>

        <Route exact path="/" component={Listar}></Route>
        <Route path="/crear" component={Crear}></Route>
        <Route path="/editar/:id" component={Editar}></Route>
      </div>
    </Router>
  );
}

export default Principal;