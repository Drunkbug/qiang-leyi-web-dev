var express = require('express');
var app = express();

var bodyParser = require('body-parser');//to help parse the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


var assignment = require('./assignment/app.js');
assignment(app);
//
// var stillalive = require('./stillalive/app.js');
// stillalive(app);



// require ("./public/js/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
