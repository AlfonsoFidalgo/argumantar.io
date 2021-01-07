const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const feedRouter = require('./routes/feedRoute')

module.exports = () => {
    const app = express();

    app.use(bodyParser.json());

    app.use(feedRouter);

    return app;
};