import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <>
    <Navbar expand="lg"  style={{ background: "#016A70" }}>
      <Container fluid>
        <Navbar.Brand href="#" style={{color: "#D2DE32"}}>Control de stock</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/" style={{color: "#FFFFDD"}}>Inicio</Nav.Link>
            <Nav.Link href="#action2" style={{color: "#FFFFDD"}}>Quien soy</Nav.Link>
            <Nav.Link href="/Error404" style={{color: "#FFFFDD"}}>Contacto</Nav.Link>
            <Nav.Link href="/Registrar" style={{color: "#FFFFDD"}}>Registrarse</Nav.Link>
            <Nav.Link href="/IniciarSesion" style={{color: "#FFFFDD"}}>Iniciar sesión</Nav.Link>
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
