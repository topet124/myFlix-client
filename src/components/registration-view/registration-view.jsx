import React, { useState } from 'react';
import axios from 'axios'
import PropTypes from "prop-types";
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link, Router } from "react-router-dom";


import './registration-view.scss';

export function RegistrationView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');
  const [ Email, setEmail ] = useState('');
  const [ Birthdate, setBirthdate ] = useState('');

  // Declare hook for each input
  const [ UsernameErr, setUsernameErr ] = useState('');
  const [ PasswordErr, setPasswordErr ] = useState('');
  const [ EmailErr, setEmailErr ] = useState('');
  const [ BirthdateErr, setBirthdateErr ] = useState('');
  

  // validate user inputs
const validate = () => {
    let isReq = true;
    if(!Username){
     setUsernameErr('Username Required');
     isReq = false;
    }else if(Username.length < 6){
     setUsernameErr('Username must be 6 characters long');
     isReq = false;
    }
    if(!Password){
     setPasswordErr('Password Required');
     isReq = false;
    }else if(Password.length < 8){
     setPasswordErr('Password must be 8 characters long');
     isReq = false;
    }
    if(!Email){
      setEmailErr('Please user valid email')
    } else if(Email.indexOf('@') === -1){
      setEmailErr('Please user valid email')
      isReq = false;
    }
    if(!Birthdate){
      setBirthdateErr('Please enter birthdate')
      isReq = false;
    }
    return isReq;
}

const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq ) {
      console.log(Username, Password);
        axios.post('https://myflix39.herokuapp.com/users', {
          Username: Username,
          Password: Password,
          Email: Email,
          Birthdate: Birthdate
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please login!');
          window.open('/', '_self');// the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(response => {
          alert('Unable to register');
          console.error(response);
          console.log('error registering this user')
         
        });
       
    }
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
                                                placeholder="Enter a username"/>
                                            {/* code added here to display validation error */}
                                            {UsernameErr && <p>{UsernameErr}</p>}
                                        
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
                                            {/* code added here to display validation error */}
                                            {PasswordErr && <p>{PasswordErr}</p>}
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control 
                                                type="email"
                                                value={Email}
                                                onChange={e => setEmail(e.target.value)} 
                                                required
                                                placeholder="Enter your email adress" />
                                                {EmailErr && <p>{EmailErr}</p>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Birthdate:</Form.Label>
                                            <Form.Control 
                                            type="date" 
                                            value={Birthdate} 
                                            onChange={e => setBirthdate(e.target.value)} 
                                            required
                                            placeholder="Enter your Birthdate"/>
                                            {BirthdateErr && <p>{BirthdateErr}</p>}
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
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
    }),
    onRegistration: PropTypes.func,
};
