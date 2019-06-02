const Sequelize = require('sequelize');

const sequelize = new Sequelize('testingsample', 'root', 'San@1302', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;