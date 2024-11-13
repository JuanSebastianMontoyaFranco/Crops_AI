'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
    }
  };
  user.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    department: DataTypes.STRING,
    city: DataTypes.STRING,
    role: DataTypes.STRING,
    token: DataTypes.STRING,
    state: DataTypes.INTEGER,
    confirmed: DataTypes.BOOLEAN,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};