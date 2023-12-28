import React, { FC, useCallback } from 'react'
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../pages/routes/routes';
import { useAppDispatch, useTypedSelector } from '../../hooks/redux';
import { userActions } from '../../store/action creators';

interface IProfileModalProps {
    setVisible: (status: boolean) => void;
}

const ProfileModal : FC<IProfileModalProps> = ({ setVisible }) => {
    const navigate = useNavigate();
    const { user } = useTypedSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const logout = useCallback(() => { 
        dispatch(userActions.logout());
        setVisible(false); 
    }, []);

    const handleBasket = () => {
        navigate(routes.basket);
        setVisible(false);
    }

    const handleAdmin = () => {
        navigate(routes.admin);
        setVisible(false);
    }

    return (
        <Container style={{height: 200}} className="d-flex flex-column align-items-center justify-content-center p-0">
            <Button variant="outline-dark" className="mt-3" style={{width: "100%" }} onClick={handleBasket}>Basket</Button>
            <Button disabled={!user?.roles.includes("Admin")} variant="outline-dark" className="mt-3" style={{width: "100%" }} onClick={handleAdmin}>Admin Panel</Button>
            <Button variant="outline-dark" className="mt-3" style={{width: "100%" }} onClick={logout}>Log out</Button>
        </Container>
    );
}

export default ProfileModal;