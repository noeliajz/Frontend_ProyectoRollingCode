import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom';

const Menu = () => {
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
            <NavLink end className='nav-item nav-link' to="/" style={{color: "#FFFFDD"}}>Inicio</NavLink>
            <NavLink end className='nav-item nav-link' to="#action2" style={{color: "#FFFFDD"}}>Quien soy</NavLink>
            <NavLink end className='nav-item nav-link' to="/Contacto" style={{color: "#FFFFDD"}}>Contacto</NavLink>
            <NavLink end className='nav-item nav-link' to="/Registrar" style={{color: "#FFFFDD"}}>Registrarse</NavLink>
            <NavLink end className='nav-item nav-link' to="/IniciarSesion" style={{color: "#FFFFDD"}}>Iniciar sesión</NavLink>
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
