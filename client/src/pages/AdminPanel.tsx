import React, { FC, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import BrandTypeModal from '../components/modals/BrandTypeModal';
import DeviceModal from '../components/modals/DeviceModal';

const AdminPanel: FC = () => {
  const [select, setSelect] = useState<string>("");
  const [typeBarndVisible, setTypeBarndVisible] = useState<boolean>(false);
  const [deviceVisible, setDeviceVisible] = useState<boolean>(false);

  const handleType = () => {
    setSelect("Type");
    setTypeBarndVisible(true);
  };

  const handleBrand = () => {
    setSelect("Brand");
    setTypeBarndVisible(true);
  };

  const handleDevice = () => {
    setDeviceVisible(true);
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: "70vh" }}>
      <Button
        className="mt-3"
        variant="outline-dark"
        style={{ width: "100%" }}
        onClick={handleDevice}
      >
        Append device
      </Button>

      <Button
        className="mt-3"
        variant="outline-dark"
        style={{ width: "100%" }}
        onClick={handleType}
      >
        Append type</Button>

      <Button
        className="mt-3"
        variant="outline-dark"
        style={{ width: "100%" }}
        onClick={handleBrand}
      >
        Append brand</Button>
      <BrandTypeModal visible={typeBarndVisible} setVisible={setTypeBarndVisible} select={select}/>
      <DeviceModal visible={deviceVisible} setVisible={setDeviceVisible}/>
    </Container>
  )
}

export default AdminPanel;