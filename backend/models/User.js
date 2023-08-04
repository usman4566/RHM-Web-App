const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre('save', async function (next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }
    user.password = await bcrypt.hash(user.password, 8);
    console.log("Just Before saving: ", user.password);
    next();
})

mongoose.model("User", userSchema);