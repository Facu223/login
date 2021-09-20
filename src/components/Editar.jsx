import React from "react";
import { Link } from "react-router-dom";
import api from "./servicios/api";

class Editar extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         datosCargados: false,
         empleado: [],
      };
   }

   cambioValor = (e) => {
      const state = this.state.empleado;
      state[e.target.name] = e.target.value;
      this.setState({ empleado: state });
   };

   enviarDatos = (e) => {
      e.preventDefault();
      const { id, nombre, apellido, dni, cuil, telefono, rol } =
         this.state.empleado;

      var datosEnviar = {
         id: id,
         nombre: nombre,
         apellido: apellido,
         dni: dni,
         cuil: cuil,
         telefono: telefono,
         rol: rol,
      };

      fetch(api + "?actualizar=1", {
         method: "POST",
         body: JSON.stringify(datosEnviar),
      })
         .then((respuesta) => respuesta.json())
         .then((datosRespuesta) => {
            console.log(datosRespuesta);
            this.props.history.push("/");
         })
         .catch(console.log);
   };

   componentDidMount() {
      console.log(this.props);
      fetch(api + "?consultar=" + this.props.match.params.id)
         .then((respuesta) => respuesta.json())
         .then((datosRespuesta) => {
            console.log("=>" + datosRespuesta);
            this.setState({ datosCargados: true, empleado: datosRespuesta[0] });
         })
         .catch(console.log);
   }

   render() {
      const { datosCargados, empleado } = this.state;

      if (!datosCargados) {
         return <div>Cargando...</div>;
      } else {
         return (
            <div className="card">
               <div className="card-header">Editar empleado</div>
               <div className="card-body">
                  <form onSubmit={this.enviarDatos}>
                     <div className="form-group">
                        <label htmlFor="">Clave: </label>
                        <input
                           type="text"
                           readOnly
                           className="form-control"
                           name="id"
                           id="id"
                           value={empleado.id}
                           aria-describedby="helpId"
                           placeholder=""
                           onChange={this.cambioValor}
                        />
                        <small id="helpId" className="form-text text-muted">
                           Clave
                        </small>
                     </div>
                     <div className="form-group">
                        <label htmlFor="">Nombre:</label>
                        <input
                           onChange={this.cambioValor}
                           value={empleado.nombre}
                           type="text"
                           name="nombre"
                           id="nombre"
                           className="form-control"
                           placeholder=""
                           aria-describedby="helpId"
                        />
                        <small id="helpId" className="text-muted">
                           Ecribe el nombre del empleado
                        </small>
                     </div>
                     <br></br>

                     <div className="form-group">
                        <label htmlFor="">Apellido:</label>
                        <input
                           onChange={this.cambioValor}
                           value={empleado.apellido}
                           type="text"
                           name="apellido"
                           id="apellido"
                           className="form-control"
                           placeholder=""
                           aria-describedby="helpId"
                        />
                        <small id="helpId" className="text-muted">
                           Ecribe el apellido del empleado
                        </small>
                     </div>
                     <br></br>

                     <div className="form-group">
                        <label htmlFor="">DNI:</label>
                        <input
                           onChange={this.cambioValor}
                           value={empleado.dni}
                           type="text"
                           name="dni"
                           id="dni"
                           className="form-control"
                           placeholder=""
                           aria-describedby="helpId"
                        />
                        <small id="helpId" className="text-muted">
                           Ecribe el apellido del empleado
                        </small>
                     </div>
                     <br></br>

                     <div className="form-group">
                        <label htmlFor="">CUIL:</label>
                        <input
                           onChange={this.cambioValor}
                           value={empleado.cuil}
                           type="text"
                           name="cuil"
                           id="cuil"
                           className="form-control"
                           placeholder=""
                           aria-describedby="helpId"
                        />
                        <small id="helpId" className="text-muted">
                           Ecribe el CUIL del empleado
                        </small>
                     </div>
                     <br></br>

                     <div className="form-group">
                        <label htmlFor="">Teléfono:</label>
                        <input
                           onChange={this.cambioValor}
                           value={empleado.telefono}
                           type="text"
                           name="telefono"
                           id="telefono"
                           className="form-control"
                           placeholder=""
                           aria-describedby="helpId"
                        />
                        <small id="helpId" className="text-muted">
                           Ecribe el teléfono del empleado
                        </small>
                     </div>
                     <br></br>

                     <div className="form-group">
                        <label htmlFor="">Rol:</label>
                        <input
                           onChange={this.cambioValor}
                           value={empleado.rol}
                           type="text"
                           name="rol"
                           id="rol"
                           className="form-control"
                           placeholder=""
                           aria-describedby="helpId"
                        />
                        <small id="helpId" className="text-muted">
                           Ecribe el rol del empleado
                        </small>
                     </div>

                     <br></br>

                     <div className="btn-group" role="group" aria-label="">
                        <button type="submit" className="btn btn-success">
                           Actualizar empleado
                        </button>
                        <Link to={"/"} className="btn btn-primary">
                           Cancelar
                        </Link>
                     </div>
                  </form>
               </div>
               <div className="card-footer text-muted"></div>
            </div>
         );
      }
   }
}

export default Editar;
