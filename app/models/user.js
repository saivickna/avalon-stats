var db = require('../config');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
var Game = require('./game');
var Player = require('./player');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  games: function () {
    return this.hasMany(Game);
  },
  players: function () {
    return this.hasMany(Player);
  },
  initialize: function() {
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword) {
    return bcrypt.compareAsync(attemptedPassword, this.get('password'));
  },
  hashPassword: function() {
    return bcrypt.hashAsync(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
  });

module.exports = User;