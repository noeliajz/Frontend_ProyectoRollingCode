import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

const Menu = () => {
  const parseJSON = (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  };
  const token = parseJSON(localStorage.getItem("token")) || "";
  const rol = parseJSON(localStorage.getItem("rol")) || "";
  console.log("Token:", token);
  console.log("Rol:", rol);

  const CerrarSesion = () => {
    localStorage.removeItem("idUser");
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setUserAdmin(false);
    location.href = "/";
  };

  return (
    <>
      <Navbar expand="lg" style={{ background: "#2F2F3C" }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/" style={{ color: "#CCFF01" }}>
            Control de stock
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {rol === "admin" && (
                <>
                  <NavLink
                    end
                    className="nav-item nav-link fs-4"
                    to="/"
                    style={{ color: "#FFFFFF" }} 
                  >
                    Inicio
                  </NavLink>
                  <NavLink
                    end
                    className="nav-item nav-link fs-4"
                    to="/ProductosAdmin"
                    style={{ color: "#FFFFFF" }} 
                  >
                    Productos
                  </NavLink>
                  <NavLink
                    end
                    className="nav-item nav-link fs-4"
                    to="/InicioAdmin"
                    style={{ color: "#FFFFFF" }} 
                  >
                    Usuarios
                  </NavLink>
                  <NavLink
                    end
                    className="nav-item nav-link fs-4"
                    to="/cuentasAdmin"
                    style={{ color: "#FFFFFF" }} >
                    Cuentas
                  </NavLink>
                  <Nav.Link
                    href="/"
                    onClick={() => CerrarSesion()}
                    style={{ color: "#FFFFFF" }} className="fs-4"
                  >
                    Cerrar sesión
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              {rol !== "admin" && rol !== "user" && (
                <>
                  <Nav.Link href="/QuienesSomos" style={{ color: "#FFFFFF" }} className="fs-4">
                    Quienes somos
                  </Nav.Link>
                  <Nav.Link href="/Contacto" style={{ color: "#FFFFFF" }} className="fs-4">
                    Contacto
                  </Nav.Link>
                  <Nav.Link href="/Registrar" style={{ color: "#FFFFFF" }} className="fs-4">
                    Registrarse
                  </Nav.Link>
                  <Nav.Link
                    eventKey={2}
                    href="/IniciarSesion"
                    style={{ color: "#FFFFFF" }} className="fs-4"
                  >
                    Iniciar sesión
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              {rol === "user" && (
                <>
                  <Nav.Link href="/InicioUsuario" style={{ color: "#FFFFFF" }} className="fs-4">
                    Inicio
                  </Nav.Link>
                  <Nav.Link eventKey={2} href="/Carrito" style={{ color: "#FFFFFF" }} className="fs-4">
                    Carrito
                  </Nav.Link>
                  <Nav.Link
                    href="/"
                    onClick={() => CerrarSesion()}
                    style={{ color: "#FFFFFF" }} className="fs-4"
                  >
                    Cerrar sesión
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
