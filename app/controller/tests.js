const User = require('../models/user');
const moment = require('moment');
const Invoice = require('../models/invoice');
const Store = require('../models/store');


module.exports.tester = async function (req, res) {
    try {
        const body = req.body;
        console.log(body);
        // let invoice = new Invoice(body);
        let data = await Invoice.findByIdAndDelete('5cc6a0db20b6130d48bfe5d4');
        // let data = await invoice.save();
        console.log(data);
        return res.send({stat: 1000, msg: 'fff'})
    } catch (err) {
        return res.send({stat: 3000, msg: err});
    }
};
