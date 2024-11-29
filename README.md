# Why a basic node server is important

### Browser Initiates a Request
When you type the URL http://localhost:3000 into your browser and hit Enter,
The browser interprets the URL. localhost tells the browser to communicate with 
a server on your own machine (the computer you're using).
:3000 specifies the port the browser should connect to. 

### Browser Resolves the Domain
For localhost, no actual network request leaves your machine. Instead,
your computer’s operating system resolves localhost to 127.0.0.1 (the loopback IP address for your machine). This ensures that your browser connects to a server running locally.

### TCP Connection Established
The browser opens a TCP (Transmission Control Protocol) connection to the server on port 3000. This step is essential for data transmission between the browser and the server.

### Browser Sends an HTTP Request
The browser sends an HTTP request to the server.
For a basic request to http://localhost:3000, the request looks something like this:
```bash
GET / HTTP/1.1
Host: localhost:3000
Connection: keep-alive
User-Agent: [Your browser's user agent]
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
```

### Key components of the request:
- HTTP Method: GET is the default method when you type a URL in the browser.
- Path: / represents the root of the server.
- Host: Specifies the server's domain and port (localhost:3000).
- Headers: Include metadata like browser type (User-Agent) and acceptable content types (Accept).

### Node.js Server Receives the Request
Your Node.js server (created with http.createServer) listens on port 3000 and receives the request.
The server processes the request using the provided callback function in http.
```javascript
createServer((req, res) => { ... }).
```
- req (Request): Contains details about the incoming request 
(e.g., method, headers, URL).
- res (Response): Used to send a response back to the browser.

### Server Sends an HTTP Response
The server sends an HTTP response back to the browser, which looks something 
like this:
```bash
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 13
Hello, World!
```
Key components of the response:
- Status Code: 200 OK indicates the request was successful.
- Headers: Metadata about the response (e.g., Content-Type: text/plain).
- Body: Contains the actual data (in this case, Hello, World!).

### Browser Receives the Response
The browser receives the response from the server and reads its contents:
- It interprets the HTTP status code (e.g., 200 to mean success).
- It processes the headers to understand how to handle the data (e.g.,
Content-Type tells the browser to treat the data as plain text).

### Browser Renders the Response
Based on the Content-Type header, the browser determines how to display the
response:
- For text/plain, it displays the raw text in the browser window.
- For more complex responses (e.g., HTML or JSON), the browser processes the content accordingly.
In this case, the browser displays:
```bash
Hello, World!
```

### Connection is Managed
- If the Connection: keep-alive header is present (as it typically is), the TCP connection remains open for further requests.
- If not, the connection closes after the response.

## But why did the server respond the way it did?

### What Makes the Server Respond the Way It Does?
The server’s behavior is determined by the logic you write in its code. In the example we looked at, the Node.js server responds to all requests with the same message (`Hello, World!`). This is because the logic inside the `http.createServer` callback does not differentiate between request types (e.g., GET, POST).

Example logic:
```javascript
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});
```
- `req`: Represents the HTTP request the server receives (including method, URL, headers, etc.).
- `res`: Represents the HTTP response the server sends back.

The server doesn't inherently "know" what to do—it simply follows the instructions defined in the callback function. You can make the response conditional based on the request method or URL.