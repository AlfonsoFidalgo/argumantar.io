const express = require('express');
const {body} = require('express-validator');
const optionsController = require('../controllers/optionsController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();


router.get('api/option/:id', optionsController.getOptionById);

router.get('api/options/:questionId', optionsController.getOptionsByQuestionId);

router.post('api/question/:questionId/option/post', isAuth,
[ body('body').trim().isLength({min: 1})],
 optionsController.postOption);

router.put('api/option/update/:id', isAuth, 
[ body('body').trim().isLength({min: 1})],
optionsController.updateOptionById);


module.exports = router;