const Sequelize = require('sequelize')

const sequelize = require('../util/database');

const Teacher= sequelize.define('teacher', {

     roll: {
         type: Sequelize.STRING,
         allowNull: false,
         primaryKey: true
     },

    /* name : Sequelize.STRING, */
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
     

});


module.exports = Teacher;