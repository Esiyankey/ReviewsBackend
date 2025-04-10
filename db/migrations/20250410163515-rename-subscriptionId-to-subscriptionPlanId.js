"use strict";
const {Sequelize} = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Businesses", "subscriptionId", "subscriptionPlanId");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Businesses", "subscriptionPlanId", "subscriptionId");
  },
};

