'use strict';
/*
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    user_id: DataTypes.INTEGER,
    quantity: DataTypes.STRING,
    status: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});
  order.associate = function(models) {
    // associations can be defined here
  };
  return order;
};*/


const sequelize = require('../connections/mysql');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
class Order extends Model { };
Order.init({
  user_id: Sequelize.INTEGER,
  quantity: Sequelize.STRING,
  status: Sequelize.STRING,
  img: Sequelize.STRING,
  total: Sequelize.INTEGER
}, {
  sequelize,
  modelName: 'orders'
});
module.exports = Order;