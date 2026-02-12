const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Equipment = require('./Equipment');

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
    defaultValue: 'Pending',
  },
  request_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Request.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Request.belongsTo(Equipment, { foreignKey: 'equipment_id', as: 'equipment' });
User.hasMany(Request, { foreignKey: 'user_id', as: 'requests' });
Equipment.hasMany(Request, { foreignKey: 'equipment_id', as: 'requests' });

module.exports = Request;
