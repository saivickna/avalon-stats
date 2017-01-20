var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var util = require('../lib/utility');
var Games = require('../app/collections/games');
var Players = require('../app/collections/players');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('shhhh, very secret'));
app.use(session({secret: 'shhhh, very secret',
  resave: true,
    saveUninitialized: true}));

var restrict = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.status(403).send();
  }
};

app.get('/games', restrict, function(req, res) {
    Games.reset().query(function(qb) {
      qb.where('userId', '=', req.body.userId);
    }).fetch().then(function(games) {
      res.status(200).send(games.models);
    });
});

app.get('/players', restrict, function(req, res) {
    Players.reset().query(function(qb) {
      qb.where('userId', '=', req.body.userId);
    }).fetch().then(function(players) {
      res.status(200).send(players.models);
    });
});



// app.get('/login', 
// function(req, res) {
//   console.log(req.headers['referer']);
//   if (req.headers['referer'] && req.headers['referer'].includes('login')) {
//     //res.status(200).end();
//   } else {
//     res.render('loginlayout');
//   }
  
// });

app.post('/login', 
  function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    new User({username: username}).fetch().then(function(found) {
      if (found) {
        new User({username: username, password: util.getBCryptPW(found.get('salt'), password)}).fetch().then(function(found) {
          if (found) {
            req.session.regenerate(function() {
              req.session.user = username;
              res.status(200).send();
            });
          } else {
            res.status(403).send();
          }
        });

      } else {
        res.status(403).send();
      }
    });


  });

// app.get('/signup',
// function(req, res) {
//   res.render('signup');
// });

app.post('/signup', 
function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  new User({username: username}).fetch().then(function(found) {
    if (found) {
      res.status(406).send();
    } else {
      Users.create({
        username: username,
        password: password
      })
      .then(function(newUser) {
        req.session.regenerate(function() {
          req.session.user = username;
          res.status(200).send();
        });
      });

    }
  });

  
});

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.status(200).send();
    //res.render('login');
  });
});