const express = require('express');
const {body} = require('express-validator');
const feedController = require('../controllers/feedController');
const router = express.Router();


router.get('/questions', feedController.getQuestions);

router.post('/question', 
    [ body('title').trim().isLength({min: 1}), body('body').trim().isLength({min: 1})], 
    feedController.postQuestion);




module.exports = router;