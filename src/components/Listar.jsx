import React from "react";
import { Link } from "react-router-dom";
import api from './servicios/api';
import estilos3 from './estilos3.css';

class Listar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      empleados: [],
    };
  }

  borrarRegistros = (id) => {
    fetch(api+"?borrar="+id)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.cargarDatos();
      })
      .catch(console.log);
  }

  cargarDatos() {
    fetch(api)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.setState({ datosCargados: true, empleados: datosRespuesta });
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const { datosCargados, empleados } = this.state;

    if (!datosCargados) {
      return <div>Cargando</div>;
    } else {
      return (
        <div className="card card2">
          <div className="card-header">
            <Link to={"/crear"} type="button" className="btn btn-success centrar">
              Agregar nuevo empleado
            </Link>
          </div>
          <div className="card-body card3">
            <h4>Lista de empleados</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>DNI</th>
                  <th>CUIL</th>
                  <th>Telefono</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((empleado) => (
                  <tr key={empleado.id}>
                    <td data-titulo="ID">{empleado.id}</td>
                    <td data-titulo="Nombre">{empleado.nombre}</td>
                    <td data-titulo="Apellido">{empleado.apellido}</td>
                    <td data-titulo="DNI">{empleado.dni}</td>
                    <td data-titulo="CUIL">{empleado.cuil}</td>
                    <td data-titulo="Teléfono">{empleado.telefono}</td>
                    <td data-titulo="Rol">{empleado.rol}</td>
                    <td>
                      <div className="btn-group botones" role="group" aria-label="">
                        <Link
                          to={"/editar/"+empleado.id}

                          type="button"
                          className="btn btn-warning padding-button"
                        >
                          Editar
                        </Link>
                        <button onClick={() => this.borrarRegistros(empleado.id)} type="button" className="btn btn-danger">
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer text-muted"></div>
        </div>
      );
    }
  }
}

export default Listar;