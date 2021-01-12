const express = require('express');
const {body} = require('express-validator');
const isAuth = require('../middleware/is-auth');
const commentsController = require('../controllers/commentsController');
const router = express.Router();

router.get('/comment/get/:id');

router.get('/comments/:argumentId');

router.post('/comment/post/:argumentId', isAuth, commentsController.postComment);

router.delete('/comments/delete/:id');

router.put('/comment/update/:id');


module.exports = router;