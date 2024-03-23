'use strict';

const fs = require("fs")
const bcrypt = require("bcrypt");
const { hash } = require("../helpers");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const seedUsers = JSON.parse(fs.readFileSync("./data/users.json", "utf-8")).map((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.password = hash(el.password)
      return el
    })
    const seedClients = JSON.parse(fs.readFileSync("./data/clients.json", "utf-8")).map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el
    })
    const seedRooms = JSON.parse(fs.readFileSync("./data/rooms.json", "utf-8")).map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el
    })
    const seedRoomUsages = JSON.parse(fs.readFileSync("./data/roomUsages.json", "utf-8")).map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el
    })
    await queryInterface.bulkInsert("Users", seedUsers)
    await queryInterface.bulkInsert("Clients", seedClients)
    await queryInterface.bulkInsert("Rooms", seedRooms)
    await queryInterface.bulkInsert("RoomUsages", seedRoomUsages)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    const option = {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
    await queryInterface.bulkDelete("Users", null, option)
    await queryInterface.bulkDelete("Clients", null, option)
    await queryInterface.bulkDelete("Rooms", null, option)
    await queryInterface.bulkDelete("RoomUsages", null, option)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
