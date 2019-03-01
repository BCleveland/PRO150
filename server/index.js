/*const express = require('express'),
    path = require('path'),
    routes = require('./routes.js');

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var network_manager = require('./network-manager.js');

io.on('connection', network_manager.onConnect);

app.use(express.static(path.join(__dirname + '/../game')));

app.get('/', routes.index);

server.listen(3000);*/

const db = require('./database.js');
const combatManager = require('./combat-manager.js');

db.findDogByName("Fighter", onDogLoad);

function onDogLoad(dog){
    console.log(dog + " is a good boy");
}

let user = {attack:100};
let attack = {baseDamage:100,
dieCount:3,
dieSize:10,
attackType:'magic'
};
let target = {spDefence:15};

combatManager.UseMoveOnTarget(user, attack, target);