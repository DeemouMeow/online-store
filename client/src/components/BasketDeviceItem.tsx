import React, { FC, useCallback, useEffect, useState } from "react";
import { IBasketDevice } from "../types/models/IBasketDevice";
import { Row, Image, FormSelect, Button } from "react-bootstrap";
import { useAppDispatch, useTypedSelector } from "../hooks/redux";
import url from "../assets/star-mini.png";
import "../styles/basket_device_item.css";
import { basketActions } from "../store/action creators";


interface IBasketDeviceItemProps {
    basketDevice: IBasketDevice;
    setTotalPrice: (price: React.SetStateAction<number>) => void;
}

const BasketDeviceItem: FC<IBasketDeviceItemProps> = ({ basketDevice, setTotalPrice }) => {
    const dispatch = useAppDispatch();
    const { devices } = useTypedSelector(state => state.deviceReducer);
    const device = devices.find(device => device.id === basketDevice.deviceId);
    const [count, setCount] = useState<number>(1);
    const [price, setPrice] = useState<number>((device?.price || 0) * count);

    useEffect(() => {
        setTotalPrice(prev => prev + price);
    }, [price]);

    const deleteDevice = useCallback(() => {
        dispatch(basketActions.deleteDevice(basketDevice));
        setTotalPrice(prev => prev - price);
    },  []);
        

    return (
        <Row className="main">
            <div className="info_containter">
                <Image width={80} height={80} src={"http://localhost:5000/api/" + device?.img} />
                <div className="basket_device_info">
                    <strong>{device?.name}</strong>
                    <div className="basket_device_rating">
                        <div className="mr-2">{device?.rating}</div>
                        <Image width={18} height={18} src={url} />
                    </div>
                </div>
            </div>
            <div className="price_info" style={{fontSize: 15}}>
                <strong style={{fontSize: 15}}>
                    {price} Rub
                </strong>
                x{count}
            </div>
            <Row className="device_purchase_info">
                <FormSelect></FormSelect>
                <Button onClick={deleteDevice}>Delete</Button>
            </Row>
        </Row>
    );
}

export default BasketDeviceItem;