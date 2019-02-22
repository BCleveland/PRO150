const mongoose = require('mongoose');

//In this string the Test is the Name of the Database and we wanna change that
let uri = 'mongodb://Admin:101097@discdungeon-shard-00-00-7kwo1.mongodb.net:27017,discdungeon-shard-00-01-7kwo1.mongodb.net:27017,discdungeon-shard-00-02-7kwo1.mongodb.net:27017/test?ssl=true&replicaSet=DiscDungeon-shard-0&authSource=admin&retryWrites=true';

mongoose.connect(uri);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var playerSchema = mongoose.Schema({
    username: String,
    playerLevel: Number,
    X: Number,
    Y: Number
});

let Player = mongoose.model("players", playerSchema);

db.once('open', function callback() {

});

exports.loadPlayer = function(name, callback, socket){
    let bleh = new Player();
    Player.findOne({username : {Name}}, function(err, results){
        if(!results){
            //found nothing
            bleh = new Player({
                username: name,
                playerLevel: 1,
                X: 100,
                Y: 100
            });
            //make a new player
        }else{
            //found something
            bleh = new Player({
                username: results.username,
                playerLevel: results.playerLevel,
                X: results.X,
                Y: results.Y
            });
        }
        callback(bleh, socket);
    });

}
