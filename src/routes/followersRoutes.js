const express = require('express');
const followersController = require('../controllers/followersController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('/follow/:userId', isAuth, followersController.followUser);

router.delete('/follow/:userId', isAuth, followersController.unfollowUser);

module.exports = router;