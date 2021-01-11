const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.username, config.password)
db.sequelize = sequelize;
db.Sequelize = Sequelize

module.exports = db;
