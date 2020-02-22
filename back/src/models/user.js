'use strict';
const sequelize = require('../connections/mysql');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class User extends Model { }
User.init({
  name: Sequelize.STRING,
  lastname: Sequelize.STRING,
  cedula: Sequelize.STRING,
  type: {
    type: Sequelize.ENUM,
    values: ['user', 'admin'],
    defaultValue: 'user'
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  sequelize,
  modelName: 'users'
  // options
});

module.exports = User;