var db = require('../config');
var Match = require('./match.js');
var User = require('./user.js');

var Player = db.Model.extend({
  tableName: 'players',
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

module.exports = Player;