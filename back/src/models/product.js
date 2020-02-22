'use strict';
/*const sequelize = require('../connections/mysql');
const Sequelize= require('sequelize');
const DataTypes = Sequelize.DataTypes;
module.exports = (Sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    user_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    price: Sequelize.STRING,
    quantity: Sequelize.STRING
  }, {});
  product.associate = function(models) {
    // associations can be defined here
  };
  return product;
};*/

const sequelize = require('../connections/mysql');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
class Product extends Model { };
Product.init({
  user_id: Sequelize.INTEGER,
  name: Sequelize.STRING,
  price: Sequelize.STRING,
  description: Sequelize.TEXT,
  quantity: Sequelize.STRING
}, {
  sequelize,
  modelName: 'products'
});
module.exports = Product;