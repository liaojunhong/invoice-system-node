const User = require('../models/user');


exports.sign_up = async function (req, res) {
    const body = req.body;
    try {
        let has_user = await User.CheckUser(body.name);
        if (has_user) return res.send({stat: 0, msg: '该用户名称已存在！'});
    } catch (errs) {
        res.send({stat: 3000, msg: err});
    }
    let user = new User(body);
    user.save(function (err, msg) {
        if (err) return res.send({stat: 1000, msg: err});
        req.session.user = req.body.name;
        return res.send({stat: 0, msg: '注册成功!'})
    })
};

exports.sign_in = async function (req, res) {
    req.session.user = null;
    const body = req.body;
    console.log(body);
    try {
        let user = await User.CheckUser(body.name);
        if (!user) return res.send({stat: 0, msg: '暂无该用户信息'});
        let temp_user = new User(user);
        const result = await temp_user.ComparePassword(body.password);
        if (result) {
            req.session.user = {name: req.body.name, id: temp_user._id};
            return res.send({stat: 0, msg: '登陆成功!'});
        }
        return res.send({stat: 1000, msg: '用户名或密码错误！'})
    } catch (err) {
        res.send({stat: 2000, msg: err})
    }
};

exports.sign_out = async function (req, res) {
    try {
        req.session.destroy();
        return res.send({stat: 0, msg: '退出成功!'});
    } catch (err) {
        return res.send({stat: 9999, msg: err})
    }

};


