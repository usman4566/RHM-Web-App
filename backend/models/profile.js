const mongoose = require('mongoose'); 

const profileSchema = new mongoose.Schema({
    profilepic:{
        type:String
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }

})

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;