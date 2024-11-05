import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Menu from "../components/menu";
import { Container, Row, Col } from "react-bootstrap";


const EditarUsuario = () => {
  
  const params = useParams();
  
  const navigate = useNavigate();
  const [inputCheckName, setInputCheckName] = useState(false);
  const [formValues, setFormValues] = useState({
    nombres: "",
    apellido: "",
    rol: "",
    email: "",
    contrasenia: "",
    pago: ""
  });

  const ObtenerUnUsuario = async () => {
    const token = localStorage.getItem("token"); // Sin JSON.parse
    const res = await fetch(
      `http://localhost:8080/apiStock/usuario/${params.id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  
    const { getUsuario } = await res.json();
    setFormValues({
      nombres: getUsuario.nombres,
      apellido: getUsuario.apellido,
      rol: getUsuario.rol,
      email: getUsuario.email,
      contrasenia: getUsuario.contrasenia,
      pago: getUsuario.pago,
    });
  };
  
  const handleClick = async (ev) => {
    ev.preventDefault();
    const token = localStorage.getItem("token");
  
    if (
      formValues.nombres === "" &&
      formValues.apellido === "" &&
      formValues.rol === "" &&
      formValues.email === "" &&
      formValues.contrasenia === "" &&
      formValues.pago === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Formulario Vacio!",
      });
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:8080/apiStock/usuario/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formValues),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error en la solicitud: ${errorText}`);
      }
  
      // Comprueba que el contenido es JSON antes de parsear
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("La respuesta no es JSON");
      }
  
      const resUpdateUser = await res.json();
      if (resUpdateUser.status === 200) {
        Swal.fire("Usuario editado correctamente!", "success");
      }
      setFormValues({
        nombres: "",
        apellido: "",
        rol: "",
        email: "",
        contrasenia: "",
        pago: "",
      });
      setTimeout(() => {
        navigate("/inicioAdmin");
      }, 1000);
  
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: error.message,
      });
      console.error("Error al actualizar usuario:", error);
    }
  };
  
  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    if (formValues.name) {
      setInputCheckName(false);
    }
  };

 
  useEffect(() => {
    ObtenerUnUsuario();
  }, []);

  return (
    <>
      <Menu />
      <Container fluid style={{ background: "#FFFFFF" }}>
        <Row>
          <Col className="d-flex" sm={12} md={10} lg={10}>
            <section className="conteiner w-100 d-flex justify-content-center pb-5 styleUserAdminPage">
              <form className="text-center p-5 w-50 ">
                <div >
                  <label for="exampleInputEmail1" className="form-label">
                    Ingresar Nombres
                  </label>
                  <input
                    type="text"
                    name="nombres"
                    value={formValues.nombres}
                    className={
                      inputCheckName
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                  />
                </div>
                <div >
                  <label for="exampleInputEmail1" className="form-label">
                    Ingresar Apellido
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={formValues.apellido}
                    className={
                      inputCheckName
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                  />
                </div>
                <div >
                  <label for="exampleInputPassword1" className="form-label">
                    Ingresar Rol
                  </label>
                  <input
                    type="text"
                    name="rol"
                    value={formValues.rol}
                    className={
                      inputCheckName
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="exampleInputPassword1"
                    onChange={handleChange}
                  />
                </div>
                <div >
                  <label for="exampleInputPassword1" className="form-label">
                   Ingresar Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    className={
                      inputCheckName
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="exampleInputPassword1"
                    onChange={handleChange}
                  />
                </div>
                <div >
                  <label for="exampleInputPassword1" className="form-label">
                    Ingresar Contraseña
                  </label>
                  <input
                    type="password"
                    name="contrasenia"
                    value={formValues.contrasenia}
                    className={
                      inputCheckName
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="exampleInputPassword1"
                    onChange={handleChange}
                  />
                </div>
                <div >
                  <label for="exampleInputPassword1" className="form-label">
                   Ingresar Pago
                  </label>
                  <input
                    type="text"
                    name="pago"
                    value={formValues.pago}
                    className={
                      inputCheckName
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="exampleInputPassword1"
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn mt-4"
                  style={{ background: "#000000", color: "#CCFF01" }}
                  onClick={handleClick}
                >
                  Guardar
                </button>
              </form>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditarUsuario;
