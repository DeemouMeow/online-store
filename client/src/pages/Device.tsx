import React, { FC } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../hooks/redux";
import "../styles/pages/device.css";
import { basketActions } from "../store/action creators";

interface IDevicePageParams {
  id: string;
}

const Device: FC = () => {
  const { devices } = useTypedSelector(state => state.deviceReducer);
  const { id } = useParams<keyof IDevicePageParams>() as IDevicePageParams;
  const device = devices.find(device => device.id === +id);
  const dispatch = useAppDispatch();
  const addToBasket = () => dispatch(basketActions.addToBasket(+id));

  return (
    <Container className="m-3" style={{ maxWidth: "100%" }}>
      <Row>
        <Col md={4} className="device_image">
          <Image width={300} height={300} src={"http://localhost:5000/api/" + device?.img} />
        </Col>
        <Col md={4}>
          <Row className="raiting_container">
            <h2>Average user's rating:</h2>
            <div className="rating_star">
              {device?.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card className="device_info">
            <h3 style={{ textAlign: "center" }}>{device?.name}</h3>
            <div className="purchase_info">
              From: {device?.price} rubles
              <Button className="add_cart_btn" variant="outline-dark" onClick={addToBasket}
              >
                Add to cart
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-5">
        <h3 style={{ alignSelf: "center" }}>Characteristics:</h3>
        {device?.info.map((stat, index) =>
          <Row key={stat.id} style={{ fontSize: 20, background: index % 2 === 0 ? "transparent" : "lightgray", padding: 3 }}>
            {stat.title}: {stat.description}
          </Row>
        )}
      </Row>
    </Container>
  );
}

export default Device;