 # Movie API Project

This project implements a basic Movie API server using Node.js. The server listens for incoming requests and serves different HTML files based on the requested URL. Additionally, it logs all requests along with timestamps to a log file.

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone this repository to your local machine.

2. Navigate to the project directory:
   ```bash
   cd movie_api
3. Install dependencies: 
       ```bash
       npm install


Usage
To start the server, run the following command: 
       ```bash
       node server.js

The server will start listening on port 8080. You can access the API endpoints by visiting http://localhost:8080.

Files and Directories

server.js: Contains the main server code.
index.html: HTML file served for requests not containing "documentation" in the URL.
documentation.html: HTML file served for requests containing "documentation" in the URL.
log.txt: Log file containing request URLs and timestamps.
Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.
