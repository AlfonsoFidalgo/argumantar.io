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

exports.getComment = async (req, res, next) => {}

exports.getComments = async (req, res, next) => {
    const argumentId = req.params.argumentId;
    const rows = await commentsRepo.getComments(argumentId);
    return res.status(201).json({message: `Success.`, data: rows});
};

exports.updateComment = async (req, res, next) => {}

exports.deleteComment = async (req, res, next) => {}