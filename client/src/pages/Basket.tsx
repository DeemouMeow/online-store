import React, { useState } from 'react'
import { useTypedSelector } from '../hooks/redux';
import { Button, Container } from 'react-bootstrap';
import BasketDeviceItem from '../components/BasketDeviceItem';

const Basket = () => {
  const { devices, error, isLoading } = useTypedSelector(state => state.basketReducer);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div className="basket">
      {devices.length
        ?
        <div className="basket_container">
          {devices.map(device =>
            <BasketDeviceItem key={device.deviceId} basketDevice={device} setTotalPrice={setTotalPrice} />)}
          <div className="order_info mt-5">
            <h2>Total: {totalPrice} Rub</h2>
            <Button className="order_btn">Order</Button>
          </div>
        </div>
        :
        <h1 style={{textAlign: "center"}}>There are no items in basket!</h1>
      }
    </div>
  )
}

export default Basket;