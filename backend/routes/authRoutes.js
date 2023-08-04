const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtToken = require('../middleware/AuthTokenRequired')
const router = express.Router();
const Admin = mongoose.model('Admin');
const bcrypt = require('bcrypt');
require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');


router.post('/signup', async (req, res) => {
    console.log(req.body);

    const { email, password} = req.body;
    if( !email || !password){
        return res.status(422).send({error: "All fields are required"});
    }

    Admin.findOne({email: email})
    .then( async (savedAdmin) => {
            if(savedAdmin){
                return res.status(422).send({error: "User already exist"});
            }
            const admin = new Admin({
                email,
                password
            })
            try{
                await admin.save();
                const token = jwt.sign({ _id: admin._id}, process.env.JWT_SECRET);
                res.send({token});
            }
            catch(err) {
                console.log('Error: ', err);
                return res.status(422).send({error: err.message});
            }
        }
    )
})

router.post('/login', async (req, res) => {
    const{email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({error: "Email or Password is not entered!"});
    }
    const savedAdmin = await Admin.findOne({email: email});

    if(!savedAdmin){
        return res.status(422).json({error: "Invalid Credentials"});
    }

    try{
        bcrypt.compare(password, savedAdmin.password, (err, result) => {
            if(result){
                const token = jwt.sign({ _id: savedAdmin._id}, process.env.JWT_SECRET,
                    {
                        expiresIn: "2h",
                    });
                    savedAdmin.authtoken = token;
                savedAdmin.save();
                console.log(savedAdmin);
                res.status(200).json({
                    token,
                    savedAdmin
                });
            }
            else{
                return res.status(422).json({error: "Invalid Password"})
            }
        })
    }
    catch(err) {
        console.log(err);
    }
})

router.get('/profile')

router.options('*', cors({
  allowedHeaders: ['Content-Type', 'Authorization']
}));

router.put('/ChangePassword', jwtToken, async (req, res) => {
  const { newPassword, confirmNewPassword } = req.body;

  try {
    // Find the admin by their ID
    const admin = await Admin.findById(req.admin._id);
    
    // Check if the new passwords match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ msg: 'New passwords do not match' });
    }
    
    admin.password = newPassword;

    // Save the updated admin in the database
    await admin.save();
    
    res.json({ msg: 'Password changed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



//     try {
//         const adminid = req.body._id;
//         const password = req.body.password;
        
//         const data = await Admin.findOne({_id});

//         if(data)
//         {
//             const passwordhash = await bcrypt.hash(password,10);
//             const admindata = Admin.findByIdAndUpdate({email:admin_email},{$set:{
//                 password:passwordhash
//             }});

//             res.status(200).send({success:true,msg:"password updated"});
        
//         }
//         else{
//             res.status(200).send({success:false,msg:"admin id not found"});
//         }

//     } catch {
//         res.status(400).send({message:"failed"});
//     }
// });


// Forgot password API
router.post('/forgotPassword', async (req, res) => {
    try {
      
      const { email } = req.body;
  
      
      if (!email) {
        throw new Error('Email address is required.');
      }
  
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new Error('User not found.');
      }
  
      // Generate a reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
  
      admin.resettoken = resetToken;
      admin.resetPasswordExpires = Date.now() + 3600000;
      await admin.save();
  
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.User,
          pass: process.env.Pass,
        },
      });
  
      const mailOptions = {
        from: 'aizazahmed8691@gmail.com',
        to: email,
        subject: 'Password Reset Link',
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link or paste it into your browser to complete the process:\n\nhttps://roadhealthmap-dckc.vercel.app/reset/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
  
      await transporter.sendMail(mailOptions);
      res.status(200).send({ success: true, message: 'Password reset link sent to your email.' });
    } catch (error) {
      console.log('error:', error);
      res.status(400).send({ success: false, message: error.message });
    }
  });

  router.post('/resetPassword', async (req, res) => {
    try {
      const { token, password } = req.body;
  
      if (!token || !password) {
        throw new Error('Token and password are required.');
      }
  
      const admin = await Admin.findOne({
        resettoken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!admin) {
        throw new Error('Invalid or expired reset token.');
      }
  
      admin.password = password;
      admin.resettoken = null;
      admin.resetPasswordExpires = null;
  
      await admin.save();
  
      res.status(200).send({ success: true, message: 'Password reset successfully.' });
    } catch (error) {
      console.log('error:', error);
      res.status(400).send({ success: false, message: error.message });
    }
  });

module.exports = router;