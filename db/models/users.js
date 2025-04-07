'use strict';

const { Sequelize,DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const bcrypt = require("bcrypt");

const user = sequelize.define("Users", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "userName cannot be null",
      },
      notEmpty: {
        msg: "userName cannot be empty",
      },
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email cannot be null",
        },
        notEmpty: {
          msg: "email cannot be empty",
        },
        isEmail: {
          msg: "inavlid email id ",
        },
      },
  },
  password: {
    type: Sequelize.STRING,
    set(value){
      const hashPassword = bcrypt.hashSync(value, 10);
      this.setDataValue("password", hashPassword);
    }
  },
  role: {
    type: DataTypes.ENUM("user", "bussinessAdmin","superAdmin"),
      allowNull: false,
      defaultValue: "user"
  },
  
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
 

},
{
  paranoid: true,
  freezeTableName: true,
  modelName: "user",
});

user.associate = (models) => {
  user.hasOne(models.Business, {
    foreignKey: "ownerId",
    as: "business",
  });
};

module.exports = user;
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Users extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Users.init({
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     role: DataTypes.STRING,
//   }, {
//     sequelize,
//     modelName: 'Users',
//   });
//   return Users;
// };
