var express = require('express');
var https = require('https');
var app = express();

// Dev site port 8080 Live site 8090
app.set('port', 8090);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var server = https.createServer(app);

var io = require('socket.io')(server, {
	pingTimeout: 30000,
	transports: [ 'websocket', 'polling' ]
});

// Start server
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

//Task Service
var routerTask = require('./namespaces/ChatServices');
routerTask(app, io);