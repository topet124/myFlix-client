import React from "react";
import axios from "axios";

import { connect } from "react-redux";
// #0
import { setMovies } from "../../actions/actions";

import { Col, Row, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import "./main-view.scss";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavbarView } from "../navbar-view/navbar-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";

import MoviesList from "../movies-list/movies-list";


class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://myflix39.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }
  /* When a user successfully logs in, this function updates 
  the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  //When a user successfully registers
  onRegistration(register) {
    this.setState({
      register,
    });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
   let { movies } = this.props;
   let { user } = this.state;

    /* If there is no user, the LoginView is rendered. If 
      there is a user logged in, the user details are *passed 
      as a prop to the LoginView*/

    return (
      <Router>
        <NavbarView user={user} />
        <div className="main-view">
          {/*If the state of `selectedMovie` is not null, that 
        selected movie will be returned otherwise, all *movies
        will be returned*/}

          <Row className="main-view justify-content-md-center">
            {/*main movie view*/}
            <Route
              exact
              path="/"
              render={() => {
                //loginview rendered when no user is loggedin, else user detail is used as prop to loginview
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                //render empty page if no movie is loaded
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movie={movies} />;
              }}
            />
            <Route
              path="/login"
              render={() => {
                if (user) {
                  return <Redirect to="/" />;
                }
                return (
                  <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
                );
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (user) {
                  return <Redirect to="/" />;
                }
                return (
                  <Col>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }
                if (movies.length === 0) {
                  return <div className="main-view" />;
                }
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            {/*genre view*/}
            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      ;
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.genre.name === match.params.name)
                          .genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            {/*director view*/}
            <Route
              path="/director/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      ;
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.director.name === match.params.name
                        ).director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            {/*profile view*/}
            <Route
              path={`/users/:user`}
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      ;
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <ProfileView
                      movies={movies}
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      user={user === match.params.user}
                      history={history}
                      removeFavorite={(_id) => this.removeFavorite(_id)}
                      selectedFavorite={(e) => this.selectedFavorite(e)}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </div>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  //map component state to props for store through connect()
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView); 