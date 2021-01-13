const express = require('express');
const followersController = require('../controllers/followersController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('/follow/:userId', isAuth);

router.delete('/follow/:userId', isAuth);

module.exports = router;