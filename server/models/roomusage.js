'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoomUsage.belongsTo(models.Client, { foreignKey: "clientId" })
      RoomUsage.belongsTo(models.Room, { foreignKey: "roomId" })
    }
  }
  RoomUsage.init({
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    quotaUsed: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RoomUsage',
  });
  return RoomUsage;
};