const express = require('express');
const router = express.Router();
const users = require('../app/controller/users');
const stores = require('../app/controller/stores');
const foods = require('../app/controller/foods');
const invoices = require('../app/controller/invoices');
const test = require('../app/controller/tests');

router.get('/', function (req, res) {
    res.send('ok!!')
})
    .get('/sign_out', users.sign_out)
    .post('/login', users.sign_in)
    .post('/user_register', users.sign_up)


    .get('/get_all_food', foods.all_food)
    .post('/add_update_food',foods.add_update_food)
    .post('/delete_food',foods.delete_food)


    .post('/add_invoice',invoices.add_invoice)
    .post('/delete_invoice',invoices.delete_invoice)

    .post('/test',test.tester);


module.exports = router;
