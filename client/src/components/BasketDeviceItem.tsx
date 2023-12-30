import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IBasketDevice } from "../types/models/IBasketDevice";
import { Row, Image, Button } from "react-bootstrap";
import { useAppDispatch, useTypedSelector } from "../hooks/redux";
import url from "../assets/star-mini.png";
import "../styles/basket_device_item.css";
import { basketActions } from "../store/action creators";


interface IBasketDeviceItemProps {
    basketDevice: IBasketDevice;
    setTotalPrice: (price: React.SetStateAction<number>) => void;
    isDeleted: boolean;
    setIsDeleted: (state: React.SetStateAction<boolean>) => void;
}

const BasketDeviceItem: FC<IBasketDeviceItemProps> = ({ basketDevice, setTotalPrice, isDeleted, setIsDeleted }) => {
    const dispatch = useAppDispatch();
    const devices = useTypedSelector(state => state.deviceReducer.devices);
    const device = devices.find(device => device.id === basketDevice.deviceId);
    const [count, setCount] = useState<number>(1);
    const [constant, setConstant] = useState<number>(1);
    const defaultPrice = device?.price || 0;
    const [price, setPrice] = useState<number>(defaultPrice);
    const itemsToBuy = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []);

    useEffect(() => {
        !isDeleted && setTotalPrice(prev => prev + defaultPrice * constant);
        setPrice(defaultPrice * count);
    }, [count]);

    const deleteDevice = useCallback(() => {
        setIsDeleted(true);
        setTotalPrice(prev => prev - price);
        dispatch(basketActions.deleteDevice(basketDevice));
    }, [price]);

    const selectItemsCount = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setCount(prev => {
            setConstant(+e.target.value - prev);
            return +e.target.value;
        });
        setIsDeleted(false);
    }, []);

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
            <div className="price_info" style={{ fontSize: 15 }}>
                <strong style={{ fontSize: 15 }}>
                    {price} Rub
                </strong>
                x{count}
            </div>
            <Row className="device_purchase_info">
                <select onChange={selectItemsCount}>
                    <option value="default" disabled>Select Count</option>
                    {itemsToBuy.map(count => <option key={count} value={count}>{count}</option>)}
                </select>
                <Button onClick={deleteDevice}>Delete</Button>
            </Row>
        </Row>
    );
}

export default React.memo(BasketDeviceItem);