import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';


import './registration-view.scss';

export function RegistrationView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');
  const [ Email, setEmail ] = useState('');
  const [ Birthday, setBirthday] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthday);
    /* Send a request to the server for authentication */
    /* then call props on registored user(username) */
    props.onRegistration(Username);
  };

  return (
 
      <CardGroup>
                        <Card id="regi-view" >
                            <Card.Body>
                                <Card.Title>Please register</Card.Title>
                                    <Form id="registration-view">
                                        <Form.Group>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={Username}
                                                onChange={e => setUsername(e.target.value)} 
                                                required 
                                                placeholder="Enter a username" 
                                            />
                                        </Form.Group>
                                        
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control 
                                                type="password"
                                                value={Password}
                                                onChange={e => setPassword(e.target.value)} 
                                                required
                                                placeholder="Enter a Password"
                                                minLength="8" 
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control 
                                                type="email"
                                                value={Email}
                                                onChange={e => setEmail(e.target.value)} 
                                                required
                                                placeholder="Enter your email adress" 
                                            />
                                        </Form.Group>

                                        <Button variant="primary"
                                            type="submit"
                                            onClick={handleSubmit}>
                                            Register
                                        </Button>
                                    </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
      
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};