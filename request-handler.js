/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var fs = require('fs');

var messages = {
  '/classes/room1': [],
  '/room1/': []
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "Origin, Content-Type, Accept",
  "access-control-max-age": 10 // Seconds.
};

var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/html";
  response.writeHead(statusCode, headers);
  console.log(request.url);
  var shortURL = parseURL(request.url);
  console.log(request.url);
  var html, client, reset, styles;
  if (request.url === '/') {
    html = fs.readFileSync('./client/index.html');
      response.write(html);
      response.end();
  }
  if (request.url === '/client.js') {
    client = fs.readFileSync('./client/client.js');
      response.write(client);
      response.end();
  }
  if (request.url === '/css/reset.css') {
    reset = fs.readFileSync('./client/css/reset.css');
      response.write(reset);
      response.end();
  }
  if (request.url === '/css/styles.css') {
    styles = fs.readFileSync('./client/css/styles.css');
      response.write(styles);
      response.end();
  }
  if (request.method === "GET"){
    if (messages[shortURL]){
      response.writeHead(200, headers);
      response.end(JSON.stringify(messages[shortURL]));
    } else {
      response.writeHead(404, headers);
      response.end("FILE NOT FOUND");
    }
  } else if (request.method === "POST"){
    if (!messages[shortURL]) {
      messages[shortURL] = [];
    }
    request.addListener("data", function(data) {
      messages[shortURL].push(JSON.parse(data));
    });
    response.writeHead(201, headers);
    response.end("Success");
  } else {
    response.writeHead(406, headers);
    response.end("Please submit only GET or POST requests");
  }
};

var parseURL = function(url) {
  return url.substr(21,url.length);
};

exports.handleRequest = handleRequest;