'use strict';
const crypto = require('crypto');
var hash = require('../helpers/hash')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    secret: DataTypes.STRING
  },
  {
    hooks: {
      beforeCreate: (models) => {
        models.password = hash(models.secret, models.password)
      }
    }
  });

  return User;
};
