const mongoose = require('mongoose');

const classifiedSchema = mongoose.Schema({
  Longitude: { type: String, required: true },
  Latitude: { type: String, required: true },
  AccX: { type: String, required: true },
  AccY: { type: String, required: true },
  AccZ: { type: String, required: true },
  Class: { type: Number, required: true },
},{ collection: 'classified' });

mongoose.model('Classified', classifiedSchema);

