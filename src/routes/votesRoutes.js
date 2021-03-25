const express = require('express');
const {body} = require('express-validator');
const votesController = require('../controllers/votesController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('api/vote/argument/:argumentId', isAuth,
[ body('type').trim().isIn(['upvote', 'downvote'])], votesController.postArgumentVote);

router.post('api/vote/comment/:commentId', isAuth,
[ body('type').trim().isIn(['upvote', 'downvote'])], votesController.postCommentVote);

router.delete('api/vote/argument/:argumentId', isAuth, votesController.deleteArgumentVote);

router.delete('api/vote/comment/:commentId', isAuth, votesController.deleteCommentVote);

module.exports = router;