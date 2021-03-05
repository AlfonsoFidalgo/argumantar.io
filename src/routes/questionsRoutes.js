const express = require('express');
const {body, check} = require('express-validator');
const questionsController = require('../controllers/questionsController');
const isAuth = require('../middleware/is-auth');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();


router.get('/questions', questionsController.getQuestions);

router.post('/question/post', isAuth,
    [ body('title').trim().isLength({min: 1}), body('body').trim().isLength({min: 1})], 
    questionsController.postQuestion);

router.get('/question/:id', checkAuth, questionsController.getQuestionById);

router.put('/question/update/:id', isAuth,
    [ body('title').trim().isLength({min: 1}), body('body').trim().isLength({min: 1})],
    questionsController.updateQuestionById);

router.delete('/question/delete/:id', isAuth, questionsController.deleteQuestionById);

module.exports = router;