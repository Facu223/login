import React from "react";
import { Link } from "react-router-dom";
import api from './servicios/api';

class Crear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      dni: "",
      cuil: "",
      telefono: "",
      rol: "",
      errores: [],
    };
  }

  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state,errores:[] });
  };

  verificarError(elemento) {
    return this.state.errores.indexOf(elemento) !== -1;
  }

  enviarDatos = (e) => {
    e.preventDefault();

    const { nombre, apellido, dni, cuil, telefono, rol } = this.state;

    let errores = [];
    if (!nombre) errores.push("error_nombre");
    if (!apellido) errores.push("error_apellido");
    if (!dni) errores.push("error_dni");
    if (!cuil) errores.push("error_cuil");
    if (!telefono) errores.push("error_telefono");
    if (!rol) errores.push("error_rol");

    this.setState({ errores: errores });
    if (errores.length > 0) return false;

    var datosEnviar = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      cuil: cuil,
      telefono: telefono,
      rol: rol,
    };

    fetch(api + "?insertar=1", {
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

  render() {
    const { nombre, apellido, dni, cuil, telefono, rol } = this.state;

    return (
      <div className="card">
        <div className="card-header">Empleados</div>
        <div className="card-body">
          <form onSubmit={this.enviarDatos}>
            <div className="form-group">
              <label htmlFor="">Nombre:</label>
              <input
                onChange={this.cambioValor}
                value={nombre}
                type="text"
                name="nombre"
                id="nombre"
                className={
                  (this.verificarError("error_nombre") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Ecribe el nombre del empleado
              </small>
            </div>
            <br></br>

            <div className="form-group">
              <label htmlFor="">Apellido:</label>
              <input
                onChange={this.cambioValor}
                value={apellido}
                type="text"
                name="apellido"
                id="apellido"
                className={
                  (this.verificarError("error_apellido") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Ecribe el apellido del empleado
              </small>
            </div>
            <br></br>

            <div className="form-group">
              <label htmlFor="">DNI:</label>
              <input
                onChange={this.cambioValor}
                value={dni}
                type="text"
                name="dni"
                id="dni"
                className={
                  (this.verificarError("error_dni") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Ecribe el apellido del empleado
              </small>
            </div>
            <br></br>

            <div className="form-group">
              <label htmlFor="">CUIL:</label>
              <input
                onChange={this.cambioValor}
                value={cuil}
                type="text"
                name="cuil"
                id="cuil"
                className={
                  (this.verificarError("error_cuil") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Ecribe el CUIL del empleado
              </small>
            </div>
            <br></br>

            <div className="form-group">
              <label htmlFor="">Teléfono:</label>
              <input
                onChange={this.cambioValor}
                value={telefono}
                type="text"
                name="telefono"
                id="telefono"
                className={
                  (this.verificarError("error_telefono") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Ecribe el teléfono del empleado
              </small>
            </div>
            <br></br>

            <div className="form-group">
              <label htmlFor="">Rol:</label>
              <input
                onChange={this.cambioValor}
                value={rol}
                type="text"
                name="rol"
                id="rol"
                className={
                  (this.verificarError("error_rol") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Ecribe el rol del empleado
              </small>
            </div>

            <br></br>

            <div className="btn-group" role="group" aria-label="">
              <button type="submit" className="btn btn-success">
                Agregar nuevo empleado
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

export default Crear;