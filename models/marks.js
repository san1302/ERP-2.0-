const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markSchema = new Schema({
   studentId: {
       type: Schema.Types.ObjectId,
       ref: 'Student',
       
   },
   
   Marks : [
       {
           subject : {
              type: Schema.Types.String,
                  required: true
                 },
          mark : {
              type:Schema.Types.Number,
              required : true
          }
    }
   ]
});

module.exports = mongoose.model('Mark',markSchema);
