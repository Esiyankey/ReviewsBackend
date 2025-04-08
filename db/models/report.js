'use strict';
const {Sequelize,DataTypes} = require("sequelize");
const sequelize = require("../../config/database");

const Report = sequelize.define("reports",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    reviewId: {
      type: Sequelize.INTEGER,
      references: {
        model: "reviews",
        key: "id",
      },
      onDelete: "CASCADE", 
      onUpdate: "CASCADE",
    },
    reportedBy: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE", 
      onUpdate: "CASCADE",
    },
    reason: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM("pending", "resolved", "rejected"),
      allowNull: false,
      defaultValue: "pending"
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }
)


Report.associate = (models) => {
  Report.belongsTo(models.users, {
    foreignKey: "reportedBy",
    as: "reporter",
  });
  Report.belongsTo(models.reviews, {
    foreignKey: "reviewId",
    as: "review",
  });
}

module.exports = Report;

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class report extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   report.init({
//     reviewId: DataTypes.INTEGER,
//     reportedBy: DataTypes.INTEGER,
//     reason: DataTypes.STRING,
//     status: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'report',
//   });
//   return report;
// };