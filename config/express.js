'use strict';

const express = require('express');
const session = require('express-session');
const compression = require('compression'); //压缩中间件
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoStore = require('connect-mongo')(session);
// const requireHttps = require('./middlewares/require-https');
const config = require('./');
const pkg = require('../package.json');

const env = process.env.NODE_ENV || 'development';
const router = require('./router');
const login_verify = require('./middlewares/user_auth');

module.exports = function (app) {
    // app.use(requireHttps);

    app.use(
        compression({
            threshold: 512
        })
    );

    app.use(
        cors({
            origin: 'http://localhost:3000', //配置跨域请求地址
            optionsSuccessStatus: 200, // 跨域插件
            credentials: true
        })
    );

    app.use(express.static(config.root + '/public')); //处理静态资源定位符

    app.set('views', config.root + '/app/views'); //配置视图
    app.set('view engine', 'html');

    app.use(function (req, res, next) {
        res.locals.pkg = pkg;
        res.locals.env = env;
        next();
    });

    app.use(bodyParser.json()); //处理post请求体
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(
        session({
            resave: false,
            saveUninitialized: true,
            secret: pkg.name,
            cookie: {
                maxAge: 1000 * 60 * 10, // 设置 session 的有效时间，单位毫秒
            },
            store: new mongoStore({
                url: config.db,
                collection: 'sessions',
                autoRemove: 'interval',
                autoRemoveInterval: 1
            })
        })
    );

    app.use(login_verify);
    app.use(router);


};


