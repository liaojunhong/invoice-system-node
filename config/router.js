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

    .get('/get_all_stores', stores.all_store)
    .post('/add_update_store',stores.add_update_store)
    .post('/delete_store',stores.delete_store)


    .post('/add_invoice',invoices.add_invoice)
    .post('/delete_invoice',invoices.delete_invoice)
    .post('/find_invoice_by_date',invoices.find_invoice_food)



    .post('/test',test.tester);


module.exports = router;
