import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Container,  Button } from "react-bootstrap";

import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick} = this.props;

    return (
      <div className="movie-view">
        <Card id="movie-view">
                            <Card.Body>
                            <Card.Img id="movie-view-image" variant="top" src={movie.imagePath} />
                            <Card.Title id="movoie-title" className="movie-title">{movie.title}</Card.Title>
                            <Card.Text id="movie-description" className="movie-description">
                                {movie.description}</Card.Text>
                            <Card.Text id="movie-director" className="movie-director">
                                Director: {movie.director.name}</Card.Text>
                            <Card.Text id="movie-genre" className="movie-gerne">
                                Genre: {movie.genre.name}</Card.Text>
                            
                            </Card.Body>
                        </Card>
                        <Button id="movie-view-button" onClick={() => { onBackClick(null); }}>Back</Button>
                        <Button id="movie-view-button" onClick={() => {}}>Add to favorites</Button>

       </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
    })
    };
    