import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Menu from "../components/menu";
import Footer from "../components/Footer";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [cantidadState, setCantidadState] = useState({});
  let suma = 0;

  // Cargar el carrito desde localStorage
  const obtenerCarritoUsuario = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);

    // Inicializar cantidades en el estado
    const cantidades = {};
    carritoGuardado.forEach((producto) => {
      cantidades[producto._id] = producto.cantidad;
    });
    setCantidadState(cantidades);
  };

  const handleChange = (ev, idProd) => {
    const { value } = ev.target;
    setCantidadState({ ...cantidadState, [idProd]: parseInt(value) });
    actualizarCarrito(idProd, parseInt(value));
  };

  // Función para actualizar el carrito en localStorage
  const actualizarCarrito = (idProd, nuevaCantidad) => {
    const carritoActualizado = carrito.map((producto) => 
      producto._id === idProd ? { ...producto, cantidad: nuevaCantidad } : producto
    );
    setCarrito(carritoActualizado);
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
  };

  const getResult = (precio, cantidad) => {
    const res = cantidad * precio;
    if (isNaN(res)) {
      return 0;
    } else {
      suma += res;
      return res;
    }
  };

  useEffect(() => {
    obtenerCarritoUsuario();
  }, []);

  return (
    <> 
      <Menu />
      <section className="colorCart">
        <h1 className="paddingHome text-center">Mi Carrito</h1>
        <Table striped bordered hover responsive className="p-5">
          <thead>
            <tr>
              <th scope="col">ID Producto</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((producto) => (
              <tr key={producto._id}>
                <th scope="row">{producto._id}</th>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={cantidadState[producto._id] || 1}
                    className="w-25"
                    onChange={(ev) => handleChange(ev, producto._id)}
                  />
                </td>
                <td>{getResult(producto.precio, cantidadState[producto._id])}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-center py-5">
          <h3 style={{color:"#CCFF01"}}>Total: {suma}</h3>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Carrito;
