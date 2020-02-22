'use strict';/*
module.exports = (sequelize, DataTypes) => {
  const categories - product = sequelize.define('categories-product', {
    category_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {});
  categories - product.associate = function(models) {
    // associations can be defined here
  };
  return categories - product;
};
*/

const sequelize = require('../connections/mysql');
const Sequelize= require('sequelize');
const Model = Sequelize.Model;
class Category_Product extends Model {};
Category_Product.init({
  category_id: Sequelize.INTEGER,
  product_id: Sequelize.INTEGER
},{
  sequelize,
  modelName: 'categories_products'
});
module.exports= Category_Product;