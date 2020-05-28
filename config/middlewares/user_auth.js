'use strict';

module.exports = function (req, res, next) {
    // next();
    // console.log(res.session)
    console.log(req.url)
    if (req.session.user || req.url.includes('/public')
    || req.url.includes('/user_register') || req.url.includes('/login') ||
    req.url.includes('/upload_image') || req.url.includes('/get_img/')
    ) return next();
    return res.send({stat: 3333, msg: '请登陆!'})
};

