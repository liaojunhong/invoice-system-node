const Invoice = require('../models/invoice');
const InvoiceFood = require('../models/invoice_food');

module.exports.add_invoice = async function (req, res) {
    const body = req.body;
    const foods = body.foods;
    try {
        delete body.foods;
        let invoice = new Invoice(body);
        invoice.total_price = foods.reduce(function (total, item) {
            item.invoice_id = invoice._id;
            return total + item.item_total;
        }, 0);
        let food_doc = await InvoiceFood.insertMany(foods);
        let data = await invoice.save();
        if (data) return res.send({stat: 0, msg: '新增单据成功!'});
        else return res.send({stat: 2000, msg: '新增失败'})
    } catch (err) {
        return res.send({stat: 3000, msg: err})
    }
};


module.exports.delete_invoice = async function (req, res) {
    const id = req.query.id;
    Invoice.findByIdAndDelete(id, function (err, data) {
        if (err) return res.send({stat: 1000, msg: err});
        return res.send({stat: 0, msg: '删除单据成功'})
    })
};

module.exports.find_invoice_food = async function (req, res) {
    const date = req.query.date;
    try {
        let invoices = await Invoice.find({invoice_date: date});
        let goods = await InvoiceFood.find({
            $in: {invoice_id: invoices.map((i) => i.invoice_id)}
        });
        let goods_dic = {};
        goods.forEach(function (el) {
            if (goods_dic[el.food_name]) goods_dic[el.food_name] = el.food_num;
            else goods_dic[el.food_name] += el.food_num
        });
        return res.send({stat: 0, data: goods_dic});
    } catch (err) {
        return res.send({stat: 3000, msg: '服务器错误，错误信息为' + err})
    }
};

module.exports.find_invoice = async function (req, res) {

};

