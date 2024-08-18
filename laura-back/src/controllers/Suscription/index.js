// src/controllers/Users/index.js
const createSubscription = require('./createSubscription');
const deleteSubscription = require('./deleteSubscription');
const getSubscriptions = require('./getSubscriptions');
const getSubscriptionById = require('./getSubscriptionById');
const updateSubscription = require('./updateSubscription');


module.exports = {
  createSubscription,
  deleteSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription

};