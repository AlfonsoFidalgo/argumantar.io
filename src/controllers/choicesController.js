const optionsRepo = require('../repos/optionsRepo');
const choicesRepo = require('../repos/choicesRepo');
const argumentsRepo = require('../repos/argumentsRepo');

exports.postChoice = async (req, res, next) => {
    const optionId = req.params.optionId;
    //check if option exists
    const option = await optionsRepo.getOptionById(optionId);
    if(option.length !== 1){
        return res.status(404).json({message: 'Option not found.'});
    };
    //check if user already has a choice for any of the question's options
    //1. check all options of the question
    const allOptions = await optionsRepo.getOptionsByQuestionId(option[0].question_id);
    //2. for each of the options, check if there are any 
    // choice with option_id/ user_id combination
    for (let i = 0; i < allOptions.length; i++){
        const opt = allOptions[i];
        const rows = await choicesRepo.checkEligibility(opt.id, req.userId);
        if (rows.length !== 0){
            return res.status(403).json({message: 'User already chose an option.'});
        }
    }
    const rows = await choicesRepo.postChoice(optionId, req.userId);
    return res.status(201).json({message: `Choice posted successfully.`, data: rows});
};

exports.deleteChoiceByOptionId = async (req, res, next) => {
    const optionId = req.params.optionId;
    //check if option exists
    const option = await optionsRepo.getOptionById(optionId);
    if(option.length !== 1){
        return res.status(404).json({message: 'Option not found.'});
    };
    //fetch the choice_id from the option_id / user_id combination 
    const rows = await choicesRepo.checkEligibility(optionId, req.userId);
    if (rows.length !== 1){
        return res.status(403).json({message: 'User didnt choose that option.'});
    }
    const choiceId = rows[0].id;
    await choicesRepo.deleteChoice(choiceId); 
    //should also delete any argument associated with the user_id / option_id combination (if any)
    //find arguments where option_id = choice.option_id and user_id = req.userId
    await argumentsRepo.deleteArgumentAfterChoice(optionId, req.userId);
    return res.status(201).json({message: `Choice deleted successfully.`});
};

exports.deleteChoice = async (req, res, next) => {
    const choiceId = req.params.id;
    //check if choice exists and belongs to user
    const choice = await choicesRepo.getChoice(choiceId);
    if(choice.length !== 1){
        return res.status(404).json({message: 'Choice not found.'});
    };
    if(choice[0].user_id !== req.userId){
        return res.status(403).json({message: 'Not authorized.'});
    };
    const rows = await choicesRepo.deleteChoice(choiceId);
    
    //should also delete any argument associated with the user_id / option_id combination (if any)
    //find arguments where option_id = choice.option_id and user_id = req.userId
    const optionId = choice[0].option_id;
    await argumentsRepo.deleteArgumentAfterChoice(optionId, req.userId);
    return res.status(201).json({message: `Choice deleted successfully.`, data: rows});
};