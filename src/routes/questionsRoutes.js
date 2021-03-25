const express = require('express');
const {body, check} = require('express-validator');
const questionsController = require('../controllers/questionsController');
const isAuth = require('../middleware/is-auth');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();


router.get('/api/questions', questionsController.getQuestions);

router.post('/api/question/post', isAuth,
    [ body('title').trim().isLength({min: 1}), body('body').trim().isLength({min: 1})], 
    questionsController.postQuestion);

router.get('/api/question/:id', checkAuth, questionsController.getQuestionById);

router.put('/api/question/update/:id', isAuth,
    [ body('title').trim().isLength({min: 1}), body('body').trim().isLength({min: 1})],
    questionsController.updateQuestionById);

router.delete('/api/question/delete/:id', isAuth, questionsController.deleteQuestionById);

module.exports = router;