const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.mongo_url).then(
    () => {
        console.log('Connected to Database');
    }
)
.catch((err) => {
    console.log(`Cannot connect to db` + err);
})