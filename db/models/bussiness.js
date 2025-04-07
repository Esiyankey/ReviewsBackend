'use strict';
const {Sequelize,DataTypes} = require("sequelize");
const sequelize = require("../../config/database");

const bussiness = sequelize.define("Bussiness", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ownerId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
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
    subscriptionId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "Subscriptions",
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

business.associate = (models) => {
  business.belongsTo(models.User, {
    foreignKey: "ownerId",
    as: "owner",
  });

  business.belongsTo(models.Subscription, {
    foreignKey: "subscriptionId",
    as: "subscription",
  });
};


module.exports = bussiness;

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