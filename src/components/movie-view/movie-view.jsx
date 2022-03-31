
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Col, Container,  Button } from "react-bootstrap";
import { Link } from 'react-router-dom';


import './movie-view.scss';

export class MovieView extends React.Component {
   constructor() {
      super();
      this.state = {
         isFavorite: 'Mark as Favorite' //initial favorite state status.
      };
   }
   //favorite movie function
   selectedFavorite() {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      //changed favorite state status on action.
      this.setState({
         isFavorite: 'Movie added as favorite!'
      });
      //post selected movie by user to server as favorite.
      axios.put(`https://myflix39.herokuapp.com/users/${username}/movies/` + this.props.movie._id, {}, {
         headers: { Authorization: `Bearer ${token}` }
      })
         .then((response) => {
            console.log(response);
         })
         .catch((error) => {
            console.log(error);
         });
   }

  render() {
    const { movie, onBackClick} = this.props;

    return (
      <div className="movie-view">
        <Card id="movie-view">
                            <Card.Body>
                            <Card.Img id="movie-view-image" variant="top" src={movie.imagePath} />
                            <Card.Title id="movie-title" className="movie-title">{movie.title}</Card.Title>
                            <Card.Text id="movie-description" className="movie-description">
                                {movie.description}</Card.Text>
                             <Card.Text id="movie-director" className="movie-director">
                                Director: {movie.director.name} </Card.Text>
                                <Link to={`/director/${movie.director.name}`}>
                                 <Button variant="link">Director</Button>
                                 </Link>
                              <Card.Text id="movie-genre" className="movie-gerne">
                                Genre: {movie.genre.name}</Card.Text>
                                <Link to={`/genres/${movie.genre.name}`}>
                                 <Button variant="link">Genre</Button>
                                </Link>
                            
                            </Card.Body>
                        </Card>
                        <Button id="movie-view-button" onClick={() => { onBackClick(); }}> Back </Button>
                        <Button variant="secondary" size="sm" onClick={() => this.selectedFavorite()}>
                          {this.state.isFavorite}
                  </Button>

       </div>
    );
  }
}

MovieView.propTypes = {
   movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imagepath: PropTypes.string.isRequired,
      genre: PropTypes.shape({
         name: PropTypes.string.isRequired,
         description: PropTypes.string.isRequired
      }),
      director: PropTypes.shape({
         name: PropTypes.string.isRequired,
         bio: PropTypes.string.isRequired,
         birth: PropTypes.string
      }),
      actors: PropTypes.array,
      releasedyear: PropTypes.string
   }).isRequired,
   onBackClick: PropTypes.func.isRequired
};