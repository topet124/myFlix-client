import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./profile-view.scss";

export class FavoriteMovie extends React.Component {

    render() {
        const { favoriteMovies, removeFavorite, movies } = this.props;

        // filter users favorite movies from movies list passed as props
        const favMovies = movies.filter(mov => favoriteMovies.includes(mov._id));
        return (
          <div>
              <h2>Favorite Movie</h2>
            <div className="row">
              
              {favMovies.map((movies) => {
                return (
                  <div className="col-md-4 fav-movies" key={movies._id}>
                    <img src={movies.imagepath} />
                    <Link to={`/movies/${movies._id}`}>
                      <h4>{movies.title}</h4>
                    </Link>
                    <Button
                      variant="danger"
                      value={movies._id}
                      onClick={() => removeFavorite(movies._id)}
                    >
                      Remove movie
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        );
    }
}