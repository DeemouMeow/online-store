import React, { useState } from "react"
import { useTypedSelector } from "../hooks/redux";
import { Button, Spinner } from "react-bootstrap";
import BasketDeviceItem from "../components/BasketDeviceItem";
import List from "../components/List";
import "../styles/pages/basket.css";

const Basket = () => {
  const basketItems = useTypedSelector(state => state.basketReducer.devices);
  const deviceLoading = useTypedSelector(state => state.deviceReducer.isLoading);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isDeleted, setIsDelted] = useState<boolean>(false);

  if (deviceLoading) {
    return <Spinner />;
  }

  return (
    <div className="basket">
      {basketItems.length
        ?
        <div className="basket_container">
          <List
            className="basket_list"
            items={basketItems}
            renderItems={device => <BasketDeviceItem key={device.id}
              basketDevice={device}
              setTotalPrice={setTotalPrice}
              isDeleted={isDeleted}
              setIsDeleted={setIsDelted} />} />
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