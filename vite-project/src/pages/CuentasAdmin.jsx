import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Menu from "../components/menu";
import { Link } from "react-router-dom";

const CuentasAdmin = () => {
  const [allUsers, setUsers] = useState([]);
  const [refreshUsers, setRefreshUsers] = useState(false);

  const obtenerTodosLosUsuarios = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/apiStock/usuario", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();
      console.log("Usuarios obtenidos:", data); // Verifica la estructura de los datos
      setUsers(data.allUsers || data || []); // Ajusta si es necesario con base en la respuesta del backend
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]); // Asegúrate de que siempre sea un array en caso de error
    }
  };

 
  useEffect(() => {
    obtenerTodosLosUsuarios();
  }, [refreshUsers]);

  return (
    <>
      <Menu />
      <Table responsive className="m-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Pago</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {console.log("Usuarios en la tabla:", allUsers)}
          {Array.isArray(allUsers) && allUsers.length > 0 ? (
            allUsers.map((usuario, index) => (
              <tr key={usuario._id}>
                <td>{index + 1}</td>
                <td>{usuario.nombres}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.pago}</td>
                <td>
                  <Link
                    to={'/*'}
                    className="btn btn-warning"
                  >
                    Suspender
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No se encontraron usuarios
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default CuentasAdmin;
