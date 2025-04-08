'use strict';
const {Sequelize} = require("sequelize");
const sequelize = require("../../config/database");

const qrCode = sequelize.define("qrCodes",{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  bussinessId: {
    references: {
      model: "bussinesses",
      key: "id",
    },
    onDelete: "CASCADE", // optional: delete business if user is deleted
    onUpdate: "CASCADE",
  },
  qrCodeUrl: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
})

qrCode.associate = (models) => {
  qrCode.belongsTo(models.bussinesses, {
    foreignKey: "bussinessId",
    as: "business",
  });
}

module.exports = qrCode;

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class qrCode extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   qrCode.init({
//     bussinessId: DataTypes.INTEGER,
//     qrCodeUrl: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'qrCode',
//   });
//   return qrCode;
// };