const jwt = require('jsonwebtoken');

//Like  isAuth, but not restrictive. The request will not fail is not authenticated, just the outcome will be different
module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader){
        req.userId = null;
        return next();
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'supahdupahiberiansekret')
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    if (!decodedToken){
        req.userId = null;
        return next();
    }
    req.userId = decodedToken.userId;
    next();
};



