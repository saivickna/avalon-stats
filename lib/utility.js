var bcrypt = require('bcrypt-nodejs');

exports.getBCryptPW = function(salt, password) {
  //var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
