const optionsRepo = require('../repos/optionsRepo');
const choicesRepo = require('../repos/choicesRepo');

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
    //2. for each of the options, check if the option_id/ user_id combination exists
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