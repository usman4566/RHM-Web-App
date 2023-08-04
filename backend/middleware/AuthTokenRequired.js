const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');
require('dotenv').config()


module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(401).send({error: "You must be logged in!"});
    }
    const token = authorization.replace("Bearer ", "");
    //console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(401).json({error: "You must logged in!"});
        }
        const {_id} = payload;
        Admin.findById(_id).then(adminData => {
            req.admin = adminData;
            next();
        })

    })
}

// const jwt = require('jsonwebtoken')

// const generateToken=(id) =>{
//     return jwt.sign({id},process.env.JWT_SECRET,{
//         expiresIn:"30d"
//     })
// }
// module.exports = generateToken;