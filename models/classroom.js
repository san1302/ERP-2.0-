const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
   
    teacherId:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Teacher',
        }
     ] ,
   studentId:[
       {
           type: Schema.Types.ObjectId,
           ref: 'Student',
       }
   ],
  
   branch:{type:String,
              required: true
          },
   semester:{type:Number,
              required: true
            },
    subjects: [{type:Schema.Types.String}]
});

module.exports = mongoose.model('Classroom',classroomSchema);



















/* const Sequelize = require('sequelize')

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


module.exports = Classroom; */