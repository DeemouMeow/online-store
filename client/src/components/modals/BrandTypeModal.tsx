import React, { FC, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import Modal from '../UI/Modal';
import { useAppDispatch, useTypedSelector } from '../../hooks/redux';
import { brandActions, typeActions } from '../../store/action creators';

interface IBrandTypeModalProps {
    select: string;
    visible: boolean;
    setVisible: (status: boolean) => void;
}

const BrandTypeModal: FC<IBrandTypeModalProps> = ({ visible, setVisible, select }) => {
    select = select.toLowerCase();
    const isBrand = select === "brand";

    const error = useTypedSelector(state => isBrand ? state.brandReducer.error : state.typeReducer.error);
    const dispatch = useAppDispatch();
    const [name, setName] = useState<string>("");
    const append = isBrand ? brandActions.createBrand : typeActions.createType;

    function onAppend() {
        if (name) dispatch(append(name));
        setVisible(false);
    };

    function onClose() {
        setVisible(false);
    };

    return (
        <Modal visible={visible} setVisible={setVisible}>
            <Container className="d-flex flex-column align-items-center justify-content-around" style={{ height: 200 }}>
                <strong>Append {isBrand ? "brand" : "type"}</strong>
                <Form style={{ width: 400 }}>
                    <Form.Control
                        type="text"
                        placeholder={isBrand ? "brand name" : "type name"}
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </Form>
                {error && <strong>{error}</strong>}
                <div className="d-flex justify-content-end" style={{ width: "100%" }}>
                    <Button variant="outline-success" onClick={onAppend}>Append</Button>
                    <Button className="ml-2" variant="outline-danger" onClick={onClose}>Close</Button>
                </div>
            </Container>
        </Modal>
    );
}

export default BrandTypeModal;