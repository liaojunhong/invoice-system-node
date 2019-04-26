'use strict';


exports.login_verify = function (req, res, next) {
    if (req.session.user) return next();
    return res.send({stat: 3333, msg: '请登陆!'})
};

