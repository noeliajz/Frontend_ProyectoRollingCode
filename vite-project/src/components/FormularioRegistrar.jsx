import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const FormularioRegistrar = () => {
  const [formInputs, setFormInputs] = useState({
    nombres: "",
    apellido: "",
    email: "",
    contrasenia: ""  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/apiStock/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombres: formInputs.nombres,
          apellido: formInputs.apellido,
          email: formInputs.email,
          contrasenia: formInputs.contrasenia,
        }),
      });
        if (res.ok) {
        const data = await res.json();
        alert("Registro exitoso");
        setTimeout(() => {
          location.href = "/IniciarSesion"; 
        }, 3000);
      } else {
        const data = await res.json();
        const errorMessage = data.message || "Ocurrió un error desconocido. Intente nuevamente.";
        alert("Error en el registro: " + errorMessage);
      }
    } catch (error) {
      alert("Ocurrió un error en el servidor: " + error.message);
    }
  };
  
  return (
    <>
      <div className="d-flex py-5 justify-content-center" style={{background: "#FFFFFF"}}>
        <form className="w-50" onSubmit={handleSubmit}>
          <h2 className="form_tittle">Crea una Cuenta</h2>
          <div className="form_container">
            <div className="mb-3">
              <label htmlFor="nombres" className="form-label">
                Ingresar nombres
              </label>
              <input
                type="text"
                name="nombres"
                onChange={handleChange}
                className="form-control"
                id="nombres"
                placeholder=" "
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">
                Ingresar apellidos
              </label>
              <input
                type="text"
                name="apellido"
                onChange={handleChange}
                className="form-control"
                id="apellido"
                placeholder=" "
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Ingresar email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="form-control"
                id="email"
                placeholder=" "
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contrasenia" className="form-label">
                Ingresar contraseña
              </label>
              <input
                type="password"
                name="contrasenia"
                onChange={handleChange}
                className="form-control"
                id="contrasenia"
                placeholder=" "
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormularioRegistrar;
