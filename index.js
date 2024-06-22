const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./models.js');
const auth = require('./auth.js');

const app = express();
const port = process.env.PORT || 8080;

const Movies = Models.Movie;
const Users = Models.User;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cfDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());
app.use(morgan('common'));

// Initialize auth module
auth(app); // Ensure auth module sets up passport middleware correctly

// Middleware to secure API with JWT
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

// Welcome message
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

// Movies endpoints

// GET all movies (requires JWT authentication)
app.get('/movies', jwtAuth, (req, res) => {
    Movies.find()
        .then(movies => {
            res.status(200).json(movies);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET a movie by title (requires JWT authentication)
app.get('/movies/:title', jwtAuth, (req, res) => {
    const title = req.params.title;
    Movies.findOne({ Title: title })
        .then(movie => {
            if (movie) {
                res.status(200).json(movie);
            } else {
                res.status(404).send('Movie not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET movies by genre name (requires JWT authentication)
app.get('/movies/genre/:genreName', jwtAuth, (req, res) => {
    const genreName = req.params.genreName;
    Movies.find({ 'Genre.Name': genreName })
        .then(movies => {
            if (movies.length > 0) {
                res.status(200).json(movies);
            } else {
                res.status(404).send('Genre not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET movies by director name (requires JWT authentication)
app.get('/movies/directors/:directorName', jwtAuth, (req, res) => {
    const directorName = req.params.directorName;
    Movies.find({ 'Director.Name': directorName })
        .then(movies => {
            if (movies.length > 0) {
                res.status(200).json(movies);
            } else {
                res.status(404).send('Director not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// POST a new movie (requires JWT authentication)
app.post('/movies', jwtAuth, (req, res) => {
    Movies.create(req.body)
        .then(movie => {
            res.status(201).json(movie);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// PUT/update a movie by ID (requires JWT authentication)
app.put('/movies/:movieId', jwtAuth, (req, res) => {
    const movieId = req.params.movieId;
    Movies.findByIdAndUpdate(movieId, req.body, { new: true })
        .then(movie => {
            if (movie) {
                res.status(200).json(movie);
            } else {
                res.status(404).send('Movie not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// DELETE a movie by ID (requires JWT authentication)
app.delete('/movies/:movieId', jwtAuth, (req, res) => {
    const movieId = req.params.movieId;
    Movies.findByIdAndRemove(movieId)
        .then(movie => {
            if (movie) {
                res.status(200).send('Movie deleted successfully');
            } else {
                res.status(404).send('Movie not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Users endpoints

// GET all users (requires JWT authentication)
app.get('/users', jwtAuth, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET a user by username (requires JWT authentication)
app.get('/users/:Username', jwtAuth, (req, res) => {
    const username = req.params.Username;
    Users.findOne({ Username: username })
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// POST a new user (registration)
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
        .then(user => {
            if (user) {
                return res.status(400).send(req.body.Username + ' already exists');
            } else {
                Users.create(req.body)
                    .then(newUser => {
                        res.status(201).json(newUser);
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).send('Error: ' + err);
                    });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// PUT/update user information by username (requires JWT authentication)
app.put('/users/:Username', jwtAuth, (req, res) => {
    const username = req.params.Username;
    Users.findOneAndUpdate({ Username: username }, req.body, { new: true })
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// DELETE a user by username (requires JWT authentication)
app.delete('/users/:Username', jwtAuth, (req, res) => {
    const username = req.params.Username;
    Users.findOneAndDelete({ Username: username })
        .then(user => {
            if (user) {
                res.status(200).send(username + ' was deleted');
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// POST a movie to a user's list of favorites (requires JWT authentication)
app.post('/users/:Username/favorites/:MovieID', jwtAuth, (req, res) => {
    const username = req.params.Username;
    const movieID = req.params.MovieID;

    Users.findOneAndUpdate(
        { Username: username },
        { $addToSet: { FavoriteMovies: movieID } },
        { new: true }
    )
    .then(user => {
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user.FavoriteMovies);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// DELETE a movie from a user's list of favorites (requires JWT authentication)
app.delete('/users/:Username/favorites/:MovieID', jwtAuth, (req, res) => {
    const username = req.params.Username;
    const movieID = req.params.MovieID;

    Users.findOneAndUpdate(
        { Username: username },
        { $pull: { FavoriteMovies: movieID } },
        { new: true }
    )
    .then(user => {
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user.FavoriteMovies);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
