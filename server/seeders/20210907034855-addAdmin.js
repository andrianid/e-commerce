'use strict';
const bcrypt=require("bcrypt");
const saltRounds = 10

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let pass = "admin"
    const hashed = bcrypt.hashSync(pass, saltRounds)
    if(!hashed){
      console.log("error hash failed")
    } else {
      pass = hashed
    }

    await queryInterface.bulkInsert("Accounts", [{
      name: "Admin",
      email: "admin@mail.com",
      isAdmin: true,
      password: pass,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
