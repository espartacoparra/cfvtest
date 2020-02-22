'use strict';
/*module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    product_id: DataTypes.INTEGER,
    color1: DataTypes.STRING,
    color2: DataTypes.STRING,
    color3: DataTypes.STRING
  }, {});
  Color.associate = function(models) {
    // associations can be defined here
  };
  return Color;
};*/

const sequelize = require('../connections/mysql');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
class Color extends Model { };
Color.init({
  product_id: Sequelize.INTEGER,
  color1: Sequelize.STRING,
  color2: Sequelize.STRING,
  color3: Sequelize.STRING
}, {
  sequelize,
  modelName: 'colors'
});
module.exports = Color;