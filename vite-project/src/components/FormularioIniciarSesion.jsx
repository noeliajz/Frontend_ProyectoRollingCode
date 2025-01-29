import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const FormularioIniciarSesion = ({ setUsuarioLogueado }) => {
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    email: "",
    contrasenia: "",
  });

  const [usuarioInput, setUsuarioInput] = useState(false);
  const [contraseniaInput, setContraseniaInput] = useState(false);

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    if (name === "email" && value.length <= 25) {
      setFormInputs({ ...formInputs, [name]: value });
      setUsuarioInput(value.length < 5);
    } else if (name === "contrasenia" && value.length <= 25) {
      setFormInputs({ ...formInputs, [name]: value });
      setContraseniaInput(value.length < 4);
    }
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    if (formInputs.email && formInputs.contrasenia) {
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
      setUsuarioInput(true);
      setContraseniaInput(true);
    }
  };

  useEffect(() => {
    console.log(formInputs);
  }, [formInputs]);

  return (
    <Container fluid style={{ background: "#FFFFFF" }}>
      <Row>
        <Col className="d-flex justify-content-center" sm={12} md={10} lg={10}>
          <Form className="p-5 text-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ingresar correo electrónico</Form.Label>
              <Form.Control
                name="email"
                onChange={handleChange}
                value={formInputs.email}
                className={
                  usuarioInput ? "form-control is-invalid" : "form-control"
                }
                type="email"
                placeholder=""
              />
              {usuarioInput && (
                <Form.Text className="text-danger">
                  El email debe tener entre 3 y  25 caracteres
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Ingresar contraseña</Form.Label>
              <Form.Control
                name="contrasenia"
                onChange={handleChange}
                value={formInputs.contrasenia}
                className={
                  contraseniaInput ? "form-control is-invalid" : "form-control"
                }
                type="password"
                placeholder=""
              />
              {contraseniaInput && (
                <Form.Text className="text-danger">
                  La contraseña debe tener entre 4 y 25 caracteres.
                </Form.Text>
              )}
            </Form.Group>
            <Button
              style={{ background: "#000000", color: "#CCFF01" }}
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
