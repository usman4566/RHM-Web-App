const mongoose = require('mongoose'); 

const AdminProfileSchema = new mongoose.Schema({
    adminid:{
        type:mongoose.Types.ObjectId
    },
    profilepic:{
        type:String
    },
    email:{
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

mongoose.model("AdminProfile", AdminProfileSchema);

