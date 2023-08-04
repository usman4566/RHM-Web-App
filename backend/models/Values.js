const mongoose = require('mongoose'); 
const valuesSchema = new mongoose.Schema({
    AccX: 
    {type:String},
    AccY: 
    {type:String},
    AccZ: 
    {type:String}
  });
  mongoose.model("Values", valuesSchema);