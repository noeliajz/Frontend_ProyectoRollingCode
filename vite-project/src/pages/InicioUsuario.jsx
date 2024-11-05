import React, { useEffect, useState } from "react";
import Menu from "../components/menu";
import Footer from "../components/Footer";
import Carrusel from "../components/Carrusel";
import CarruselPago from "../components/CarruselPago";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"; // Asegúrate de importar Button si lo usas
import enviosGratis from "../assets/enviosGratis.jpg";
import nuevasMarcas from "../assets/nuevasMarcas.jpg";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import CardInicioCategoria from "../components/CardInicioCategoria";

const InicioUsuario = () => {
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

  const handleClick = (id) => {
    const productoSeleccionado = productosTodos.find((producto) => producto._id === id);
    let carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Agregar el producto al carrito si no existe o actualizar cantidad si ya está en carrito
    const productoExistente = carritoActual.find((prod) => prod._id === id);
    if (productoExistente) {
      productoExistente.cantidad += 1; // Incrementa la cantidad
    } else {
      carritoActual.push({ ...productoSeleccionado, cantidad: 1 });
    }
  
    // Guardar en localStorage
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
  
    Swal.fire({
      position: "center",
      icon: "success",
      text: "Producto agregado al carrito",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  
  return (
    <>
      <Menu />
      <Carrusel />
      <CarruselPago />
      <div style={{ background: "#FFFFFF" }} className="d-flex">
        <img
          src={enviosGratis}
          alt=""
          className="d-block w-45 fluid"
          height={250}
        />
        <Form inline className="p-5">
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder=""
                className=" mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Buscar</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <img
        src={nuevasMarcas}
        alt=""
        className="d-block w-25 fluid"
        height={300} 
      />
      <div
          className="d-flex flex-wrap justify-content-around"  style={{paddingBottom:"210px"}}
        >
          {Array.isArray(productosTodos) && productosTodos.length > 0 ? (
            productosTodos.map((producto, index) => (
              <Card
                key={producto._id}
                style={{ width: "18rem", margin: "10px" }} className="text-center"
              >
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  alt={producto.nombre}
                />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>
                    Precio: {producto.precio}
                    <br />
                    Descripción: {producto.descripcion}
                  </Card.Text>
                  <button
                    className="btn " style={{background:"#000000", color:"#CCFF01"}}
                    onClick={() => handleClick(producto._id)}
                  >
                    Agregar al carrito
                  </button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      <CardInicioCategoria />
        <div
          className="d-flex flex-wrap justify-content-around"
          style={{ background: "#2F2F3C" }}
        >
          {Array.isArray(productosTodos) && productosTodos.length > 0 ? (
            productosTodos.map((producto, index) => (
              <Card
                key={producto._id}
                style={{ width: "18rem", margin: "10px" }} className="text-center"
              >
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  alt={producto.nombre}
                />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>
                    Precio: {producto.precio}
                    <br />
                    Descripción: {producto.descripcion}
                  </Card.Text>
                  <button
                    className="btn " style={{background:"#000000", color:"#CCFF01"}}
                    onClick={() => handleClick(producto._id)}
                  >
                    Agregar al carrito
                  </button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      <Footer />
    </>
  );
};

export default InicioUsuario;
