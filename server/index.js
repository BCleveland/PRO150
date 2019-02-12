var express = require('express'),
    path = require('path'),
    routes = require('./routes.js');
var app = express();

app.use(express.static(path.join(__dirname + '/../game')));

app.get('/', routes.index);

app.listen(3000);