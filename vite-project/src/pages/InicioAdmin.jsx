import React from "react";
import Table from "react-bootstrap/Table";
import Menu from "../components/menu";
import { Link } from "react-router-dom";

const InicioAdmin = () => {
  return (
    <>
      <Menu />
      <Table responsive="md" className="m-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Rol</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Pago</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>
              <Link className="p-2 m-2  btn btn-warning">Editar</Link>
              <Link className="p-2 m-2 btn  btn-danger">Eliminar</Link>
              <Link className="p-2 m-2  btn btn-warning">Suspender</Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default InicioAdmin;
