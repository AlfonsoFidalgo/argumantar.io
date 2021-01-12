const optionsRepo = require('../repos/optionsRepo');
const choicesRepo = require('../repos/choicesRepo');
const argumentsRepo = require('../repos/argumentsRepo');
const votesRepo = require('../repos/votesRepo');

exports.postArgumentVote = async (req, res, next) => {
    const argumentId = req.params.argumentId;
    const voteType = req.body.type;
    //check if argument exists
    const argument = await argumentsRepo.getArgumentById(argumentId);
    if (argument.length !== 1){
        return res.status(404).json({message: 'Argument not found.'});
    };
    //check that the user hasn't already voted that argument
    const userId = req.userId;
    const userVote = await votesRepo.checkUserArgumentVote(userId, argumentId);
    if (userVote.length !== 0){
        //send error if user voted the same option he's trying to vote
        if (userVote[0].v_type === voteType){
            return res.status(403).json({message: 'User already voted.'});
        } else {
        //otherwise, update comment with new type
            const updatedVote = await votesRepo.updateArgumentVote(voteType, userId, argumentId);
            return res.status(201).json({message: 'Vote updated correctly.'});
        }     
    };
    //check if the user chose the option of the argument
    const optionId = argument[0].option_id;
    const userChoice = await choicesRepo.checkEligibility(optionId, userId);
    if (userChoice.length === 0){
        return res.status(403).json({message: 'User did not chose that option.'});
    };
    //proceed
    const vote = await votesRepo.postArgumentVote(argumentId, userId, voteType);
    return res.status(201).json({message: 'Vote posted correctly', data: vote});
};

exports.deleteArgumentVote = async (req, res, next) => {
    const argumentId = req.params.argumentId;
    //check if argument exists

    //check if user has previously voted that argument
};

//NEED TO FINISH COMMENT ROUTES FIRST
// exports.postCommentVote = async (req, res, next) => {
//     const commentId = req.params.argumentId;
// };

// exports.deleteCommentVote = async (req, res, next) => {
//     const commentId = req.params.argumentId;
// };