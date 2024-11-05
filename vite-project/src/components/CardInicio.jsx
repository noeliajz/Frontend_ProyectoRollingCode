// src/components/Frase.jsx
import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Spinner from 'react-bootstrap/Spinner';

const CardInicio = ({ personaje }) => {
  return (
    <>
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={personaje.image} />
          <Card.Body>
            <Card.Title> {personaje.quote}</Card.Title>
            <Card.Text>
              This
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
};

export default CardInicio;
