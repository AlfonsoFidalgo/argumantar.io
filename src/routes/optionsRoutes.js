const express = require('express');
const {body} = require('express-validator');
const optionsController = require('../controllers/optionsController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();


router.get('/option/:id', (req, res, next) => {res.json('ok')});

router.get('/options/:questionId');

router.post('/question/:questionId/option/post', isAuth,
[ body('body').trim().isLength({min: 1})],
 optionsController.postOption);


module.exports = router;