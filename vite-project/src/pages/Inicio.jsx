import React from "react";
import Menu from "../components/menu";
import Footer from "../components/Footer";
import Carrusel from "../components/Carrusel";
import CarruselPago from "../components/CarruselPago";

const Inicio = () => {
  return (
    <>
      <Menu />
      <Carrusel />
      <div style={{ background: "#FFFFDD" }}>
        <h3 className=" p-4">Formas de pago</h3>
        <CarruselPago />
        <h3 className=" p-4">Accede a todos nuestros productos</h3>
      </div>
      <Footer />
    </>
  );
};

export default Inicio;
