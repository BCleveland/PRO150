const mongoose = require('mongoose');

//In this string the Test is the Name of the Database and we wanna change that
let uri = 'mongodb://Admin:101097@discdungeon-shard-00-00-7kwo1.mongodb.net:27017,discdungeon-shard-00-01-7kwo1.mongodb.net:27017,discdungeon-shard-00-02-7kwo1.mongodb.net:27017/DoggoFighting?ssl=true&replicaSet=DiscDungeon-shard-0&authSource=admin&retryWrites=true';

mongoose.connect(uri);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var playerSchema = mongoose.Schema({
    username: String,
    playerLevel: Number,
    X: Number,
    Y: Number
});

 //idk if i actually need this
var dogSchema = mongoose.Schema({
    Name: String,
    HP: Number,
    ATK: Number,
    DEF: Number,
    MDEF: Number,
    SPD: Number
});

let Player = mongoose.model("players", playerSchema);

let Dog = mongoose.model("dogs", dogSchema);

db.once('open', function callback() {
    // findDogByName("Fighter", onDogLoad);

    // function onDogLoad(dog){
    //     console.log(dog.Name + " is a good boy");
    // }
});


exports.findDogByName = function(doggoName, callback){
    let bleh = new Dog();
    Dog.findOne({Name: doggoName}, function(err, results){
        if(err){
            console.log(err);
        }
        if(results){
            bleh = new Dog({
                Name: results.Name,
                HP: results.HP,
                ATK: results.ATK,
                DEF: results.DEF,
                MDEF: results.MDEF,
                SPD: results.SPD
            });
        }
        else{
            bleh = new Dog({
                Name: "fuck"
            });
            console.log("fuck was made");
        }
        callback(bleh);
    });
}

exports.loadPlayer = function(username, callback, socket){
    let bleh = new Player();
    Player.findOne({username : username}, function(err, results){
        if(!results){
            //found nothing
            bleh = new Player({
                username: username,
                playerLevel: 1,
                X: 100,
                Y: 100
            });
            //make a new player
            Player.create(bleh);
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

exports.savePlayer = function(player){
    Player.findOne({username : player.username}, function(err, results){
        if(results){
            results.X = player.X;
            results.Y = player.Y;
            results.playerLevel = player.playerLevel;
            results.username = player.username;
            results.save();
        }
    });
}