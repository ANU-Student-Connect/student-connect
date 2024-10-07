const express = require("express");
const Interest = require('../models/Interest');
const router = express.Router();


//Query all Interest information
router.get('/all',async(req,res)=>{
    try{
        const interests = await Interest.find();    
        res.json(interests);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;

