import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

const FormularioRegistrar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (usuario) => {
    console.log(usuario);
    reset();
  };
  return (
    <>
      <Container className="m-5" style={{ background: "#E8FCF6" }}>
        <Row className="justify-content-center">
          <Col sm={12} md={8} lg={9}>
            <Form onSubmit={handleSubmit(onsubmit)} className="text-center">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ingresar email</Form.Label>
                <Form.Control type="email" placeholder="" 
                {...register("email", {
                  required: "El email es un dato obligatorio",
                  pattern: {
                    value:
                      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                    message:
                      "El email debe tener el siguiente formato mail@ejemplo.com",
                  },
                })}
                />
                <Form.Text className="text-danger">
                  {errors.email?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ingresar contraseña</Form.Label>
                <Form.Control type="password" placeholder=""
                {...register("password", {
                  required: "La password es un dato obligatorio",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[a-z])(?=.*\d)[a-z\d\w\W]{4,20}$/,
                    message:
                      "La contraseña debe tener entre 4 y 20 caracteres, debe tener al menos 1 letra, 1 número y puede incluir o no caracteres especiales",
                  },
                })}
                />
                <Form.Text className="text-danger">
                  {errors.password?.message}
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" className="m-3">
                Guardar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormularioRegistrar;
