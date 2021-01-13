const express = require('express');
const {body} = require('express-validator');
const votesController = require('../controllers/votesController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('/vote/argument/:argumentId', isAuth,
[ body('type').trim().isIn(['upvote', 'downvote'])], votesController.postArgumentVote);

router.post('/vote/comment/:commentId', isAuth,
[ body('type').trim().isIn(['upvote', 'downvote'])], votesController.postCommentVote);

router.delete('/vote/argument/:argumentId', isAuth, votesController.deleteArgumentVote);

// router.delete('/vote/:commentId', isAuth, votesController.deleteCommentVote);

module.exports = router;