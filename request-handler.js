/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var defaultCorsHeaders = require("./basic-server.js").headers;
var messages = {username: "default", message: "AIN'T NOTHIN' HERE"};
var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  //if request.url === something, response.end (something)
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  response.writeHead(statusCode, headers);
  if (request.url === "/1/classes/messages") {
    var outgoing_message = JSON.stringify(messages);
    response.end(outgoing_message);
  }
  };


exports.handler = handleRequest;



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