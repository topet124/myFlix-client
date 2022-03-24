import React from 'react';
import PropTypes from 'prop-types';
import { Card,Button } from "react-bootstrap";
import './movie-card.scss';


import { Link } from "react-router-dom";


export class MovieCard extends React.Component{
    render(){
        const { movie, onMovieClick } = this.props;

        return (
      <Card id="movie-card">
         <Card.Img variant="top" src={movie.imagepath}/>
        <Card.Body>
          <Card.Title >{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary" type="button">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
    }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    imagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};