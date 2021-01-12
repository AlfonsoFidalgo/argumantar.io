const {validationResult} = require('express-validator');
const commentsRepo = require('../repos/commentsRepo');


exports.postComment = async (req, res, next) => {
    const argumentId = req.params.argumentId;
    const commentBody = req.body.body;
    const userId = req.userId;

    const rows = await commentsRepo.postComment(commentBody, userId, argumentId);
    return res.status(201).json({message: `Comment posted successfully.`, data: rows});
};

exports.getComment = async (req, res, next) => {}

exports.getComments = async (req, res, next) => {}

exports.updateComment = async (req, res, next) => {}

exports.deleteComment = async (req, res, next) => {}