import React, { FC, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import TypeBar from "../components/UI/TypeBar";
import BrandBar from "../components/UI/BrandBar";
import Devices from "../components/Devices";
import Pages from "../components/Pages";
import { useAppDispatch, useTypedSelector } from "../hooks/redux";
import { deviceActions } from "../store/action creators";

const Shop: FC  = () => {
  const dispatch = useAppDispatch();
  const deviveLoading = useTypedSelector(state => state.deviceReducer.isLoading);
  const { getDevices } = deviceActions;
  const { limit, page } = useTypedSelector(state => state.paginationReducer);
  const selectedBrand = useTypedSelector(state => state.brandReducer.selectedBrand);
  const selectedType = useTypedSelector(state => state.typeReducer.selectedType);

  useEffect(() => {
    dispatch(getDevices({brandId: selectedBrand?.id || null, typeId: selectedType?.id || null, limit, page}));
  }, []);

  useEffect(() => {
    dispatch(getDevices({brandId: selectedBrand?.id || null, typeId: selectedType?.id || null, limit, page}));
  }, [selectedBrand, selectedType, limit, page]);

  if(deviveLoading) return <Spinner/>;

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar/>
          <BrandBar/>
        </Col>
        <Col md={9}>
          <Devices/>
          <Pages/>
        </Col>
      </Row>
    </Container>
  )
}

export default Shop;