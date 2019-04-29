'use strict';

module.exports = function (req, res, next) {
    // next();
    if (req.session.user || req.url.includes('/public')
    || req.url.includes('/user_register') || req.url.includes('/login')
    ) return next();
    return res.send({stat: 3333, msg: '请登陆!'})
};

