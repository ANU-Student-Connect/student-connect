const mongoose = require('mongoose');

const InterestSchema = new mongoose.Schema({
    name: { type: String, required: true },  
    type: { type: String, default: '' },  
    created_at: { type: Date, default: Date.now },  
    icon_link: { type: String, default: '' }  
});

const Interest = mongoose.model('Interest', InterestSchema);
module.exports = Interest;