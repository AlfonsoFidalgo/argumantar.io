const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const userController = require('../controllers/usersController');


router.post('/user/signup', [
    body('email').isEmail().normalizeEmail(),
    body('password').trim().isLength({min: 8})
], userController.signup);

router.post('/user/login', userController.login);

router.put('/user/update/:id', isAuth, userController.updateUser);

router.delete('/user/delete/:id', isAuth, userController.deleteUser);

module.exports = router;