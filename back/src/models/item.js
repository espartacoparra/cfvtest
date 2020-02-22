'use strict';
/*
module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define('item', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {});
  item.associate = function(models) {
    // associations can be defined here
  };
  return item;
};*/


const sequelize = require('../connections/mysql');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
class Item extends Model { };
Item.init({
  order_id: Sequelize.INTEGER,
  product_id: Sequelize.INTEGER,
  size_id: Sequelize.INTEGER,
  quantity: Sequelize.STRING,
  price: Sequelize.DOUBLE
}, {
  sequelize,
  modelName: 'items'
});
module.exports = Item;