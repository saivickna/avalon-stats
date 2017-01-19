var bcrypt = require('bcrypt-nodejs');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'avalon',
    charset  : 'utf8'
  },
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('players').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('players', function (link) {
      link.increments('id').primary();
      link.string('name', 255);
      link.integer('userId');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('games').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('players', function (link) {
      link.increments('id').primary();
      link.boolean('win');
      link.string('winType');
      link.integer('userId');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('matches').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('matches', function (link) {
      link.increments('id').primary();
      link.integer('gameId');
      link.integer('playerId');
      link.boolean('alliance');
      link.string('allianceRole');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (link) {
      link.increments('id').primary();
      link.string('username');
      link.string('password');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});