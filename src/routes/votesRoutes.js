const express = require('express');
const votesController = require('../controllers/votesController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('/vote/:argumentId', isAuth, votesController.postArgumentVote);

// router.post('/vote/:commentId', isAuth, votesController.postCommentVote);

// router.delete('/vote/:argumentId', isAuth, votesController.deleteArgumentVote);

// router.delete('/vote/:commentId', isAuth, votesController.deleteCommentVote);

module.exports = router;