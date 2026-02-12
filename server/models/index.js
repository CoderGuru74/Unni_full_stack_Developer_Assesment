const sequelize = require('../config/database');
const User = require('./User');
const Equipment = require('./Equipment');
const Request = require('./Request');

const models = {
  User,
  Equipment,
  Request,
  sequelize,
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = models;
