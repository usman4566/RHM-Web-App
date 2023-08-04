const express = require('express');
const port = 5000;

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors({
  origin: 'https://roadhealthmap-dckc.vercel.app',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());

require('./db');
require('./models/Admin');
require('./models/AdminProfile');
require('./models/Values');
require('./models/Classified');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminProfileRoute');
const feedBackRoutes = require('./routes/feedBackRoutes');
const requireToken = require('./middleware/AuthTokenRequired');
const valuesRoute = require('./routes/valuesRoute');
const mappingRoute = require('./routes/mappingRoute');

app.use(authRoutes);
app.use(adminRoutes);
app.use(feedBackRoutes);
app.use(valuesRoute);
app.use(mappingRoute);

app.get('/', requireToken, (req, res) => {
  console.log(req.admin);
  res.send(req.admin);
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
