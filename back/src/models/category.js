'use strict';
/*
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    product_id: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {});
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};*/



const sequelize = require('../connections/mysql');
const Sequelize= require('sequelize');
const Model = Sequelize.Model;
class Category extends Model {};
Category.init({
  category: Sequelize.STRING
},{
  sequelize,
  modelName: 'categories'
});
module.exports= Category;