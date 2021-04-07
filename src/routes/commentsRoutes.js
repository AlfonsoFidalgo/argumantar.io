const express = require('express');
const {body} = require('express-validator');
const isAuth = require('../middleware/is-auth');
const commentsController = require('../controllers/commentsController');
const router = express.Router();

router.get('/api/comment/:id', commentsController.getComment);

router.get('/api/comments/argument/:argumentId', commentsController.getComments);

router.get('/api/comments/question/:questionId', commentsController.getCommentsByQuestionId);

router.post('/api/comment/post/:argumentId', isAuth,
[ body('body').trim().isLength({min: 1})], commentsController.postComment);

router.delete('/api/comment/delete/:id', isAuth, commentsController.deleteComment);

router.put('/api/comment/update/:id', isAuth,
[ body('body').trim().isLength({min: 1})], commentsController.updateComment);


module.exports = router;