/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var defaultCorsHeaders = require("./basic-server.js").headers;
var messages = [];
var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  //if request.url === something, response.end (something)
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  response.writeHead(statusCode, headers);
  if (request.url === "http://127.0.0.1:8080/classes/room1") {
    //we need to figure out how to wildcard the url
    //slash figure out the logic such that requests go to the right place
    if (request.method === "GET") {
      var outgoing_message = JSON.stringify(messages);
      response.writeHead(200, headers);
      response.end(outgoing_message);
    } else if (request.method === "POST") {
      console.log('request body ', request);
      request.addListener("data", function(data) {
        messages.push(JSON.parse(data));
        console.log(data);
      });
      response.writeHead(201, headers);
      response.end("Success");
    } else {
      response.writeHead(406, headers);
      response.end("Please submit only GET or POST requests");
    }
  } else {
    response.writeHead(404, headers);
    response.end("There was an error");
  }
  };


exports.handleRequest = handleRequest;




// if (request.url === "/1/classes/messages") {
//     var hi = [];
//     var message = {username: "tuhin", text:"hi!"};
//     var newMessage = JSON.stringify(message);
//     hi.push(message);
//     var results = new Buffer(hi);
//     console.log(hi);
//     response.write(results);
//     response.end();
//   } else {