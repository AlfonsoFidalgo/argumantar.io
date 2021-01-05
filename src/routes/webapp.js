const express = require('express');

const router = express.Router();


router.get('/', async (req, res) => {
    res.send('<h2>Argumentar.io</h2>')
});



module.exports = router;