'use strict';
const {Sequelize} = require("sequelize");
const sequelize = require("../../config/database");

const Bussiness = sequelize.define("bussinesses", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ownerId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE", // optional: delete business if user is deleted
      onUpdate: "CASCADE",
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    qrCode: {
      type: Sequelize.STRING,
    },
    subscriptionPlanId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "SubscriptionPlans",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
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

Business.associate = (models) => {
  Business.belongsTo(models.User, {
    foreignKey: "ownerId",
    as: "owner",
  });

  Business.belongsTo(models.Subscription, {
    foreignKey: "subscriptionId",
    as: "subscriptions",
  });
  Business.hasMany(models.Review, {
    foreignKey: "bussinessId",
    as: "reviews",
  });
  Business.hasOne(models.QrCode, {
    foreignKey: "bussinessId",
    as: "qrcodes",
  });
};


module.exports = Bussiness;

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Bussiness extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Bussiness.init({
//     ownerId: DataTypes.NUMBER,
//     name: DataTypes.STRING,
//     description: DataTypes.STRING,
//     qrCode: DataTypes.STRING,
//     subscriptionStatus: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Bussiness',
//   });
//   return Bussiness;
// };