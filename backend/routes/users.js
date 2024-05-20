var express = require('express');
var router = express.Router();

require('../models/connection')
const User = require('../models/users')
const { checkBody } = require("../models/check")





router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
