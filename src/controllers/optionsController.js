const {validationResult} = require('express-validator');
const optionsRepo = require('../repos/optionsRepo');
const questionsRepo = require('../repos/questionsRepo');

//question/:questionId/option/post
exports.postOption = async (req, res, next) => {
    const questionId = req.params.questionId;
    //check if question exists
    const question = await questionsRepo.getQuestionById(questionId);
    if(question.length !== 1){
        return res.status(404).json({message: 'Question not found.'});
    };
    //check if question belongs to user
    if(question[0].user_id !== req.userId){
        return res.status(403).json({message: 'Not authorized.'});
    };
    //new option object
    const newOption = {
        questionId,
        body: req.body.body
    };
    const rows = await optionsRepo.postOption(newOption);
    res.status(201).json({message: `Option posted successfully.`, data: rows});
};