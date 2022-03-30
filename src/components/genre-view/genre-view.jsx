import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Container } from 'react-bootstrap';

import './genre-view.scss';
export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick } = this.props;
        console.log('movie', genre)
        return (
            <Container className="text-light mt-5">
                <Row className="genreview">
                    <Col className="label">Genre name: </Col>
                    <Col className="value">{genre.name} </Col>
                </Row >
                <Row className="genreview">
                    <Col className="label">Genre Description: </Col>
                    <Col className="value">{genre.description} </Col>
                </Row >
                <br />
                <Button className="text-center" size="sm" variant="dark" type='submit' onClick={() => { onBackClick(null); }}>Back</Button>
            </Container >
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};