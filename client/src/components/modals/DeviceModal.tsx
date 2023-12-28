import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import Modal from '../UI/Modal';
import { useAppDispatch, useTypedSelector } from '../../hooks/redux';
import { IInfo } from '../../types/models/IInfo';
import { brandSlice } from '../../store/reducers/brandSlice';
import { typeSlice } from '../../store/reducers/typeSlice';
import { IBrand } from '../../types/models/IBrand';
import { IType } from '../../types/models/IType';
import { deviceActions } from "../../store/action creators";

interface IDeviceModalProps {
  visible: boolean;
  setVisible: (status: boolean) => void;
}

const DeviceModal: FC<IDeviceModalProps> = ({ visible, setVisible }) => {
  const dispatch = useAppDispatch();
  const { types, selectedType } = useTypedSelector(store => store.typeReducer);
  const { brands, selectedBrand } = useTypedSelector(store => store.brandReducer);
  const selectBrand = (brand: IBrand | null) => dispatch(brandSlice.actions.selectBrand(brand));
  const selectType = (type: IType | null) => dispatch(typeSlice.actions.selectType(type));
  const createDevice = (data: FormData) => dispatch(deviceActions.createDevice(data));
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [deviceInfo, setDeviceInfo] = useState<IInfo[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const appendInfo = () => setDeviceInfo([...deviceInfo, { id: Date.now(), title: "", description: "" }]);

  const deleteInfo = (id: number) => setDeviceInfo(deviceInfo.filter(info => info.id !== id));

  const selectImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.files?.item(0) || null), []);

  const changeInfo = (key: string, description: string, id: number) =>
    setDeviceInfo(deviceInfo.map(info => info.id === id ? { ...info, [key]: description } : info));

  const configureDevice = async () => {
    const data: any = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("brandId", selectedBrand?.id);
    data.append("typeId", selectedType?.id);
    data.append("info", JSON.stringify(deviceInfo));
    data.append("img", image);
    createDevice(data).then(data => setVisible(false));
  }

  useEffect(() => {
    selectBrand(null);
    selectType(null);
  }, []);

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Container className="d-flex flex-column align-items-center justify-content-around">
        <strong>Append device</strong>
        <Form style={{ width: 400 }} className="d-flex flex-column align-items-center justify-content-around">
          <Dropdown className="mt-3">
            <Dropdown.Toggle>
              {selectedType?.name || "Select type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {types.map(type =>
                <Dropdown.Item key={type.id} onClick={() => selectType(type)}>
                  {type.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="mt-3">
            <Dropdown.Toggle>
              {selectedBrand?.name || "Select brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map(brand =>
                <Dropdown.Item key={brand.id} onClick={() => selectBrand(brand)}>
                  {brand.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control type="text"
            placeholder="device name"
            className="mt-3"
            value={name}
            onChange={e => setName(e.target.value)} />
          <Form.Control type="number"
            placeholder="device price"
            className="mt-3"
            value={price}
            onChange={e => setPrice(+e.target.value)} />
          <Form.Control type="file"
            placeholder="device image"
            className="mt-3"
            onChange={selectImage} />

          <Button variant="outline-dark" onClick={appendInfo} className="mt-3">Append Info</Button>
          <Container className="mt-3" style={{ maxHeight: 150, overflow: "scroll", overflowX: "hidden" }}>
            {deviceInfo.map(info =>
              <Row className="mt-3" key={info.id}>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    placeholder="title"
                    onChange={e => changeInfo("title", e.target.value, info.id)} />
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    placeholder="description"
                    onChange={e => changeInfo("description", e.target.value, info.id)} />
                </Col>
                <Col md={4}>
                  <Button
                    onClick={() => deleteInfo(info.id)}
                    variant="outline-danger">Delete</Button>
                </Col>
              </Row>
            )}
          </Container>

        </Form>
        <div className="d-flex justify-content-end mt-3" style={{ width: "100%" }}>
          <Button variant="outline-success" onClick={configureDevice}>Append</Button>
          <Button className="ml-2" variant="outline-danger" onClick={() => setVisible(false)}>Close</Button>
        </div>
      </Container>
    </Modal>
  );
}

export default DeviceModal;