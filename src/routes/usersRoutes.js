const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const userController = require('../controllers/usersController');


router.post('/api/user/signup', [
    body('email').isEmail().normalizeEmail(),
    body('username').trim().isLength({min: 1}),
    body('password').trim().isLength({min: 8})
], userController.signup);

router.post('/api/user/login', userController.login);

router.put('/api/user/update/:id', isAuth, userController.updateUser);

router.delete('/api/user/delete/:id', isAuth, userController.deleteUser);

module.exports = router;