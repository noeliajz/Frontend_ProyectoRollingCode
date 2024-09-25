import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import Imagen1 from "../assets/Imagen1.jpg";
import Imagen2 from "../assets/Imagen2.jpg";
import Imagen3 from "../assets/Imagen3.jpg";

const Carrusel = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img src={Imagen1} alt="" className="d-block w-100 fluid" height={550} />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img src={Imagen2} alt="" className="d-block w-100" height={550} />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img src={Imagen3} alt="" className="d-block w-100" height={550} />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default Carrusel
