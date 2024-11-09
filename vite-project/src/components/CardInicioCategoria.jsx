import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';

function BasicExample() {
  return (
    <>
      <Container fluid  style={{background:"#2F2F3C", paddingTop:"150px", paddingBottom:"150px"}}>
        <Row  >
          <Col sm={12} md={10} lg={10} className="my-3 text-center" >
              <Card >
                <Card.Img variant="top" src="https://sporting.vtexassets.com/arquivos/ids/1485045-800-800?v=638648770454130000&width=800&height=800&aspect=true" />
                <Card.Body>
                  <Card.Title>Calzado</Card.Title>
                  <Link to="/PaginaError404" className="btn" style={{background:"#2F2F3C", color:"#CCFF01"}}>Ver más</Link>
                </Card.Body>
              </Card>
              <Card >
                <Card.Img variant="top" src="https://sporting.vtexassets.com/arquivos/ids/838845-800-800?v=638233896575630000&width=800&height=800&aspect=true" />
                <Card.Body>
                  <Card.Title>Indumentaria</Card.Title>
                  <Link to="/PaginaError404" className="btn" style={{background:"#2F2F3C", color:"#CCFF01"}}>Ver más</Link>
                </Card.Body>
              </Card>
              <Card >
                <Card.Img variant="top" src="https://sporting.vtexassets.com/arquivos/ids/1230309-800-800?v=638494100983330000&width=800&height=800&aspect=true" />
                <Card.Body>
                  <Card.Title>Accesorios</Card.Title>
                  <Link to="/PaginaError404" className="btn" style={{background:"#2F2F3C", color:"#CCFF01"}}>Ver más</Link>
                </Card.Body>
              </Card>
              <Card >
                <Card.Img variant="top" src="https://sporting.vtexassets.com/arquivos/ids/1134201-800-800?v=638463763823230000&width=800&height=800&aspect=true" />
                <Card.Body>
                  <Card.Title>Ofertas</Card.Title>
                  <Link to="/PaginaError404" className="btn" style={{background:"#2F2F3C", color:"#CCFF01"}}>Ver más</Link>
                </Card.Body>
              </Card>
           
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BasicExample;
