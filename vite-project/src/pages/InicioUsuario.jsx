import React, { useEffect, useState } from "react";
import Menu from "../components/menu";
import Footer from "../components/Footer";
import Carrusel from "../components/Carrusel";
import CarruselPago from "../components/CarruselPago";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import enviosGratis from "../assets/enviosGratis.jpg";
import nuevasMarcas from "../assets/nuevasMarcas.jpg";
import Form from "react-bootstrap/Form";
import { Row, Col, Container } from "react-bootstrap";
import CardInicioCategoria from "../components/CardInicioCategoria";

const InicioUsuario = () => {
  const [productosTodos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    obtenerTodosLosProductos();
  }, []);

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
      console.log("Productos obtenidos:", data);
      setProductos(data.productos || []);
      setProductosFiltrados(data.productos || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductos([]);
      setProductosFiltrados([]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleFilterSubmit = () => {
    const productosFiltrados = productosTodos.filter(
      (producto) =>
        (searchTerm === "" ||
          producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === "" ||
          producto.categoria.toLowerCase() === selectedCategory.toLowerCase())
    );
    setProductosFiltrados(productosFiltrados);
  };

  const handleClick = (id) => {
    const productoSeleccionado = productosFiltrados.find(
      (producto) => producto._id === id
    );
    let carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carritoActual.find((prod) => prod._id === id);
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carritoActual.push({ ...productoSeleccionado, cantidad: 1 });
    }

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
      <div className="d-flex">
        <img
          src={nuevasMarcas}
          alt=""
          className="d-block w-25 fluid"
          height={300}
        />
        <img
          src={enviosGratis}
          alt=""
          className="d-block w-45 fluid"
          height={250}
        />
      </div>
      <Container fluid style={{ background: "#FFFFFF" }}>
        <Row>
          <Col lg={10} className="d-flex">
            <div>
              <Form.Select
                aria-label="Seleccione una categoría"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="">Seleccione una categoría</option>
                <option value="mujer">Mujer</option>
                <option value="hombre">Hombre</option>
                <option value="adultos">Adultos</option>
                <option value="niños">Niños</option>
              </Form.Select>
              <Button onClick={handleFilterSubmit} className="m-3">
                Buscar
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      
      <div
        className="d-flex flex-wrap justify-content-around"
        style={{ paddingBottom: "210px" }}
      >
        {Array.isArray(productosFiltrados) && productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <Card
              key={producto._id}
              style={{ width: "18rem", margin: "10px" }}
              className="text-center"
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
                  className="btn"
                  style={{ background: "#000000", color: "#CCFF01" }}
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
      <Footer />
    </>
  );
};

export default InicioUsuario;
