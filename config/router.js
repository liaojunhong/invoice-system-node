const express = require('express');
const router = express.Router();
const users = require('../app/controller/users');
const user_auth = require('./middlewares/user_auth');

router.get('/', function (req, res) {
    res.send('ok!!')
})
    .post('/login', users.sign_in)
    .post('/test', users.sign_up);


module.exports = router;
