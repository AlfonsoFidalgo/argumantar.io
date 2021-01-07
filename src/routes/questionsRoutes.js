const express = require('express');
const {body} = require('express-validator');
const questionsController = require('../controllers/questionsController');
const router = express.Router();


router.get('/questions', questionsController.getQuestions);

router.post('/question', 
    [ body('title').trim().isLength({min: 1}), body('body').trim().isLength({min: 1})], 
    questionsController.postQuestion);

router.get('/question/:id', questionsController.getQuestionById);

router.put('/question/:id',
    [ body('title').trim().isLength({min: 1}), body('body').trim().isLength({min: 1})],
    questionsController.updateQuestionById);

module.exports = router;