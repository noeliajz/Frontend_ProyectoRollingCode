import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Menu from "../components/menu";
import { Container, Row, Col } from "react-bootstrap";


const EditarProducto = () => {
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
      `http://localhost:8080/apiStock/producto/${params.id}`,
      {
        method: "GET",
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
      imagen: getProducto.imagen,
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
      formValues.nombre === "" &&
      formValues.precio === "" &&
      formValues.categoria === "" &&
      formValues.descripcion === "" &&
      formValues.fecha === "" &&
      formValues.imagen === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Formulario Vacio!",
      });
    } else if (formValues.name === "") {
      setInputCheckName(true);
    } else {
      const res = await fetch(`http://localhost:8080/apiStock/producto/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: formValues.nombre,
          precio: formValues.precio,
          categoria: formValues.categoria,
          descripcion: formValues.descripcion,
          fecha: formValues.fecha,
          imagen: formValues.imagen,
        }),
      });
      const resUpdateUser = await res.json();
      if (resUpdateUser.status === 200) {
        Swal.fire("Producto editado correctamente!", "success");
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
                    Nombre
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
                    Precio
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
                    categoria
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
                    Descripción
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
                    Fecha
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
                    Imagen
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

export default EditarProducto;
