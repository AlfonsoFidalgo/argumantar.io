const express = require('express');
const usersRouter = require('./routes/users');
const webappRouter = require('./routes/webapp')

module.exports = () => {
    const app = express();
    app.use(express.json());
    app.use(webappRouter);
    app.use(usersRouter);

    return app;
};