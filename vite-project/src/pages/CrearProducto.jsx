import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Menu from "../components/menu";
import { Container, Row, Col } from "react-bootstrap";

const CrearProducto = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [inputCheckName, setInputCheckName] = useState(false);
    const [formValues, setFormValues] = useState({
      nombre: "",
      precio: "",
      categoria: "",
      descripcion: "",
      fecha: "",
      imagen: ""
    });
  
    const ObtenerUnUsuario = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await fetch(
        `http://localhost:8080/apiStock/producto`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
  
      const { getProducto } = await res.json();
      setFormValues({
        nombre: getProducto.nombre,
        precio: getProducto.precio,
        categoria: getProducto.categoria,
        descripcion: getProducto.descripcion,
        fecha: getProducto.fecha,
        imagen: getProducto.imagen
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
      const token = localStorage.getItem("token");
    
      if (
        formValues.nombre === "" &&
        formValues.precio === "" &&
        formValues.categoria === "" &&
        formValues.descripcion === "" &&
        formValues.fecha === "" &&
        formValues.imagen === ""
      ) {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Oops",
          text: "Formulario vacio",
          showConfirmButton: false,
          timer: 1350,
        });
        return;
      }
    
      try {
        const res = await fetch(`http://localhost:8080/apiStock/producto`, {
          method: "POST",
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
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("La respuesta no es JSON");
        }
        const resUpdateUser = await res.json();
        if (resUpdateUser.status === 200) {
          Swal.fire("Usuario creado correctamente!", "success");
        }
        setFormValues({
          nombre: "",
          precio: "",
          categoria: "",
          descripcion: "",
          fecha: "",
          imagen: ""
        });
        setTimeout(() => {
          navigate("/ProductosAdmin");
        }, 1000);
    
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Ocurrió un error",
          text: error.message,
        });
        console.error("Error al actualizar producto:", error);
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
                      Ingresar Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formValues.nombre}
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
                      Ingresar Precio
                    </label>
                    <input
                      type="number"
                      name="precio"
                      value={formValues.precio}
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
                      Ingresar categoria
                    </label>
                    <input
                      type="text"
                      name="categoria"
                      value={formValues.categoria}
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
                      Ingresar descripción
                    </label>
                    <input
                      type="text"
                      name="descripcion"
                      value={formValues.descripcion}
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
                      Ingresar Fecha en el formato AAAA/MM/DD
                    </label>
                    <input
                      type="text"
                      name="fecha"
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
                      Ingresar dirección de la imagen
                    </label>
                    <input
                      type="text"
                      name="imagen"
                      value={formValues.imagen}
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


export default CrearProducto
