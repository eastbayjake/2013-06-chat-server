/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var defaultCorsHeaders = require("./basic-server.js").headers;
var messages = {
  '/classes/room1': []
};
var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  //if request.url === something, response.end (something)
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  response.writeHead(statusCode, headers);
  request.url = parseURL(request.url);
  if (request.method === "GET"){
    console.log(request.url);
    if (messages[request.url]){
      response.writeHead(200, headers);
      response.end(JSON.stringify(messages[request.url]));
    } else {
      response.writeHead(404, headers);
      response.end("FILE NOT FOUND");
    }
  } else if (request.method === "POST"){
    if (!messages[request.url]) {
      messages[request.url] = [];
    }
    request.addListener("data", function(data) {
      messages[request.url].push(JSON.parse(data));
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