const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    roll : {
     type : String,
     unique: true,
     required: true
   },
   password:{type:String,
            //   required: true
            },
   name:{type:String,
            //   required: true
            },
   email: {type:String,
             unique: true,
            //   required: true,
          },
    branch:{type:String,
              // required: true
            },
    semester:{type:Number,
              // required: true
            },

    classroomId: {
        type: Schema.Types.ObjectId,
        ref : 'Classroom'
    }
    /* studentInfo: [
        {
            studentId: {type:Schema.Types.ObjectId,ref:'Student',required: true},
            branch: {type:Schema.Types.String,ref:'Student',required:true},
            semester:{type:Schema.Types.Number,ref: 'Student',required: true}
        }
    ] */
})

module.exports = mongoose.model('Teacher',teacherSchema);











/* const Sequelize = require('sequelize')

const sequelize = require('../util/database');

const Teacher= sequelize.define('teacher', {

     roll: {
         type: Sequelize.STRING,
         allowNull: false,
         primaryKey: true
     },


    password: Sequelize.STRING,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
     

});


module.exports = Teacher; */