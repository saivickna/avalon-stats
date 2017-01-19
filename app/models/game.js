var db = require('../config');
var Match = require('./match.js');
var User = require('./user.js');

var Game = db.Model.extend({
  tableName: 'games',
  hasTimestamps: true,
  matches: function () {
    return this.hasMany(Match);
  },
  user: function() {
    return this.belongsTo(User, 'userId');
  },
  initialize: function() {
    
  }
});

module.exports = Game;