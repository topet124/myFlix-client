import React, { useState } from 'react';
import PropTypes from "prop-types";


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
 
     
      <form>
      <label>
        Username:
        <input type="text" value={Username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={Password} onChange={e => setPassword(e.target.value)} />
      </label>
       <label>
        Email:
        <input type="text" value={Email} onChange={e => setEmail(e.target.value)} />
      </label>
       <label>
        Birthday:
        <input type="date" value={Birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form> 
      

    
      

  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};