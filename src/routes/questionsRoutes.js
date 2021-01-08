const express = require('express');
const {body} = require('express-validator');
const questionsController = require('../controllers/questionsController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();


router.get('/questions', questionsController.getQuestions);

router.post('/question', isAuth,
    [ body('title').trim().isLength({min: 1}), body('body').trim().isLength({min: 1})], 
    questionsController.postQuestion);

router.get('/question/:id', questionsController.getQuestionById);

router.put('/question/:id',
    [ body('title').trim().isLength({min: 1}), body('body').trim().isLength({min: 1})],
    questionsController.updateQuestionById);

router.delete('/question/:id', questionsController.deleteQuestionById);

module.exports = router;