const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const usersRepo = require('../repos/usersRepo');


exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('validation error, please check fields.');
        error.statusCode = 403;
        error.errors = errors.array();
        next(error);
        return;
        //return res.status(422).json({message: 'validation error, please check fields', errors: errors.array()});
    };
    const newUser = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName,
        bio: req.body.bio
    };
    const user = await usersRepo.findUser(req.body.email);
    const username = await usersRepo.findUserByUsername(req.body.username);
    if (user.length != 0){
        const error = new Error('email already in use.');
        error.statusCode = 403;
        next(error);
        //res.status(403).json({message: `email already in use.`});
    } else if (username.length != 0){
        const error = new Error('username already in use.');
        error.statusCode = 403;
        next(error);
    } else {
        const rowCount = await usersRepo.signup(newUser);
        res.status(201).json({message: `user created successfully.`});
    }  
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await usersRepo.findUser(email);
    if (user.length == 1){
        const correctPassword = await usersRepo.auth(user[0], password);
        if (!correctPassword){
            const error = new Error('wrong password provided');
            error.statusCode = 401;
            next(error);
            //res.status(401).json({message: 'wrong password provided'});
        } else {
            const token = jwt.sign({
                email: user[0].email,
                userId: user[0].id
            },
            'supahdupahiberiansekret',
            {
                expiresIn: '1h'
            });

            res.status(200).json({message: `welcome back ${user[0].username}`, token: token, userId: user[0].id });
        }
        
    } else {
        const error = new Error('email not found');
        error.statusCode = 401;
        next(error);
        //res.status(401).json({message: `no user with email ${email} was found`});
    };  
};

exports.updateUser = async (req, res, next) => {
    const displayName = req.body.displayName;
    const bio = req.body.bio;
    const userId = req.params.id;
    const user = await usersRepo.findUserById(userId);
    if(user.length !== 1){
        const error = new Error('user not found');
        error.statusCode = 404;
        next(error);
        //res.status(404).json({message: 'User not found.'});
    };
    if(user[0].id !== req.userId){
        const error = new Error('Not authorized to edit');
        error.statusCode = 403;
        next(error);
        //return res.status(403).json({message: 'Not authorized to edit.'});
    };

    const rows = await usersRepo.updateUser(displayName, bio, user[0].id);
    res.status(201).json({message: `User updated successfully`});
};

exports.deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    const user = await usersRepo.findUserById(userId);
    if(user.length !== 1){
        const error = new Error('User not found');
        error.statusCode = 404;
        next(error);
        //res.status(404).json({message: 'User not found.'});
    };
    if(user[0].id !== req.userId){
        const error = new Error('Not authorized to delete');
        error.statusCode = 403;
        next(error);
        //return res.status(403).json({message: 'Not authorized to delete.'});
    };

    const rows = await usersRepo.deleteUser(user[0].id);
    res.status(201).json({message: `User deleted successfully`});
};