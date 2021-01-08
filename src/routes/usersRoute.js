const express = require('express');
const {body} = require('express-validator');
const userController = require('../controllers/usersController');
const router = express.Router();


router.get('/users', async (req, res) => {
    const allUsers = await userRepo.fetchAll();
    console.log(allUsers);
});


// router.get('/users:id', async (req, res) => {});
router.post('/signup', [
    body('email').isEmail().normalizeEmail(),
    body('password').trim().isLength({min: 8})
], userController.signup);
// router.put('/users/:id', async (req, res) => {});
// router.delete('/users/:id', async (req, res) => {});

module.exports = router;