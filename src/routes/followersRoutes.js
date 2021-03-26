const express = require('express');
const followersController = require('../controllers/followersController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('/api/follow/:userId', isAuth, followersController.followUser);

router.delete('/api/follow/:userId', isAuth, followersController.unfollowUser);

module.exports = router;