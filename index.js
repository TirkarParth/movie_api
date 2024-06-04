const express = require("express");
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const uuid = require("uuid");

const app = express();

// Mock data
let movies = [
  {
    Title: "Inception",
    Genre: { name: "Sci-Fi", description: "Science fiction film" },
    Director: { name: "Christopher Nolan", bio: "British-American filmmaker" },
    Actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
  },
  {
    Title: "The Dark Knight",
    Genre: { name: "Action", description: "Action film" },
    Director: { name: "Christopher Nolan", bio: "British-American filmmaker" },
    Actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  }
];

let Users = [
  {
    id: "1",
    username: "john_doe",
    email: "john@example.com",
    password: "123456",
    favoriteMovies: ["Inception"]
  }
];

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), { flags: "a" });

// Setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Movie API!");
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

// Get data about a single movie by title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.Title === title);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send("Movie not found");
  }
});

// Get data about a genre by name
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.Genre.name === genreName)?.Genre;
  if (genre) {
    res.json(genre);
  } else {
    res.status(404).send("Genre not found");
  }
});

// Get data about a director by name
app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.Director.name === directorName)?.Director;
  if (director) {
    res.json(director);
  } else {
    res.status(404).send("Director not found");
  }
});

app.get("/users", (req, res) => {
  res.json(Users);
});

// Adds data for a new user to our list of users
app.post("/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.username || !newUser.email || !newUser.password) {
    return res.status(400).send("All fields are required");
  }
  newUser.id = uuid.v4();
  Users.push(newUser);
  res.status(201).json(newUser);
});

// Add favorite movies to user's favorite movies list
app.post("/users/:username/:movieTitle", (req, res) => {
  const { username, movieTitle } = req.params;
  const user = Users.find(user => user.username === username);
  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(201).json("Movie added to user's favorite list successfully");
  } else {
    res.status(404).send("User not found");
  }
});

// Update user data
app.put("/users/:username", (req, res) => {
  const { username } = req.params;
  const user = Users.find(user => user.username === username);
  if (user) {
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    res.status(200).send("User updated successfully");
  } else {
    res.status(404).send("User not found");
  }
});

// Delete user by username
app.delete("/users/:username", (req, res) => {
  const { username } = req.params;
  const userIndex = Users.findIndex(user => user.username === username);
  if (userIndex !== -1) {
    Users.splice(userIndex, 1);
    res.status(200).send("User deleted successfully");
  } else {
    res.status(404).send("User not found");
  }
});

// Remove favorite movies from user's favorite movies list
app.delete("/users/:username/:movieTitle", (req, res) => {
  const { username, movieTitle } = req.params;
  const user = Users.find(user => user.username === username);
  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(movie => movie !== movieTitle);
    res.status(200).json("Movie removed from favorite list successfully");
  } else {
    res.status(404).send("User not found");
  }
});

// Serve documentation.html
app.get("/documentation", (req, res) => {
  res.sendFile(path.join(__dirname, "public/documentation.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something is broken!");
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
