'use strict';
/*
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    product_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  image.associate = function(models) {
    // associations can be defined here
  };
  return image;
};*/



const sequelize = require('../connections/mysql');
const Sequelize= require('sequelize');
const Model = Sequelize.Model;
class Image extends Model {};
Image.init({
  product_id: Sequelize.INTEGER,
  name: Sequelize.STRING,
  url: Sequelize.STRING
},{
  sequelize,
  modelName: 'images'
});
module.exports= Image;