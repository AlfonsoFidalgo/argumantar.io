const {validationResult} = require('express-validator');
const questionsRepo = require('../repos/questionsRepo');

exports.getQuestions = async (req, res, next) => {
    const questionsFeed = await questionsRepo.getQuestions();
    res.status(200).json(questionsFeed);
};

exports.getQuestionById = async (req, res, next) => {
    const questionId = req.params.id;
    const question = await questionsRepo.getQuestionById(questionId);
    res.status(200).json(question);
};

exports.deleteQuestionById = async (req, res, next) => {
    const questionId = req.params.id;
    const rowCount = await questionsRepo.deleteQuestion(questionId);
    res.status(200).json({message: `${rowCount} question(s) posted successfully`});
};

exports.postQuestion = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'validation error, please check fields', errors: errors.array()});
    };
    const newQuestion = {
        user_id: req.body.user_id,
        title: req.body.title,
        body: req.body.body
    };
    const rowCount = await questionsRepo.postQuestion(newQuestion);
    res.status(201).json({message: `${rowCount} question(s) posted successfully`});
};

exports.updateQuestionById = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'validation error, please check fields', errors: errors.array()});
    };
    const questionId = req.params.id;
    
    const body = req.body.body;
    const title = req.body.title;
    const rowCount = await questionsRepo.updateQuestion(body, title, questionId);
    res.status(201).json({message: `${rowCount} question(s) updated successfully`});
};