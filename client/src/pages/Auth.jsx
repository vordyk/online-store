import React, {useContext, useState} from 'react'
import {Form, Card, Container, Button, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }

            user.setUser(user);
            user.setIsAuth(true)

            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container style={{height: window.innerHeight - 54}}
                   className="d-flex justify-content-center align-items-center">
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите email"
                        value={password}
                        type={"password"}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between mt-3">
                        {isLogin ? <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегестрируйстесь</NavLink>
                        </div> : <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизация</NavLink>
                        </div>}
                        <Button onClick={click} variant="outline-success" className="mt-3 align-self-end">{isLogin ? 'Войти' : 'Зарегестрироваться'}</Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth