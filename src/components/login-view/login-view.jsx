import axios from 'axios'
import React, { useState } from 'react';
import './login-view.scss';
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
;


export function LoginView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      /* Send a request to the server for authentication */
      axios.post(`https://myflix39.herokuapp.com/login?Username=${Username}&Password=${Password}`,
        )
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    };


  return (
     <Form id="login-view">
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleSubmit}>
        Submit
      </Button>
        <button type="button" >Signup here</button>
    </Form>
    
    
  );
}
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};

