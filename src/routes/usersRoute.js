const express = require('express');
const {body} = require('express-validator');
const userController = require('../controllers/usersController');
const router = express.Router();



router.post('/signup', [
    body('email').isEmail().normalizeEmail(),
    body('password').trim().isLength({min: 8})
], userController.signup);

router.post('/login', userController.login);

module.exports = router;