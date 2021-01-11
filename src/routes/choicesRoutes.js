const express = require('express');
const choicesController = require('../controllers/choicesController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('/choice/:optionId', isAuth, choicesController.postChoice);

router.delete('/choice/:optionId')

module.exports = router;