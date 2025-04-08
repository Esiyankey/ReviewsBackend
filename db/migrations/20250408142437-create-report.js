"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reports", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("pending", "resolved", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reports");
  },
};
