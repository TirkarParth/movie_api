const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Use Morgan to log all requests
app.use(morgan('common'));

// Serve static documentation.html file from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Movie API!');
});

// Route for the /movies endpoint
app.get('/movies', (req, res) => {
  // Here you would typically fetch and return data about top 10 movies
  res.json({
    movies: [
      { title: 'The Shawshank Redemption', year: 1994 },
      { title: 'The Godfather', year: 1972 },
      { title: 'The Dark Knight', year: 2008 },
      { title: 'Pulp Fiction', year: 1994 },
      { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
      { title: 'Forrest Gump', year: 1994 },
      { title: 'Inception', year: 2010 },
      { title: 'Fight Club', year: 1999 },
      { title: 'The Matrix', year: 1999 },
      { title: 'Goodfellas', year: 1990 }
    ]
  });
});

// Route for the /documentation endpoint
app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'documentation.html'));
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Listen on port 8080
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
