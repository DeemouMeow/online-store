import React, { FC } from "react";
import { IDevice } from "../types/models/IDevice";
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import url from "../assets/star-mini.png";
import { useTypedSelector } from "../hooks/redux";
import "../styles/device_item.css";

interface IDeviceItemProps {
    device: IDevice;
}

const DeviceItem: FC<IDeviceItemProps> = ({ device }) => {
    const { brands } = useTypedSelector(state => state.brandReducer);
    const navigate = useNavigate();
    
    return (
        <Col md={3} className="mt-3" onClick={() => navigate(`/device/${device.id}`)}>
            <Card className="device_card">
                <Image width={150} height={150} src={"http://localhost:5000/api/" + device.img}/>
                <div className="mt-1 text-black-50 d-flex justify-content-between align-items-center">
                    <div>{brands.find(brand => brand.id === device.brandId)?.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={url}/>
                    </div>
                </div>
                <div className="device_name">{device.name}</div>
            </Card>
        </Col>
    );
}

export default DeviceItem;