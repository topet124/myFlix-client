import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row } from 'react-bootstrap';

import './director-view.scss';

export function DirectorView({ director, onBackClick }) {
    console.log(director)
    return (
        <Container className="text-light mt-5">
            <Row className="directorview">
                <Col className="label">Director name: </Col>
                <Col className="value">{director.name} </Col>
            </Row>
            <Row className="directorview">
                <Col className="label">Bio: </Col>
                <Col className="value">{director.bio} </Col>
            </Row>
            <Row className="directorview">
                <Col className="label">Birth year: </Col>
                <Col className="value">{director.birth} </Col>
            </Row>
            <br />
            <Button className="text-center" size="sm" variant="primary" type='button' onClick={() => { onBackClick(null); }}>Back</Button>
        </Container >
    );
}


DirectorView.propTypes = {
    director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes,
        birth: PropTypes,
        death: PropTypes
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
    }