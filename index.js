const express = require('express');
const app = express();
const morgan = require('morgan');

const top10Movies = [
    { title: 'Movie 1', year: 2022 },
    { title: 'Movie 2', year: 2021 },
    { title: 'Movie 3', year: 2022 },
    { title: 'Movie 4', year: 2021 },
    { title: 'Movie 5', year: 2022 },
    { title: 'Movie 6', year: 2021 },
    { title: 'Movie 7', year: 2022 },
    { title: 'Movie 8', year: 2021 },
    { title: 'Movie 9', year: 2022 },
    { title: 'Movie 0', year: 2021 },
    // Add more movie objects here
    ];

// Serve static files from the public folder
app.use(express.static('public'));

//This line instructs Express to use the "combined" format for logging requests. The "combined" format includes the IP address of the client, the date and time of the request, the HTTP method, the requested URL, the HTTP status code, the size of the response in bytes, and the referrer and user agent headers.
app.use(morgan('combined'));


app.get('/movies', (req, res) => {
  res.json(top10Movies);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Movie API!');
});

// Error-handling middleware function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
      
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

  