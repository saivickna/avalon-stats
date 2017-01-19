var db = require('../config');
var Game = require('./game.js');
var Player = require('./player.js');

var Match = db.Model.extend({
  tableName: 'matches',
  hasTimestamps: true,
  game: function() {
    return this.belongsTo(Game, 'gameId');
  },
  player: function() {
    return this.belongsTo(Player, 'playerId');
  },
  initialize: function() {

  }
});

module.exports = Match;