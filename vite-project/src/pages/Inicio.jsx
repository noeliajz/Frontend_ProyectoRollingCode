import React, { useEffect, useState } from "react";
import Menu from "../components/menu";
import Footer from "../components/Footer";
import Carrusel from "../components/Carrusel";
import CarruselPago from "../components/CarruselPago";
import CardInicio from "../components/CardInicio"; // Ajusta la ruta según sea necesario
import Spinner from 'react-bootstrap/Spinner'
import Card from "react-bootstrap/Card";

const Inicio = () => {
  const [personaje, setPersonaje] = useState({});
  const [mostrarSpinner, setMostrarSpinner] = useState(true)
  const [productosTodos, setProductos] = useState([]);
  const [refreshProductos, setRefreshProductos] = useState(false);

  useEffect(() => {
    obtenerTodosLosProductos();
  }, [refreshProductos]);

  const obtenerTodosLosProductos = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/apiStock/producto", {
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
      console.log("Productos obtenidos:", data); // Verifica la estructura de los datos
      setProductos(data.productos || []); // Asegúrate de que sea un array
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductos([]); // Asegúrate de que siempre sea un array
    }
  };

const componenteRenderizado = (mostrarSpinner)? (<div className="text-center py-5"><Spinner animation="border" variant="success"  /></div>)
: <CardInicio personaje={personaje} />
  return (
    <>
      <Menu />
      <Carrusel />
      <div style={{ background: "#FFFFFF" }}>
        <h3 className="p-4">Formas de pago</h3>
        <CarruselPago />
        <h3 className="p-4">Accede a todos nuestros productos</h3>
        <div className="d-flex flex-wrap justify-content-around">
          {Array.isArray(productosTodos) && productosTodos.length > 0 ? (
            productosTodos.map((producto, index) => (
              <Card key={producto._id} style={{ width: "18rem", margin: "10px" }}>
                <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>
                    Precio: {producto.precio}
                    <br />
                    Descripción: {producto.descripcion}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Inicio;
