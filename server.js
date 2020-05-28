'use strict';

const fs = require('fs');
const join = require('path').join;
const mongoose = require('mongoose');
const express = require('express');
const config = require('./config');

const models = join(__dirname, 'app/models');
const port = process.env.PORT || 3002;
const app = express();

require('./config/express')(app);


fs.readdirSync(models)
    .filter(file => ~file.search(/^[^.].*\.js$/))
    .forEach(file => require(join(models, file)));



connect();

function listen() {
    app.listen(port);
    console.log('app is listen on port' + port)
}

function connect() {
    mongoose.connection
        .on('error', console.log)
        // .on('disconnected', connect())
        .on('open', listen);
    return mongoose.connect(config.db, {keepAlive: 1, useNewUrlParser: true});
}


// app.listen(8080, () => console.log('server is listen port 8080'))
