import React from 'react';
import axios from 'axios';
import { Col, Row,Button } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import './main-view.scss';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView} from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {

  constructor(){
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
    }
/*When a movie is clicked, this 
function is invoked and updates the state of the `selectedMovie`
 *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
   //When a user successfully registers
  onRegistration(register) {
    this.setState({
      register,
    });
  }

  getMovies(token) {
  axios.get('https://myflix39.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    // Assign the result to the state
    this.setState({
      movies: response.data
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}


  /* When a user successfully logs in, this function updates 
  the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
}
onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setState({
    user: null
  });
}


  render() {
  const { movies, selectedMovie, user, register } = this.state;


  if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);


  /* If there is no user, the LoginView is rendered. If 
  there is a user logged in, the user details are *passed 
  as a prop to the LoginView*/

  if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

  if (movies.length === 0) return <div className="main-view" />;


  

  return (
    <div className="main-view">

      <Button variant="primary" type="button" onClick={() => { this.onLoggedOut() }}>
        logout
      </Button>
      

      {/*If the state of `selectedMovie` is not null, that 
      selected movie will be returned otherwise, all *movies
       will be returned*/}

      {selectedMovie
      ? (
        <Row>
          <Col md={8}>
             <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          </Col>
        </Row>
        )
          : (
        <Row className="justify-content-md-center">
          {movies.map(movie => (
           <Col md={4}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col> 
          ))}
        </Row>
      )
        }
    </div>
  );
}
}