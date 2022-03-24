import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './navbar-view.scss';

//signout method
export function NavbarView({user}) {
    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };
// Token authentication method
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
        <Navbar className="main-nav" sticky="top" expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Brand className="navbar-logo" href="/">MYflix</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link href="/profile"> <h4>Welcome {user}</h4></Nav.Link>
                        )}
                        {isAuth() && (
                            <Button variant="primary" type="button"  onClick={() => {
                                onLoggedOut()
                            }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/">Login</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register">Register</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
