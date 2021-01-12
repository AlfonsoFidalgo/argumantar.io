const {validationResult} = require('express-validator');
const commentsRepo = require('../repos/commentsRepo');


exports.postComment = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'validation error, please check fields', errors: errors.array()});
    };
    const argumentId = req.params.argumentId;
    const commentBody = req.body.body;
    const userId = req.userId;

    const rows = await commentsRepo.postComment(commentBody, userId, argumentId);
    return res.status(201).json({message: `Comment posted successfully.`, data: rows});
};

exports.getComment = async (req, res, next) => {
    const commentId = req.params.id;
    const rows = await commentsRepo.getComment(commentId);
    return res.status(201).json({message: `Success.`, data: rows});
};

exports.getComments = async (req, res, next) => {
    const argumentId = req.params.argumentId;
    const rows = await commentsRepo.getComments(argumentId);
    return res.status(201).json({message: `Success.`, data: rows});
};

exports.updateComment = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'validation error, please check fields', errors: errors.array()});
    };

    const commentId = req.params.id;
    const commentBody = req.body.body;
    const comment = await commentsRepo.getComment(commentId);
    if(comment.length == 0){
        return res.status(404).json({message: "Comment not found."})
    };

    if(comment[0].user_id !== req.userId){
        return res.status(403).json({message: "Not authorized."});
    };

    const rows = await commentsRepo.updateComment(commentId, commentBody);
    return res.status(201).json({message: `Comment updated successfully.`, data: rows});
};

exports.deleteComment = async (req, res, next) => {
    const commentId = req.params.id;
    const comment = await commentsRepo.getComment(commentId);
    if(comment.length == 0){
        return res.status(404).json({message: "Comment not found."})
    };

    if(comment[0].user_id !== req.userId){
        return res.status(403).json({message: "Not authorized."});
    };
    const rows = await commentsRepo.deleteComment(commentId);
    return res.status(201).json({message: `Comment deleted successfully.`, data: rows});
};