const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({

    teacherRoll: {
        type: Schema.Types.String
      
    },
    studentRoll: {
        type: Schema.Types.String,
        ref: 'Student',
    },

    messages : [
        {
            name:{
                type:Schema.Types.String
            },

            message : {
                type: Schema.Types.String
            },

            roll : {
                type :Schema.Types.String
            }
        }
    ]
});

module.exports = mongoose.model('Message', messageSchema);
