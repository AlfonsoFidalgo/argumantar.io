const express = require('express');
const choicesController = require('../controllers/choicesController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('api/choice/:optionId', isAuth, choicesController.postChoice);

router.delete('api/choice/:optionId', isAuth, choicesController.deleteChoiceByOptionId);

//router.delete('/choice/:id', isAuth, choicesController.deleteChoice);

module.exports = router;