import React from 'react';
import { Navbar, Button, Nav, Container, Badge, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './navbar-view.scss';

export function NavbarView({ user }) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };


    return (
        <Navbar expand="lg md" sticky="top" bg="dark" variant="dark" className="navbar">
            <Container fluid >
                <Navbar.Brand href="/" className="brand"><Badge bg="light" text="danger">MY_FLIX</Badge></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse className="justify-content-end nav-collapse">
                    <Nav className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavItem className="navlink">
                            {isAuth() && (
                                <p>Welcome: <Link to={`/users/${user}`}><span className="user">{user}</span></Link></p>
                            )}
                        </NavItem>
                        <Nav.Link >
                            {isAuth() && (
                                <button className="logout_button" size="md" variant="dark" text="light" onClick={() => { onLoggedOut() }} ><p>Logout</p></button>
                            )}
                        </Nav.Link>
                        <NavItem>
                            {!isAuth() && (  //Hide login link if !isAuth
                                <Link to="/" className="login-signup"><h4>Login</h4></Link>
                            )}
                        </NavItem>

                        <NavItem>
                            {!isAuth() && ( //Hide signup link if !isAuth
                                <Link to="/register" className="login-Signup"><h4>Sign-up</h4></Link>
                            )}
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}