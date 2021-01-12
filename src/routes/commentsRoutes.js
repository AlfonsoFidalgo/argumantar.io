const express = require('express');
const {body} = require('express-validator');
const argumentsController = require('../controllers/argumentsController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/comment/get/:id');

router.get('/comments/:argumentId');

router.post('/comment/post/:argumentId');

router.delete('/comments/delete/:id');

router.put('/comment/update/:id');


module.exports = router;