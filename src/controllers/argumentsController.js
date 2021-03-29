const {validationResult} = require('express-validator');
// const questionsRepo = require('../repos/questionsRepo');
const optionsRepo = require('../repos/optionsRepo');
const argumentsRepo = require('../repos/argumentsRepo');
const choicesRepo = require('../repos/choicesRepo');
const questionsRepo = require('../repos/questionsRepo');

exports.postArgument = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'validation error, please check fields', errors: errors.array()});
    };
    if (req.body.body.length > 1000){
        const error = new Error('validation error, please check fields.');
        error.statusCode = 403;
        error.errors = errors.array();
        next(error);
        return;
    };
    const optionId = req.params.optionId;
    //check if option exists
    const option = await optionsRepo.getOptionById(optionId);
    if(option.length !== 1){
        return res.status(404).json({message: 'Option not found.'});
    };
    //check if user has posted a choice for any of the question's options
    //check if user has already submitted an argument for any other option of same question
    //1. check all options of the question
    const allOptions = await optionsRepo.getOptionsByQuestionId(option[0].question_id);
    //2. for each of the options, check if there are any 
    // choice with option_id/ user_id combination
    let userHasCosen = false;
    for (let i = 0; i < allOptions.length; i++){
        const opt = allOptions[i];
        const choices = await choicesRepo.checkEligibility(opt.id, req.userId);
        if (choices.length !== 0){
            userHasCosen = true;
            if (choices[0].option_id != optionId){
                return res.status(403).json({message: 'User chose a different option.'});
            }
        }
    }
    if (!userHasCosen){
        return res.status(403).json({message: 'User needs to choose an option before argumenting.'});
    }
    //3. for each of the options, check if argumets are from user
    for (let i = 0; i < allOptions.length; i++){
        const opt = allOptions[i];
        const args = await argumentsRepo.getArgumentsByOptionId(opt.id);
        for (let j = 0; j < args.length; j++){
            const arg = args[j];
            if (arg.user_id === req.userId){
                return res.status(403).json({message: 'User already posted argument.'});
            };
        };
    };

    const argumentBody = req.body.body;
    const rows = await argumentsRepo.postArgument(argumentBody, req.userId, option[0].id);
    return res.status(201).json({message: `Argument posted successfully.`, data: rows});
};

exports.getArgumentById = async (req, res, next) => {
    const argumentId = req.params.id;
    const argument = await argumentsRepo.getArgumentById(argumentId);
    res.status(201).json({message: 'Success', data: argument});
};

exports.getArgumentsByOptionId = async (req, res, next) => {
    const optionId = req.params.optionId;
    //check if option exists
    const option = await optionsRepo.getOptionById(optionId);
    if (option.length !== 1){
        return res.status(404).json({message: 'Option not found.'});
    };
    const arguments = await argumentsRepo.getArgumentsByOptionId(optionId);
    return res.status(201).json({message: 'Success', data: arguments});
};

exports.getArgumentsByQuestionId = async (req, res, next) => {
    const questionId = req.params.questionId;
    //check if question exists
    const question = await questionsRepo.getQuestionById(questionId);
    if (question.length !== 1){
        return res.status(404).json({message: 'Question not found.'});
    };
    const arguments = await argumentsRepo.getArgumentsByQuestionId(questionId);
    return res.status(201).json({message: 'Success', data: arguments});
};

exports.deleteArgument = async (req, res, next) => {
    const argumentId = req.params.id;
    //check if argument exists
    const argument = await argumentsRepo.getArgumentById(argumentId);
    if (argument.length !== 1){
        return res.status(404).json({message: 'Argument not found.'});
    };
    //check if argument belong to user
    if (argument[0].user_id !== req.userId){
        return res.status(403).json({message: 'Not authorized.'});
    };
    //delete argument
    const arguments = await argumentsRepo.deleteArgument(argumentId);
    return res.status(201).json({message: 'Success', data: arguments});
};

exports.updateArgument = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'validation error, please check fields', errors: errors.array()});
    };
    const argumentId = req.params.id;
    //check if argument exists
    const argument = await argumentsRepo.getArgumentById(argumentId);
    if (argument.length !== 1){
        return res.status(404).json({message: 'Argument not found.'});
    };
    //check if argument belong to user
    if (argument[0].user_id !== req.userId){
        return res.status(403).json({message: 'Not authorized.'});
    };
    //update argument
    const body = req.body.body;
    const arguments = await argumentsRepo.updateArgument(body, argumentId);
    return res.status(201).json({message: 'Success', data: arguments});
};