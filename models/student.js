const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
   roll : {
     type : String,
     unique : true,
     required: true
   },
   password:{type:String,
              // required: true
            },
   name:{type:String,
              // required: true
            },
   email: {type:String,
              unique: true,
              // required: true,
          },
   branch:{type:String,
              // required: true
            },
   semester:{type:Number,
              // required: true
            },
    markId: {
        type: Schema.Types.ObjectId,
        ref:'Mark',
        
    },

    classroomId : {
      type: Schema.Types.ObjectId,
      ref: 'Classroom',
    }
});

 module.exports = mongoose.model('Student',studentSchema);




























/* const Sequelize = require('sequelize')

const sequelize = require('../util/database');

const Student = sequelize.define('student', {

    
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


module.exports = Student; */

