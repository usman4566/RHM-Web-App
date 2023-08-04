const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
  feedback: {
    type:String
  },
  user: {
    type:String
  },
  name: {
    type:String
},
  email:{
    type:String
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;