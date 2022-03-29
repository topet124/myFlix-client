import React from 'react';
import axios from 'axios';
import { UserInfo } from './user-info';
import { FavoriteMovie } from './favorite-movies';
import { UpdateUser } from './update-user';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setUser, updateUser } from './actions';

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
           
                      
        };
  
    }

    
// get user token

componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getUser(accessToken);
        }
    }
// getting and updating users data

getUser = (token) => {
        const Username = localStorage.getItem('user');
        axios.get(`https://myflix39.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch((error) => {
                console.log(error);
            });

    };

//remove favorite movie
    removeFavorite(movie) {
        const token = localStorage.getItem('token');
        const Username = localStorage.getItem('user');
        axios.delete(`https://myflix39.herokuapp.com/users/${Username}/movies/${movie}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                alert('Movie was successfully removed');
                this.componentDidMount();
            })
            .catch((error) => {
                console.log(error);
            })
    }

   //enable users to edit and update profile
    handleUpdate = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://myflix39.herokuapp.com/users/${Username}`, {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday,

        },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                });
                localStorage.setItem('user', this.state.Username);
                const data = response.data;
                console.log(data);
                console.log(this.state.Username);
                alert("Your profile is updated");
                window.open(`./user/${Username}`, "_self");
            })
            .catch((error) => {
                console.log(error);
            });
    }; 

    //deregistering a user
    deleteUser(e) {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://myflix39.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response);
                alert("Your profile has been successfully deleted!");
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/', '_self');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //change the shown old value in the state to newly entered value 
    setUsername(value) {
        this.setState({ Username: value })
    }
    setPassword(value) {
        this.setState({ Password: value })
    }

    setEmail(value) {
        this.setState({ Email: value })
    }
    setBirthday(value) {
        this.setState({ Birthday: value })
    }

    render() {
        const { Username, Email, Birthday, FavoriteMovies } = this.state;
        const { movies } = this.props;
     return (  <Container className="mt-5">
                <Row>
                    <Col xs={12} sm={6} >
                        <Card bg="dark" text="light">
                            <Card.Header>Your Information</Card.Header>
                            <Card.Body>
                                <UserInfo
                                    name={Username}
                                    email={Email}
                                    birthday={Birthday}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3" xs={12} sm={6} >
                        <Card bg="dark" text="light">
                            <Card.Header>Update Your Information</Card.Header>

                            <Card.Body>
                                <UpdateUser
                                    user={this.state}
                                    handleUpdate={(user) => this.handleUpdate(user)}
                                    setUsername={(value) => this.setUsername(value)}
                                    setPassword={(value) => this.setPassword(value)}
                                    setEmail={(value) => this.setEmail(value)}
                                    setBirthday={(value) => this.setBirthday(value)}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                       <Row>
                    <Col>
                        <Card bg="dark" text="light">
                            <FavoriteMovie
                                favoriteMovies={FavoriteMovies}
                                removeFavorite={(item) => this.removeFavorite(item)}
                                selectedFavorite={(e) => this.selectedFavorite(e)}
                                movies={movies}
                            />
                        </Card>
                    </Col>
                </Row>
                     <div className="text-center">
                    <p variant="light">Hit the button below to delete account.</p>
                
            <Button variant="danger" onClick={(e) => this.deleteUser(e)}>
                        Delete Profile
                    </Button>
                    
                    <p variant="light">Note! deletion cannot be reversed.</p>
                </div>
                </Container> 
     )
    }
}

let mapStateToProps = state => {
    return {
        user: state.user,
        movies: state.movies
    }
}

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);
