// "use strict";
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable("subscriptions", {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       plan: {
//         type: Sequelize.ENUM("basic", "premium"),
//         allowNull: false,
//         defaultValue: "basic",
//       },
//       status: {
//         type: Sequelize.ENUM("active", "inactive"),
//         allowNull: false,
//         defaultValue: "inactive",
//       },
//       startDate: {
//         type: Sequelize.DATE,
//       },
//       endDate: {
//         type: Sequelize.DATE,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable("Subscriptions");
//   },
// };

'use strict';
const { Sequelize, DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Drop ENUM type if it exists
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_subscriptions_status";');
    
    // Create ENUM types
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_subscriptions_status" AS ENUM ('active', 'inactive');
    `);

    // Now, create the subscriptions table
    await queryInterface.createTable("subscriptions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plan: {
        type: Sequelize.ENUM("basic", "premium"), // Referencing the manually created ENUM type
        allowNull: false,
        defaultValue: "basic",
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"), // Referencing the manually created ENUM type
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
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("subscriptions");

    // Drop the ENUM types after the table
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_subscriptions_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_subscriptions_plan";');
  },
};
