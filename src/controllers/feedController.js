const {validationResult} = require('express-validator');
const questionsRepo = require('../repos/questionsRepo');

exports.getQuestions = async (req, res, next) => {
    const questionsFeed = await questionsRepo.getQuestions();
    res.status(200).json(questionsFeed);
};


exports.postQuestion = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'validation error, please check fields', errors: errors.array()});
    };
    const newQuestion = {
        user_id: req.body.user_id,
        title: req.body.title,
        body: req.body.body,
        url: req.body.url
    };
    await questionsRepo.postQuestion(newQuestion);
    res.status(201).json({message: 'question posted successfully'});
};