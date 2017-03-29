var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var WebSocketServer = require('websocket').server;

var server = http.createServer(app);
server.listen(1337, function() { });

var clients = [ ];

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.post('/addRandomUser', function (req, res) {
   if (clients.length > 0) {
	   client = clients[0];
	   client.sendUTF("new");
   }
})

app.listen(8081, function () {
  console.log("Running...");
})

wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
	
	clients.push(connection);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("message: " + message.utf8Data)
			connection.send(message.utf8Data);
        }
    });

    connection.on('close', function(connection) {
        // close user connection
		console.log("connection with client closed: " + connection)
		
		clients = [ ];
    });
});

