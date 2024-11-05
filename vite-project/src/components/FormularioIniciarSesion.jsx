import { Form, Button, Container, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const FormularioIniciarSesion = ({ setUsuarioLogueado }) => {
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    email: "",
    contrasenia: "",
  });

  const [usuarioInput, setUsuarioInput] = useState(false);
  const [contraseniaInput, setContraseniaInput] = useState(false);

  const handleChange = (ev) => {
    setFormInputs({ ...formInputs, [ev.target.name]: ev.target.value });

    if (ev.target.name === "email" && ev.target.value) {
      setUsuarioInput(false);
    } else if (ev.target.name === "contrasenia" && ev.target.value) {
      setContraseniaInput(false);
    }
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    if (formInputs.email) {
      if (formInputs.contrasenia) {
        setUsuarioInput(false);
        setContraseniaInput(false);
        try {
          const res = await fetch("http://localhost:8080/apiStock/usuario/iniciarSesion", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formInputs.email,
              contrasenia: formInputs.contrasenia,
            }),
          });
  
          const data = await res.json();
  
          if (res.ok) {
            if (data.usuarioExist) {
              localStorage.setItem("token", data.usuarioExist.token);
              localStorage.setItem("rol", data.usuarioExist.rol);
              localStorage.setItem("nombres", data.usuarioExist.nombres);
  
              if (data.usuarioExist.rol === "admin") {
                navigate("/InicioAdmin");
              } else if (data.usuarioExist.rol === "user") {
                navigate("/");
              }
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Error en la solicitud de login",
                text: "Usuario no encontrado o credenciales incorrectas",
                showConfirmButton: false,
                timer: 1380,
              });
            }
          } else {
            // Maneja los errores específicos según el código de estado
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Error",
              text: data.mensaje || "Usuario o contraseña incorrectos",
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
            text: "Ocurrió un error al iniciar sesión",
            showConfirmButton: false,
            timer: 1380,
          });
        }
      } else {
        setContraseniaInput(true);
      }
    } else {
      setUsuarioInput(true);
      setContraseniaInput(true);
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
                name="email"
                onChange={handleChange}
                className={
                  usuarioInput ? "form-control is-invalid" : "form-control"
                }
                type="email"
                placeholder=""
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasiccontraseniaword">
              <Form.Label>Ingresar contraseña</Form.Label>
              <Form.Control
                name="contrasenia"
                onChange={handleChange}
                className={
                  contraseniaInput ? "form-control is-invalid" : "form-control"
                }
                type="password"
                placeholder=""
              />
            </Form.Group>
            <Button
              style={{ background: "#0E46A3", color: "#E1F7F5" }}
              onClick={handleClick}
              type="submit"
            >
              Ingresar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioIniciarSesion;