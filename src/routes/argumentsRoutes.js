const express = require('express');
const {body} = require('express-validator');
const argumentsController = require('../controllers/argumentsController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();


router.post('/option/:optionId/argument/post', isAuth,
[ body('body').trim().isLength({min: 1})],
argumentsController.postArgument);

router.get('/argument/:id', argumentsController.getArgumentById);

router.get('/option/:optionId/arguments/get', argumentsController.getArgumentsByOptionId);

module.exports = router;