const {validationResult} = require('express-validator');
const optionsRepo = require('../repos/optionsRepo');
const questionsRepo = require('../repos/questionsRepo');

exports.getOptionsByQuestionId = async (req, res, next) => {
    const questionId = req.params.questionId;
    const question = await questionsRepo.getQuestionById(questionId);
    if(question.length !== 1){
        return res.status(404).json({message: 'Question not found.'});
    };
    const options = await optionsRepo.getOptionsByQuestionId(questionId);
    res.status(201).json({message: 'Success', data: options});
};

exports.getOptionById = async (req, res, next) => {
    const id = req.params.id;
    const option = await optionsRepo.getOptionById(id);
    res.status(201).json({message: 'Success', data: option});
};

exports.postOption = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'validation error, please check fields', errors: errors.array()});
    };
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