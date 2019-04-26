const Food = require('../models/food');

module.exports.add_new_food = async function (req, res) {
    const body = req.body;
    try {
        let food = new Food(body);
        food.save(function (err) {
            if (err) return res.send({stat: 9999, msg: err});
            return res.send({stat: 0, msg: '创建成功!'});
        });
    } catch (err) {
        res.send({stat: 2000, msg: err})
    }
};
