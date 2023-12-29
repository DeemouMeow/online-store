import React, { useState, useEffect, memo } from "react"
import { useAppDispatch, useTypedSelector } from "../hooks/redux";
import { Button, Container, Spinner } from "react-bootstrap";
import BasketDeviceItem from "../components/BasketDeviceItem";
import { deviceActions } from "../store/action creators";

const Basket = () => {
  const dispatch = useAppDispatch();
  const { devices, error, isLoading } = useTypedSelector(state => state.basketReducer);
  const deviceLoading = useTypedSelector(state => state.deviceReducer.isLoading);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isDelted, setIsDelted] = useState<boolean>(false);

  useEffect(() => {
    console.log("BasketMount");
    
    setTotalPrice(0);
    dispatch(deviceActions.getDevices());
  }, []);

  if (isLoading || deviceLoading) return <Spinner />

  return (
    <div className="basket">
      {devices.length
        ?
        <div className="basket_container">
          {devices.map(device =>
            <BasketDeviceItem key={device.id} basketDevice={device} setTotalPrice={setTotalPrice} isDeleted={isDelted} setIsDeleted={setIsDelted}/>)}
          <div className="order_info mt-5">
            <h2>Total: {totalPrice} Rub</h2>
            <Button className="order_btn">Order</Button>
          </div>
        </div>
        :
        <h1 style={{ textAlign: "center" }}>There are no items in basket!</h1>
      }
    </div>
  )
}

export default Basket;