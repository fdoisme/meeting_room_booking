'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Client.hasMany(models.RoomUsage, { foreignKey: "clientId" })
    }
  }
  Client.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "name is required" },
        notEmpty: { msg: "name is required" },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "email has been registered" },
      validate: {
        notNull: { msg: "email is required" },
        notEmpty: { msg: "email is required" },
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "phone is required" },
        notEmpty: { msg: "phone is required" },
      }
    },
    credit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "credit is required" },
        notEmpty: { msg: "credit is required" },
      }
    }
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};