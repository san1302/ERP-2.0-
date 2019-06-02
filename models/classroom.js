const Sequelize = require('sequelize')

const sequelize = require('../util/database');

const Classroom = sequelize.define('classroom', {

   id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true

   },
   branch: Sequelize.STRING,
   semester: Sequelize.INTEGER,
   studentId: Sequelize.STRING,
   teacherId: Sequelize.STRING
});


module.exports = Classroom;