'use strict';
/*module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define('Size', {
    size: DataTypes.STRING
  }, {});
  Size.associate = function(models) {
    // associations can be defined here
  };
  return Size;
};*/

const sequelize = require('../connections/mysql');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
class Size extends Model { };
Size.init({
  size: Sequelize.STRING
}, {
  sequelize,
  modelName: 'sizes'
});
module.exports = Size;