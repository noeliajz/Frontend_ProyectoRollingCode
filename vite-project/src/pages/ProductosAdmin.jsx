import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Menu from "../components/menu";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductosAdmin = () => {
  const [productosTodos, setProductos] = useState([]);
  const [refreshProductos, setRefreshProductos] = useState(false);

  const obtenerTodosLosProductos = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/apiStock/producto", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();
      console.log("Productos obtenidos:", data);
      setProductos(data.productos || data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductos([]);
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
              `http://localhost:8080/apiStock/producto/${id}`,
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
                text: "El producto ha sido borrado",
                showConfirmButton: false,
                timer: 1370,
              });
              setRefreshProductos(true);
            } else {
              const errorText = await res.text();
              throw new Error(errorText);
            }
          } catch (error) {
            Swal.fire({
              position: "top",
              title: "Ocurrió un error al intentar borrar el producto.",
              text: error.message,
              icon: "error",
              showConfirmButton: false,
              timer: 1370,
            });
            console.error("Error deleting product:", error);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Cancelado",
            text: "El producto está a salvo",
            showConfirmButton: false,
            timer: 1350,
          });
        }
      });
  };

  useEffect(() => {
    obtenerTodosLosProductos();
  }, [refreshProductos]);

  return (
    <>
      <Menu />
      <Link to={'/CrearProducto'} className="btn m-3" style={{background:"#CCFF01"}}>
        Agregar
      </Link>
      <Table responsive className="m-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Imagen</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {console.log("Productos en la tabla:", productosTodos)}
          {Array.isArray(productosTodos) && productosTodos.length > 0 ? (
            productosTodos.map((producto, index) => (
              <tr key={producto._id}>
                <td>{index + 1}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.categoria}</td>
                <td>{producto.descripcion}</td>
                <td>{new Date(producto.fecha).toLocaleDateString()}</td>
                <td>
                  <img src={producto.imagen} alt={producto.nombre} width="50" />
                </td>
                <td>
                  <Link
                    to={`/EditarProducto/${producto._id}`}
                    className="btn btn-warning"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(producto._id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No se encontraron productos
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ProductosAdmin;
