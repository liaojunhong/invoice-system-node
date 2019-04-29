const Store = require('../models/store');

module.exports.add_update_store = async function (req, res) {
    const body = req.body;
    try {
        let temp_store = await Store.CheckStore(body.name, body.id);
        if (!body.id && temp_store) return res.send({stat: 1000, msg: '该门店已经存在!'});
        else if (body.id && !temp_store) return res.send({stat: 2000, msg: '更新门店不存在'});
        else if (body.id && temp_store) {
            delete temp_store._id;
            Object.assign(temp_store, body);
            temp_store.save(function (err) {
                if (err) return res.send({stat: 9999, msg: err});
                return res.send({stat: 0, msg: '更新成功!'});
            });
        } else {
            let store = new Store(body);
            store.save(function (err) {
                if (err) return res.send({stat: 9999, msg: err});
                return res.send({stat: 0, msg: '创建成功!'});
            });
        }
    } catch (err) {
        return res.send({stat: 2000, msg: err})
    }
};

module.exports.all_store = function (req, res) {
    Store.find({}).exec(function (err, data) {
        if (err) return res.send({stat: 2000, msg: '服务器错误，错误信息为：' + err});
        return res.send({stat: 0, data: data})
    })
};

module.exports.delete_store = function (req, res) {
    const _id = req.body.id;
    Store.findByIdAndDelete(_id, function (err, data) {
        if (err) res.send({stat: 9999, msg: err});
        else res.send({stat: 0, msg: '删除成功!'})
    })
};
