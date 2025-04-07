'use strict';
const {Sequelize,DataTypes} = require("sequelize");
const sequelize = require("../../config/database");

const subscription = sequelize.define("Subscription", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  plan: {
    type: DataTypes.ENUM("basic", "premium"),
    allowNull: false,
    defaultValue: "basic",
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    allowNull: false,
    defaultValue: "basic",
  },
  startDate: {
    type: Sequelize.DATE,
  },
  endDate: {
    type: Sequelize.DATE,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
})

Subscription.hasMany(models.Business, {
  foreignKey: "subscriptionId",
  as: "businesses", // optional alias
});

module.exports = subscription;
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Subscription extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Subscription.init({
//     plan: DataTypes.STRING,
//     status: DataTypes.STRING,
//     startDate: DataTypes.DATE,
//     endDate: DataTypes.DATE
//   }, {
//     sequelize,
//     modelName: 'Subscription',
//   });
//   return Subscription;
// };