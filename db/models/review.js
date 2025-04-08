'use strict';


const Review = sequelize.define("reviews", 
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    bussinessId: {
      type: Sequelize.INTEGER,
      references: {
        model: "bussinesses",
        key: "id",
      },
      onDelete: "CASCADE", // optional: delete business if user is deleted
      onUpdate: "CASCADE",
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE", 
      onUpdate: "CASCADE",
    },
    reviewType: {
      type: Sequelize.ENUM("text", "image","audio","video"),
         allowNull: false,
         defaultValue: "text",
    },
    content: {
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
  }
)

Review.associate = (models) => {
  Review.belongsTo(models.bussinesses, {
    foreignKey: "bussinessId",
    as: "business",
  });

 Review.belongsTo(models.users, {
    foreignKey: "userId",
    as: "user",
  });
  Review.hasMany(models.reports, {
    foreignKey: "reviewId",
    as: "reports",
  });
};

modules.exports = Review;

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class review extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   review.init({
//     bussinessId: DataTypes.INTEGER,
//     userId: DataTypes.INTEGER,
//     reviewType: DataTypes.STRING,
//     content: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'review',
//   });
//   return review;
// };