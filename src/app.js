const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const questionsRouter = require('./routes/questionsRoutes');
const usersRouter = require('./routes/usersRoutes');
const optionsRouter = require('./routes/optionsRoutes');
const argumentsRouter = require('./routes/argumentsRoutes');

module.exports = () => {
    const app = express();

    app.use(bodyParser.json());
    //CORS middleware
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    app.use(questionsRouter);
    app.use(usersRouter);
    app.use(optionsRouter);
    app.use(argumentsRouter);

    return app;
};