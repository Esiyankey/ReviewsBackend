'use strict';
const {Sequelize} = require("sequelize");
const sequelize = require("../../config/database");

const Subscription = sequelize.define("subscriptions", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  plan: {
    type: Sequelize.ENUM("basic", "premium"),
    allowNull: false,
    defaultValue: "basic",
  },
  status: {
    type: Sequelize.ENUM("active", "inactive"),
    allowNull: false,
    defaultValue: "inactive",
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

module.exports = Subscription;
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