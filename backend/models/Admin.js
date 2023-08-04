const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    authtoken:
    {
        type:String,
    },
    resettoken:{
        type: String,
        unique : true,
    },
    resetPasswordExpires:{
        type: String,
    }
})

adminSchema.pre('save', async function (next){
    const admin = this;
    if(!admin.isModified('password')){
        return next();
    }
    admin.password = await bcrypt.hash(admin.password, 8);
    console.log("Just Before saving: ", admin.password);
    next();
})


mongoose.model("Admin", adminSchema);