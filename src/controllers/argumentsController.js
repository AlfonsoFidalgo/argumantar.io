const {validationResult} = require('express-validator');
const questionsRepo = require('../repos/questionsRepo');
const optionsRepo = require('../repos/optionsRepo');
const argumentsRepo = require('../repos/argumentsRepo');

exports.postArgument = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'validation error, please check fields', errors: errors.array()});
    };
    const optionId = req.params.optionId;
    //check if option exists
    const option = await optionsRepo.getOptionById(optionId);
    if(option.length !== 1){
        return res.status(404).json({message: 'Option not found.'});
    };
    //check if user has already submitted an argument for any other option of same question
    //1. check all options of the question
    const allOptions = await optionsRepo.getOptionsByQuestionId(option[0].question_id);
    //2. for each of the options, check if argumets are from user
    for (let i = 0; i < allOptions.length; i++){
        const opt = allOptions[i];
        const args = await argumentsRepo.getArgumentsByOptionId(opt.id);
        for (let j = 0; j < args.length; j++){
            const arg = args[j];
            if (arg.user_id === req.userId){
                return res.status(403).json({message: 'User already posted argument.'});
            }
        }
    }

    const argumentBody = req.body.body;
    const rows = await argumentsRepo.postArgument(argumentBody, req.userId, option[0].id);
    return res.status(201).json({message: `Argument posted successfully.`, data: rows});
};

exports.getArgumentById = async (req, res, next) => {
    const argumentId = req.params.id;
    const argument = await argumentsRepo.getArgumentById(argumentId);
    res.status(201).json({message: 'Success', data: argument});
};