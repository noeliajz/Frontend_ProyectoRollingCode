import React, { useEffect, useState } from "react";
import Menu from "../components/menu";
import Footer from "../components/Footer";
import Carrusel from "../components/Carrusel";
import CarruselPago from "../components/CarruselPago";
import CardInicio from "../components/CardInicio"; // Ajusta la ruta según sea necesario
import Spinner from 'react-bootstrap/Spinner'
import Card from "react-bootstrap/Card";

const InicioUsuario = () => {
  const [personaje, setPersonaje] = useState({});
  const [mostrarSpinner, setMostrarSpinner] = useState(true)

  useEffect(() => {
    consultarApi();
  }, []);

  const consultarApi = async () => {
    try {
      setMostrarSpinner(true)
      const respuesta = await fetch(
        "https://thesimpsonsquoteapi.glitch.me/quotes"
      );
      const dato = await respuesta.json();
      console.log(respuesta);
      console.log(dato);
      setPersonaje(dato[0])
      setMostrarSpinner(false)
    } catch (error) {
      console.log(error)
    }
  };
const componenteRenderizado = (mostrarSpinner)? (<div className="text-center py-5"><Spinner animation="border" variant="success"  /></div>)
: <CardInicio personaje={personaje} />
  return (
    <>
      <Menu />
      <Carrusel />
      <div style={{ background: "#FFFFDD" }}>
        <h3 className="p-4">Formas de pago</h3>
        <CarruselPago />
        <h3 className="p-4">Accede a todos nuestros productos</h3>
        {componenteRenderizado}
        <button onClick={consultarApi}>Ver más</button>
      </div>
      <Footer />
    </>
  );
};

export default InicioUsuario;
