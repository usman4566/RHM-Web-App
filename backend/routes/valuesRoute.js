const express = require('express');
const mongoose = require('mongoose');
const Values = mongoose.model('Values');
const router = express.Router();


router.get('/values', async (req, res) => {
    try {
      const data = await Values.find();
      res.json(data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
         


module.exports = router;