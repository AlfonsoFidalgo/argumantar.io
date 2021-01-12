const express = require('express');
const {body} = require('express-validator');
const isAuth = require('../middleware/is-auth');
const commentsController = require('../controllers/commentsController');
const router = express.Router();

router.get('/comment/:id', commentsController.getComment);

router.get('/comments/:argumentId', commentsController.getComments);

router.post('/comment/post/:argumentId', isAuth,
[ body('body').trim().isLength({min: 1})], commentsController.postComment);

router.delete('/comment/delete/:id', isAuth, commentsController.deleteComment);

router.put('/comment/update/:id', isAuth,
[ body('body').trim().isLength({min: 1})], commentsController.updateComment);


module.exports = router;