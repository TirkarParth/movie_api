// server.js

// Import the http module
const http = require('http');

// Import the url module
const url = require('url');

// Import the fs module to read files
const fs = require('fs');

// Define the port to listen on
const PORT = 8080;

/// Create an HTTP server
http.createServer((request, response) => {
    // Parse the request URL
    let addr = request.url;
    let q = new URL(addr, 'http://' + request.headers.host);
    let filePath = '';
  
    // Log the request URL and timestamp to log.txt
    fs.appendFile(
      'log.txt',
      'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n',
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Added to log.');
        }
      }
    );
  
    // Determine the file to serve based on the URL
    if (q.pathname.includes('documentation')) {
      filePath = __dirname + '/documentation.html';
    } else {
      filePath = __dirname + '/index.html';
    }
  
    // Read the file and send its content to the client
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('404 Not Found');
        response.end();
      } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
      }
    });
});

// Start the server and listen on the defined port
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
