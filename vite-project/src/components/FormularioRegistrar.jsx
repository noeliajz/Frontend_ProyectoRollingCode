import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FormularioRegistrar = () => {
  return (
    <>
      <Container className="m-5" style={{background:"#E8FCF6"}}>
        <Row className="justify-content-center">
          <Col sm={12} md={8} lg={9}>
            <Form className="text-center">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ingresar email</Form.Label>
                <Form.Control type="email" placeholder="" />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ingresar contraseña</Form.Label>
                <Form.Control type="password" placeholder="" />
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
