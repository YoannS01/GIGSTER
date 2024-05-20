var express = require("express");
var router = express.Router();
import { checkBody } from "../modules/checkBody";

<<<<<<< HEAD
require('../models/connection')
const User = require('../models/users')
const { checkBody } = require("../models/check")





router.get('/', function (req, res, next) {
    res.send('respond with a resource');
=======
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
>>>>>>> 421fda69760d76dad4632da1c23edf776086fc9e
});


module.exports = router;
