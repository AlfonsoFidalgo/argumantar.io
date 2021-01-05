const express = require('express');

const userRepo = require('../../repositories/users');
const router = express.Router();


router.get('/users', async (req, res) => {
    const allUsers = await userRepo.fetchAll();
    console.log(allUsers);
});


router.get('/users:id', async (req, res) => {});
router.post('/users', async (req, res) => {});
router.put('/users/:id', async (req, res) => {});
router.delete('/users/:id', async (req, res) => {});

module.exports = router;