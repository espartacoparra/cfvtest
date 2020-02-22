'use strict';
/*module.exports = (sequelize, DataTypes) => {
  const products_size = sequelize.define('products_size', {
    product_id: DataTypes.INTEGER,
    size_id: DataTypes.INTEGER
  }, {});
  products_size.associate = function(models) {
    // associations can be defined here
  };
  return products_size;
};*/

const sequelize = require('../connections/mysql');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
class Products_Size extends Model { };
Products_Size.init({
  size_id: Sequelize.INTEGER,
  product_id: Sequelize.INTEGER,
  quantity: Sequelize.STRING
}, {
  sequelize,
  modelName: 'products_sizes'
});
module.exports = Products_Size;