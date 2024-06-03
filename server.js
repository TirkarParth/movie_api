// server.js

// Import the http module
const http = require('http');

// Define the port to listen on
const PORT = 8080;

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200; // Set the response status code to 200 (OK)
  res.setHeader('Content-Type', 'text/plain'); // Set the content type to plain text
  res.end('Hello, World!\n'); // Send a response to the client
});

// Start the server and listen on the defined port
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});