import React, { FC, useEffect, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import { userActions } from '../store/action creators';
import { routes } from './routes/routes';

const Authorization: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error } = useTypedSelector(state => state.userReducer);
  const { login, registration } = userActions;
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function sendData() {
    isLogin ? dispatch(login({ email, password })).then(data => typeof data.payload === "string" ? data : navigate(routes.shop))
            : dispatch(registration({ email, password })).then(data => typeof data.payload === "string" ? data : navigate(routes.shop));
  }

  return (
    <Container className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 40 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Login" : "Registration"}</h2>
        <Form className="d-flex flex-column mt-2">
          <Form.Control
            placeholder="Email"
            type="text"
            className="mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <Form.Control
            placeholder="Password"
            type="password"
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          {error && <strong style={{color: "red"}}>{error}</strong>}
          <Row className="d-flex justify-content-between mt-2 p-3">
            {
              isLogin
                ?
                <div>
                  Create an account <NavLink to="/registration">Register</NavLink>
                </div>
                :
                <div>
                  Enter in account <NavLink to="/login">Log in</NavLink>
                </div>
            }
            <Button onClick={sendData}>
              {isLogin ? "Log in" : "Register"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}

export default Authorization;