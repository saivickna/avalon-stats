var db = require('../config');
var Player = require('../models/player');

var Players = new db.Collection();

Players.model = Player;

module.exports = Players;