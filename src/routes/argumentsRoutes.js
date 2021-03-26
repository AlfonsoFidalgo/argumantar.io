const express = require('express');
const {body} = require('express-validator');
const argumentsController = require('../controllers/argumentsController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();


router.post('/api/option/:optionId/argument/post', isAuth,
[ body('body').trim().isLength({min: 1})],
argumentsController.postArgument);

router.get('/api/question/:questionId/arguments/get', argumentsController.getArgumentsByQuestionId);

router.get('/api/argument/:id', argumentsController.getArgumentById);

router.get('/api/option/:optionId/arguments/get', argumentsController.getArgumentsByOptionId);

router.delete('/api/argument/delete/:id', isAuth, argumentsController.deleteArgument);

router.put('/api/argument/update/:id', isAuth,
[ body('body').trim().notEmpty()],
 argumentsController.updateArgument);

module.exports = router;