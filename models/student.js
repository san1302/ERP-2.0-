const Sequelize = require('sequelize')

const sequelize = require('../util/database');

const Student = sequelize.define('student', {

    /* name : Sequelize.STRING, */
  roll: {
       type: Sequelize.STRING,
       allowNull: false,
       primaryKey : true
  },
    password: Sequelize.STRING,
    name : Sequelize.STRING,
    email: Sequelize.STRING,
    Branch:Sequelize.STRING,
    Semester: Sequelize.INTEGER

});


module.exports = Student;