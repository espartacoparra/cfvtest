'use strict';
module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  token.associate = function(models) {
    // associations can be defined here
  };
  return token;
};


const sequelize = require('../connections/mysql');
const Sequelize= require('sequelize');
const Model = Sequelize.Model;
class Token extends Model {};
Token.init({
  user_id: Sequelize.INTEGER,
  token: Sequelize.STRING
},{
  sequelize,
  modelName: 'tokens'
});
module.exports= Token;