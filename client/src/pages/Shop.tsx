import React, { FC, useCallback, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import TypeBar from "../components/UI/TypeBar";
import BrandBar from "../components/UI/BrandBar";
import Devices from "../components/Devices";
import Pages from "../components/Pages";
import { useAppDispatch, useTypedSelector } from "../hooks/redux";
import { brandActions, deviceActions, typeActions } from "../store/action creators";

const Shop: FC  = () => {
  const dispatch = useAppDispatch();
  const deviveLoading = useTypedSelector(state => state.deviceReducer.isLoading);
  const { getDevices } = deviceActions;
  const { limit, page } = useTypedSelector(state => state.paginationReducer);
  const selectedBrand = useTypedSelector(state => state.brandReducer.selectedBrand);
  const selectedType = useTypedSelector(state => state.typeReducer.selectedType);
  const getBrands = useCallback(() => dispatch(brandActions.getBrands()), []);
  const getTypes = useCallback(() => dispatch(typeActions.getTypes()), []);

  useEffect(() => {
    console.log("Mount shop");
    getTypes();
    getBrands();
    dispatch(getDevices({brandId: selectedBrand?.id || null, typeId: selectedType?.id || null, limit, page}));
  }, []);

  useEffect(() => {
    dispatch(getDevices({brandId: selectedBrand?.id || null, typeId: selectedType?.id || null, limit, page}));
  }, [selectedBrand, selectedType, limit, page]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar/>
          <BrandBar/>
        </Col>
        <Col md={9}>
          {deviveLoading && <Spinner/>}
          <Devices/>
          <Pages/>
        </Col>
      </Row>
    </Container>
  )
}

export default Shop;