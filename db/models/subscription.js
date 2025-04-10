'use strict';
const { Sequelize } = require("sequelize");
const sequelize = require("../../config/database");

const Subscription = sequelize.define("subscriptions", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  businessId: {
    type: Sequelize.INTEGER,
    references: {
      model: "bussinesses",
      key: "id",
    },
    onDelete: "CASCADE", // optional: delete subscription if business is deleted
    onUpdate: "CASCADE",
  },
  subscriptionPlanId: {
    type: Sequelize.INTEGER,
    references: {
      model: "subscriptionPlans",
      key: "id",
    },
    onDelete: "CASCADE", // optional: delete subscription if plan is deleted
    onUpdate: "CASCADE",
  },
  startDate: {
    type: Sequelize.DATE,
  },
  endDate: {
    type: Sequelize.DATE,
  },
});
Subscription.associate = (models) => {
  Subscription.belongsTo(models.Bussiness, {
    foreignKey: "businessId",
    as: "business",
  });

  Subscription.belongsTo(models.SubscriptionPlan, {
    foreignKey: "subscriptionPlanId",
    as: "subscriptionPlan",
  });
};


module.exports = Subscription;


// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class subscription extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   subscription.init({
//     businessId: DataTypes.INTEGER,
//     subscriptionPlanId: DataTypes.INTEGER,
//     startDate: DataTypes.DATE,
//     endDate: DataTypes.DATE
//   }, {
//     sequelize,
//     modelName: 'subscription',
//   });
//   return subscription;
// };