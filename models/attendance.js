const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',

    },

    Attendances: [{
        subject: {
            type: Schema.Types.String,
            required: true
        },
        attendance: {
            type: Schema.Types.Number,
            required: true
        },
        
        totalClasses : {
            type: Schema.Types.Number,
                required: true
        },

        classesPresent : {
            type: Schema.Types.Number,
                required: true
        }
    }]
});

module.exports = mongoose.model('Attendance', attendanceSchema);
