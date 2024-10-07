import { Form, Button, Container, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const FormularioIniciarSesion = ({setUsuarioLogueado}) => {
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    usuario: '',
    password: ''
  });

  const [usuarioInput, setusuarioInput] = useState(false);
  const [passwordInput, setpasswordInput] = useState(false);

  const handleChange = (ev) => {
    setFormInputs({ ...formInputs, [ev.target.name]: ev.target.value });
    
    if (ev.target.name === 'usuario' && ev.target.value) {
      setusuarioInput(false);
    } else if (ev.target.name === 'password' && ev.target.value) {
      setpasswordInput(false);
    }
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    if (formInputs.usuario) {
      if (formInputs.password) {
        setusuarioInput(false);
        setpasswordInput(false);

        try {      
           const res = await fetch('http://localhost:4000/apiStock/', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              usuario: formInputs.usuario, 
              password: formInputs.password
            })
          });

          const data = await res.json();
          if (data.usuarioExist) {
            localStorage.setItem('token', data.usuarioExist.token);
            localStorage.setItem('role', data.usuarioExist.role);
            localStorage.setItem('nombres', data.usuarioExist.nombres);
            console.log(data.usuarioExist)
             if (data.usuarioExist.role === 'admin') {
              navigate('/Inicioadmin');
            } else if (data.usuarioExist.role === 'usuario') {
              navigate('/');
            } 
          } else {
            console.error("Usuario no encontrado o credenciales incorrectas");
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Error en la solicitud de login",
              text: "Usuario no encontrado o credenciales incorrectas" ,
              showConfirmButton: false,
              timer: 1380,
            });
          }
        } catch (error) {
          console.error("Error en la solicitud de login:", error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error",
            text: "Error en la solicitud de login: ", error ,
            showConfirmButton: false,
            timer: 1380,
          });
        }
      } else {
        setpasswordInput(true);
      }
    } else {
      setusuarioInput(true);
      setpasswordInput(true);
    }
  };

  useEffect(() => {
    console.log(formInputs);
  }, [formInputs]);

  return (
    <Container fluid style={{ background: "#E1F7F5" }}>
    <Row>
      <Col className="d-flex justify-content-center">
        <Form className="p-5 w-50 text-center">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ingresar correo electrónico</Form.Label>
            <Form.Control
              name="usuario"
              onChange={handleChange}
              className={usuarioInput ? ' form-control is-invalid' : 'form-control'}
              type="email"
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicpasswordword">
            <Form.Label>Ingresar contraseña</Form.Label>
            <Form.Control
              name="password"
              onChange={handleChange}
              className={passwordInput ? 'form-control is-invalid' : 'form-control'}
              type="password"
              placeholder=""
            />
          </Form.Group>
          <Button  style={{background:"#0E46A3", color:"#E1F7F5"}}  onClick={handleClick} type="submit">
            Ingresar
          </Button>
        </Form>
      </Col>
    </Row>
  </Container>
  );
};

export default FormularioIniciarSesion;
