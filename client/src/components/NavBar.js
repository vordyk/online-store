import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
        const {user} = useContext(Context)
        const navigate = useNavigate();
        const logOut = () => {
            localStorage.removeItem("token");
            user.setUser({});
            user.setIsAuth(false)
        }

        return (
            <>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <NavLink style={{color: "white"}} to={SHOP_ROUTE}>Купить Девайс</NavLink>
                        {user.isAuth ?
                            <Nav className="ml-auto" style={{color: 'white'}}>
                                <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
                                <Button variant={"outline-light"} onClick={() => logOut()} className="">Выйти</Button>
                            </Nav>
                            :
                            <Nav className="ml-auto" style={{color: 'white'}}>
                                <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                            </Nav>
                        }
                    </Container>
                </Navbar>
                <br/>
            </>
        )
    }
)
export default NavBar;