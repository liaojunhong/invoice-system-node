const Food = require('../models/food');

module.exports.add_update_food = async function (req, res) {
    const body = req.body;
    try {
        let temp_food = await Food.CheckFood(body.name, body.id);
        if (!body.id && temp_food) return res.send({stat: 1000, msg: '该商品已经存在!'});
        else if (body.id && !temp_food) return res.send({stat: 2000, msg: '更新商品不存在'});
        else if (body.id && temp_food) {
            delete temp_food._id;
            Object.assign(temp_food, body);
            temp_food.save(function (err) {
                if (err) return res.send({stat: 9999, msg: err});
                return res.send({stat: 0, msg: '更新成功!'});
            });
        } else {
            let food = new Food(body);
            food.save(function (err) {
                if (err) return res.send({stat: 9999, msg: err});
                return res.send({stat: 0, msg: '创建成功!'});
            });
        }
    } catch (err) {
        return res.send({stat: 2000, msg: err})
    }
};

module.exports.all_food = async function (req, res) {
    let page = (parseInt(req.query.page) - 1) * 10;
    try {
        let count = await Food.countDocuments();
        Food.find({}, null, {skip: page}).limit(10).exec(function (err, data) {
            if (err) return res.send({stat: 2000, msg: '服务器错误，错误信息为：' + err});
            return res.send({stat: 0, data: data, count: count})
        })
    } catch (err) {
        return res.send({stat: 2000, msg: '服务器错误，错误信息为：' + err})
    }
};

module.exports.delete_food = function (req, res) {
    const _id = req.body.id;
    Food.findByIdAndDelete(_id, function (err, data) {
        if (err) res.send({stat: 9999, msg: err});
        else res.send({stat: 0, msg: '删除成功!'})
    })
};

