import React, { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import TypeBar from '../components/UI/TypeBar';
import BrandBar from '../components/UI/BrandBar';
import Devices from '../components/Devices';

const Shop: FC  = () => {
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar/>
          <BrandBar/>
        </Col>
        <Col md={9}>
          <Devices/>
        </Col>
      </Row>
    </Container>
  )
}

export default Shop;