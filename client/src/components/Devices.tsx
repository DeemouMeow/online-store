import React, { FC } from 'react'
import { useTypedSelector } from '../hooks/redux';
import DeviceItem from './DeviceItem';
import { Row } from 'react-bootstrap';

const Devices: FC = () => {
    const { devices } = useTypedSelector(state => state.deviceReducer);
    return (
        <Row className="d-flex">
            {devices.map(device =>
                <DeviceItem
                    key={device.id}
                    device={device}
                />)}
        </Row>
    );
}

export default Devices;