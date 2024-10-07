import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Menu from "../components/menu";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const InicioAdmin = () => {
  const [allUsers, setUsers] = useState([]);
  const [refreshUsers, setRefreshUsers] = useState(false);

  const obtenerTodosLosUsuarios = async () => {
  const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:4000/apiStock/usuario", {
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
      setUsers(data.allUsers || data || []); // Asegúrate de que sea un array
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]); // Asegúrate de que siempre sea un array
    }
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetch(
              `http://localhost:4000/apiStock/usuario/${id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${token}`,
                },
              }
            );

            if (res.ok) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Borrado",
                text: "El usuario ha sido borrado",
                showConfirmButton: false,
                timer: 1370,
              });
              setRefreshUsers(true); // Refrescar los usuarios
            } else {
              const errorText = await res.text();
              throw new Error(errorText);
            }
          } catch (error) {
            Swal.fire({
              position: "top",
              title: "Ocurrió un error al intentar borrar el usuario.",
              text: error.message,
              icon: "error",
              showConfirmButton: false,
              timer: 1370,
            });
            console.error("Error deleting user:", error);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Cancelado",
            text: "El usuario está a salvo",
            showConfirmButton: false,
            timer: 1350,
          });
        }
      });
  };

  useEffect(() => {
    obtenerTodosLosUsuarios();
  }, [refreshUsers]);

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
            <th>Obra Social</th>
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
                <td>{usuario.rol}</td>
                <td>{usuario.obraSocial}</td>
                <td>
                  <Link
                    to={`/editUser/${usuario._id}`}
                    className="btn btn-warning"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(usuario._id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No se encontraron usuarios
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default InicioAdmin;
