const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const userController = require('../controllers/usersController');


router.post('/signup', [
    body('email').isEmail().normalizeEmail(),
    body('password').trim().isLength({min: 8})
], userController.signup);

router.post('/login', userController.login);

router.put('/user/update/:id', isAuth, userController.updateUser);

module.exports = router;