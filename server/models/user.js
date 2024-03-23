'use strict';
const { hash } = require('../helpers');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "email has been registered" }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "password is required" },
        notNull: { msg: "password is required" },
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.email = user.email.toLowerCase()
        user.password = hash(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};