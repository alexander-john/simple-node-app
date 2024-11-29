// Import the http module
const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
  // Set the response HTTP header
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send a response
  res.end('Hello, World!');
});

// Specify the port the server will listen on
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
