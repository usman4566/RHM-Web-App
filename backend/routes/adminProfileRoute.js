const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtToken = require('../middleware/AuthTokenRequired')
const router = express.Router();
// const Admin = mongoose.model('Admin');
const AdminProfile =mongoose.model('AdminProfile')
const bcrypt = require('bcrypt');
const upload=require('../middleware/multer')
require('dotenv').config();
const cloudinary = require('../middleware/Cloudinary')

router.post('/adminProfile',upload.single("image"), async (req, res) => {
    console.log(req.body);


    const { email,description,name,adminid} = req.body;
    if( !email || !description||!name){
        return res.status(422).send({error: "All fields are required"});
    }
    const pic = await cloudinary.uploader.upload(req.file.path);
    AdminProfile.findOne({email: email})
    .then( async (savedAdmin) => {
            if(savedAdmin){
                return res.status(422).send({error: "User already exist"});
            }
            const admin = new AdminProfile({
                email,
                profilepic:pic.secure_url,
                description,
                name,
                adminid
            })
            try{
                await admin.save();
                res.send({admin});
            }
            catch(err) {
                console.log('Error: ', err);
                return res.status(422).send({error: err.message});
            }
        }
    )
})

router.post('/getAdminProfile',async (req, res) => {
    const email=req.body.email;
    console.log(req.body)
    AdminProfile.findOne({email: email})
    .then( async (savedAdmin) => {
            if(savedAdmin){
                return res.status(200).send({savedAdmin});
            }
    
})
})

router.put('/updateAdminProfile/:id', upload.single("image"), async (req, res) => {
    const { name, description,adminID} = req.body;
    console.log(req.body)
    // const check =await AdminProfile.find({})
    // console.log(check)
    // // console.log(check)
    // const admin= await AdminProfile.findOne({adminid:adminID})

    let profilepic = null;
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        profilepic = result.secure_url;
    }
    await AdminProfile.findOneAndUpdate({adminid:adminID}, { name, description, profilepic }, { useFindAndModify: false })
        .then(admin => {
            if (!admin) {
                return res.status(404).send({ error: `admin not found with id=`});
            }else
            
            res.send({ message:"admin profile was updated successfully." });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        });
  });

  router.get('/getAdminid',async (req, res) => {
    const id=req.body._id;
    console.log(req.body)
    AdminProfile.findOne({id: id})
    .then( async (savedAdmin) => {
            if(savedAdmin){
                return res.status(200).send({savedAdmin});
            }
    
})
})
module.exports = router;