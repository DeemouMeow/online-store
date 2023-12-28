import React, { FC, useState } from "react"
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux";
import Modal from "./Modal";
import ProfileModal from "../modals/ProfileModal";
import { routes } from "../../pages/routes/routes";
import { userActions } from "../../store/action creators";

const NavBar: FC = () => {
    const [profileModal, setProfileModal] = useState<boolean>(false);
    const { isAuth, user } = useTypedSelector(state => state.userReducer);
    const { logout } = userActions;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <NavLink style={{ color: "white" }} to={routes.shop}>Device Shop</NavLink>
                    <Modal visible={profileModal} setVisible={setProfileModal}>
                        <ProfileModal setVisible={setProfileModal} />
                    </Modal>
                    {isAuth ?
                        <Nav className="ml-auto">
                            <Button variant="outline-light" onClick={() => setProfileModal(true)}>Profile</Button>
                            <Button className="ml-3" variant="outline-light" onClick={() => dispatch(logout())}>Logout</Button>
                        </Nav>
                        :
                        <Nav className="ml-auto">
                            <Button onClick={() => navigate(routes.login)}
                                variant="outline-light">Sign In</Button>
                        </Nav>
                    }
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;