import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom';

const Menu = () => {
  const parseJSON = (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;     }
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
    <Navbar expand="lg"  style={{ background: "#016A70" }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" style={{color: "#D2DE32"}}>Control de stock</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            { rol === "admin" && (
              <>
            <NavLink end className='nav-item nav-link' to="/" style={{color: "#FFFFDD"}}>Inicio</NavLink>
            <NavLink end className='nav-item nav-link' to="#action2" style={{color: "#FFFFDD"}}>Productos</NavLink>
            <NavLink end className='nav-item nav-link' to="#action2" style={{color: "#FFFFDD"}}>Cuentas</NavLink>        
            <Nav.Link href="/" onClick={() => CerrarSesion()} style={{color: "#FFFFDD"}}>Cerrar sesión</Nav.Link>     
              </>
             )}
          </Nav>
          <Nav>
            {( rol !== "admin" && rol !== "user" ) && (
              <>
                <Nav.Link href="/Registrar" style={{color: "#FFFFDD"}}>Registrarse</Nav.Link>
                <Nav.Link eventKey={2} href="/IniciarSesion" style={{color: "#FFFFDD"}}>Iniciar sesión</Nav.Link>
              </>
            )}
          </Nav> 
          <Nav>
            {(  rol === "user" ) && (
              <>
                <Nav.Link href="/" style={{color: "#FFFFDD"}}>Inicio</Nav.Link>
                <Nav.Link eventKey={2} href="/" style={{color: "#FFFFDD"}}>Comprar</Nav.Link>
                <Nav.Link href="/" onClick={() => CerrarSesion()} style={{color: "#FFFFDD"}}>Cerrar sesión</Nav.Link>     
              </>
            )}
          </Nav> 
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Ingresar producto"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Menu
