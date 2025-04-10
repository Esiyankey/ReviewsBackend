'use strict';

const { Sequelize } = require("sequelize");
const sequelize = require("../../config/database");
const SubscriptionPlan = sequelize.define("subscriptionPlans", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});
SubscriptionPlan.associate = (models) => {
  SubscriptionPlan.hasMany(models.Subscription, {
    foreignKey: "subscriptionPlanId",
    as: "subscriptions",
  });
};

module.exports = SubscriptionPlan;

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class subscriptionPlan extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   subscriptionPlan.init({
//     name: DataTypes.STRING,
//     price: DataTypes.INTEGER,
//     duration: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'subscriptionPlan',
//   });
//   return subscriptionPlan;
// };