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
    const token = JSON.parse(localStorage.getItem("token"));
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

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    if (formValues.name) {
      setInputCheckName(false);
    }
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));

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
    } else if (formValues.name === "") {
      setInputCheckName(true);
    } else {
      const res = await fetch(`http://localhost:8080/api/usuario/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombres: formValues.nombres,
          apellido: formValues.apellido,
          rol: formValues.rol,
          email: formValues.email,
          contrasenia: formValues.contrasenia,
          pago: formValues.pago,
        }),
      });
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
        navigate("/adminPage");
      }, 1000);
    }
  };

  useEffect(() => {
    ObtenerUnUsuario();
  }, []);

  return (
    <>
      <Menu />
      <Container fluid style={{ background: "#E1F7F5" }}>
        <Row>
          <Col className="d-flex" sm={12} md={10} lg={10}>
            <section className="conteiner w-100 d-flex justify-content-center pb-5 styleUserAdminPage">
              <form className="text-center p-5 w-50 ">
                <div >
                  <label for="exampleInputEmail1" className="form-label">
                    Nombres
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
                    Apellido
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
                    Rol
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
                    Email
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
                    Email
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
                    Pago
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
                  style={{ background: "#0E46A3", color: "#E1F7F5" }}
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
