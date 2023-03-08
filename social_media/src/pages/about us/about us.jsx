import Topbar from "../../components/topbar/Topbar";
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {useContext} from "react";
import AppContext from "../../context/appContext";



export default function AboutUS(){

    const {  theme } = useContext(AppContext);
    return(
        <div>
            <Topbar/>
            
            <Card>
      <Card.Body>About Us</Card.Body>
    </Card>
      <Container id={theme}>
        <Row>
          <Col className="columns">1 of 1</Col>
          <Col className="columns">1 of 1</Col>
          <Col className="columns">1 of 1</Col>
        </Row>
        <Row>
          <Col className="columns">1 of 1</Col>
          <Col className="columns">1 of 1</Col>
          <Col className="columns">1 of 1</Col>
        </Row>
      </Container>
    </div>
     
    )
}