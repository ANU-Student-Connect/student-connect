const express = require("express");
const Question = require('../models/Question');
const router = express.Router();


//Query all Question information
router.get('/all',async(req,res)=>{
    try{
        const question = await Question.find();    
        res.json(question);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;

