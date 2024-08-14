// src/controllers/Users/index.js
const createUser = require('./createUser');
const putUser = require('./putUser');
const deleteUser = require('./deleteUser');
const getAllUsers = require('./getAllUsers');
const getUserByDocument = require('./getUserByDocument');
const authUser = require('./authUser')

module.exports = {
  createUser,
  putUser,
  deleteUser,
  getAllUsers,
  getUserByDocument,
  authUser
};