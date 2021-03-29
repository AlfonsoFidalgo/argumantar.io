const {validationResult} = require('express-validator');
const questionsRepo = require('../repos/questionsRepo');
const optionsRepo = require('../repos/optionsRepo');

exports.getQuestions = async (req, res, next) => {
    const questionsFeed = await questionsRepo.getQuestions();
    res.status(200).json(questionsFeed);
};

exports.getQuestionById = async (req, res, next) => {
    const questionId = req.params.id;
    const question = await questionsRepo.getQuestionById(questionId);
    let votes = [];
    if (req.userId) {
        const votes = await questionsRepo.fetchVotes(req.userId, questionId);
        res.status(200).json({question: question, votes: votes});
    } else {
        res.status(200).json({question: question, votes: votes});
    }
    
};

exports.deleteQuestionById = async (req, res, next) => {
    const questionId = req.params.id;
    const question = await questionsRepo.getQuestionById(questionId);
    if(question.length !== 1){
        return res.status(404).json({message: 'Question not found.'});
    };
    
    if(question[0].user_id !== req.userId){
        return res.status(403).json({message: 'Not authorized to delete.'});
    };
    
    const rowCount = await questionsRepo.deleteQuestion(questionId);
    res.status(200).json({message: `${rowCount} question(s) deleted successfully`});
};

exports.postQuestion = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'validation error, please check fields', errors: errors.array()});
    };
    if (req.body.title.length > 100 || req.body.body.length > 500){
        const error = new Error('validation error, please check fields.');
        error.statusCode = 403;
        error.errors = errors.array();
        next(error);
        return;
    };
    const newQuestion = {
        user_id: req.userId,
        title: req.body.title,
        body: req.body.body
    };
    //rows return the new question information
    const rows = await questionsRepo.postQuestion(newQuestion);
    
    //posting a question should post 2 standard options (agree/disagree)
    const defaultOptions = [
        {
            questionId: rows.id,
            body: "Agree"
        }, {
            questionId: rows.id,
            body: "Disagree"
        }
    ];
    await optionsRepo.postOption(defaultOptions[0]);
    await optionsRepo.postOption(defaultOptions[1]);
    res.status(201).json({message: `Question posted successfully`, data: rows});
};

exports.updateQuestionById = async (req, res, next) => {
    const questionId = req.params.id;
    const question = await questionsRepo.getQuestionById(questionId);
    if(question.length !== 1){
        return res.status(404).json({message: 'Question not found.'});
    };
    if(question[0].user_id !== req.userId){
        return res.status(403).json({message: 'Not authorized to edit.'});
    };
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'validation error, please check fields', errors: errors.array()});
    };
    
    const body = req.body.body;
    const title = req.body.title;
    const rowCount = await questionsRepo.updateQuestion(body, title, questionId);
    res.status(201).json({message: `${rowCount} question(s) updated successfully`});
};