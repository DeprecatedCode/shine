/**
 * Shine App
 * @author Nate Ferrero
 */
var express = require("express");
var http = require("http");
var path = require("path");

var port = 1 * process.argv[2] || 3333;

var app = express();
var server = http.createServer(app);

app.configure(function(){
  app.set('port', port || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

server.listen(app.get('port'), function(){
  console.log("[Shine] Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);

var events = require("./events");

io.sockets.on('connection', function (socket) {
    socket.emit('info', {});
    events(socket);
});
