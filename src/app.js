const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const questionsRouter = require('./routes/questionsRoutes');
const usersRouter = require('./routes/usersRoutes');
const optionsRouter = require('./routes/optionsRoutes');
const argumentsRouter = require('./routes/argumentsRoutes');
const choicesRouter = require('./routes/choicesRoutes');
const votesRouter = require('./routes/votesRoutes');
const commentsRouter = require('./routes/commentsRoutes');
const followersRouter = require('./routes/followersRoutes');

module.exports = () => {
    const app = express();

    app.use(bodyParser.json());
    //CORS middleware
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, X-Auth-Token');
        next();
    });

    app.use(questionsRouter);
    app.use(usersRouter);
    app.use(optionsRouter);
    app.use(argumentsRouter);
    app.use(choicesRouter);
    app.use(votesRouter);
    app.use(commentsRouter);
    app.use(followersRouter);
    app.use((error, req, res, next) => {
        const status = error.statusCode || 500;
        const message = {message: error.message, data: error.errors};
        res.status(status).json(message)
    });

    if (process.env.NODE_ENV === 'production'){
        //express serves production assets
        app.use(express.static('client/build'));

        //express serves index.html if it doesn't recognise the route
        const path = require('path');
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
        });
    };

    return app;
};