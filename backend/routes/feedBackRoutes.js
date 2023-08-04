const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Feedback = require('../models/Feedback');
// const Feedback = mongoose.model('Feedback');

router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    console.log('Feedbacks:', feedbacks);
    res.json(feedbacks);
  } catch (err) {
    console.log('Error:', err); 
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;