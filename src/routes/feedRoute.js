const express = require('express');
const feedController = require('../controllers/feedController');
const router = express.Router();


router.get('/questions', feedController.getQuestions);

router.post('/question', feedController.postQuestion);




module.exports = router;