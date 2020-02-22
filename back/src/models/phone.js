'use strict';
const sequelize = require('../connections/mysql');
const Sequelize= require('sequelize');
const Model = Sequelize.Model;
class Phone extends Model {};
Phone.init({
  user_id: Sequelize.INTEGER,
  phone: Sequelize.STRING
},{
  sequelize,
  modelName: 'phones'
});
module.exports= Phone;