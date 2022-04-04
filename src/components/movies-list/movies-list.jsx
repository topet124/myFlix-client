import React from "react";
import { connect } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

import { Col } from "react-bootstrap";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movie, visibilityFilter } = props;
  let filteredMovies = movie;

  if (visibilityFilter !== "") {
    filteredMovies = movie.filter((m) =>
      m.title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movie) return <div className="main-view" />;

  return (
    <>
      <Col md={12} style={{ margin: "1rem" }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) => (
        <Col md={4} key={m._id}>
          <MovieCard movie={m} />
        </Col>
      ))}
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
