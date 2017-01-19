var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var util = require('../lib/utility');

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
    res.redirect('/login');
  }
};

app.get('/', restrict, function(req, res) {

});



app.get('/login', 
function(req, res) {
  console.log(req.headers['referer']);
  if (req.headers['referer'] && req.headers['referer'].includes('login')) {
    //res.status(200).end();
  } else {
    res.render('loginlayout');
  }
  
});

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
              res.redirect('/');
            });
          } else {
            res.redirect('/login');
          }
        });

      } else {
        res.redirect('/login');
      }
    });


  });

app.get('/signup',
function(req, res) {
  res.render('signup');
});

app.post('/signup', 
function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  new User({username: username}).fetch().then(function(found) {
    if (found) {
      res.redirect('/login');
    } else {
      Users.create({
        username: username,
        password: password
      })
      .then(function(newUser) {
        req.session.regenerate(function() {
          req.session.user = username;
          res.redirect('/');
        });
      });

    }
  });

  
});

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
    //res.render('login');
  });
});