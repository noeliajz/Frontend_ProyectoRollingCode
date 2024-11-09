import React, { useState } from "react";

const FormularioRegistrar = () => {
  const [formInputs, setFormInputs] = useState({
    nombres: "",
    apellido: "",
    email: "",
    contrasenia: ""
  });

  const [nombresError, setNombresError] = useState(false);
  const [apellidoError, setApellidoError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contraseniaError, setContraseniaError] = useState(false);

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    if (name === "nombres") {
      if (value.length <= 15) {
        setFormInputs({ ...formInputs, [name]: value });
      }
      setNombresError(value.length > 0 && value.length < 3);
    } else if (name === "apellido") {
      if (value.length <= 15) {
        setFormInputs({ ...formInputs, [name]: value });
      }
      setApellidoError(value.length > 0 && value.length < 3);
    } else if (name === "email") {
      if (value.length <= 25) {
        setFormInputs({ ...formInputs, [name]: value });
      }
      setEmailError(value.length > 0 && (value.length < 5 || value.length > 25));
    } else if (name === "contrasenia") {
      if (value.length <= 25) {
        setFormInputs({ ...formInputs, [name]: value });
      }
      setContraseniaError(value.length > 0 && (value.length < 4 || value.length > 25));
    } else {
      setFormInputs({ ...formInputs, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formInputs.nombres.length < 3 ||
      formInputs.apellido.length < 3 ||
      formInputs.email.length < 5 ||
      formInputs.contrasenia.length < 4
    ) {
      alert("Los campos deben cumplir con la longitud mínima.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/apiStock/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputs),
      });

      if (res.ok) {
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
      <div className="d-flex py-5 justify-content-center" style={{ background: "#FFFFFF" }}>
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
                className={`form-control ${nombresError ? "is-invalid" : ""}`}
                id="nombres"
                value={formInputs.nombres}
                placeholder=" "
                required
              />
              {nombresError && (
                <div className="invalid-feedback">
                  El nombre debe tener entre 3 y 15 caracteres.
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">
                Ingresar apellidos
              </label>
              <input
                type="text"
                name="apellido"
                onChange={handleChange}
                className={`form-control ${apellidoError ? "is-invalid" : ""}`}
                id="apellido"
                value={formInputs.apellido}
                placeholder=" "
                required
              />
              {apellidoError && (
                <div className="invalid-feedback">
                  El apellido debe tener entre 3 y 15 caracteres.
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Ingresar email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className={`form-control ${emailError ? "is-invalid" : ""}`}
                id="email"
                value={formInputs.email}
                placeholder=" "
                required
              />
              {emailError && (
                <div className="invalid-feedback">
                  El email debe tener entre 5 y 25 caracteres.
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="contrasenia" className="form-label">
                Ingresar contraseña
              </label>
              <input
                type="password"
                name="contrasenia"
                onChange={handleChange}
                className={`form-control ${contraseniaError ? "is-invalid" : ""}`}
                id="contrasenia"
                value={formInputs.contrasenia}
                placeholder=" "
                required
              />
              {contraseniaError && (
                <div className="invalid-feedback">
                  La contraseña debe tener entre 4 y 25 caracteres.
                </div>
              )}
            </div>
            
            <button type="submit" className="btn" style={{ color: "#CCFF01", background: "#000000" }}>
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormularioRegistrar;
