const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true },  
    interest: { type: mongoose.Schema.Types.ObjectId, ref: 'Interest' },  
    option: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interest' }],
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;