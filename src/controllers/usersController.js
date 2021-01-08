const {validationResult} = require('express-validator');
const usersRepo = require('../repos/usersRepo');


exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'validation error, please check fields', errors: errors.array()});
    };
    const newUser = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName,
        bio: req.body.bio
    };

    const rowCount = await usersRepo.signup(newUser);
    res.status(201).json({message: `${rowCount} user created successfully`});
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await usersRepo.findUser(email);
    if (user.length == 1){
        const correctPassword = await usersRepo.auth(user[0], password);
        if (!correctPassword){
            res.status(401).json({message: 'wrong password provided'});
        } else {
            res.status(200).json({message: `welcome back ${user[0].username}` })
        }
        
    } else {
        res.status(401).json({message: `no user with email ${email} was found`});
    };

    
};