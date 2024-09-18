const express = require("express");
const User = require('../models/User');
const availableFields = require('../config/availableFields');
const router = express.Router();


//Query all user information
router.get('/all',async(req,res)=>{
    try{
        const users = await User.find().select(availableFields.user);
        res.json(users);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
})

//Get user by email
router.get('/',async(req,res)=>{

    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try{
        const users = await User.findOne({ email }).select(availableFields.user);
        res.json(users);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;

