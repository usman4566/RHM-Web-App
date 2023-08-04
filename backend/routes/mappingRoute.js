const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Classified = mongoose.model('Classified');

// define a GET route to fetch data from the "classified" collection
router.get('/classified', async (req, res) => {
  try {
      const data = await Classified.find();
      console.log(data);
      res.json(data);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

setInterval(() => {
  console.log('Running API...');
  // make a GET request to the API endpoint
  const http = require('http');
  http.get('http://localhost:5000/classified', (res) => {
      let data = '';
      res.on('data', (chunk) => {
          data += chunk;
      });
      res.on('end', () => {
          console.log(JSON.parse(data));
      });
  }).on('error', (err) => {
      console.error('Error making request to API...', err);
  });
}, 1 * 60 * 1000);



module.exports = router;

