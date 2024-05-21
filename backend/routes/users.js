//import de tous les modules
var express = require("express");
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
const User = require('../models/users');

//Route post avec un ceckbody qui va check si les req.body.username, password, email ne sont pas vides
router.post("/signup", (req, res) => {
    if (!checkBody(req.body, ['username', 'password', 'email'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    /*On va chercher en database si le username du req.body existe en database,
    si il n'éxiste pas alors on le créer*/
    User.findOne({ username: req.body.username }).then(data => {
        if (data === null) {
            const payload = {
                username: req.body.username
            };
            const options = {
                expiresIn: '1h',
                algorithm: 'HS256'
            };

            const hash = bcrypt.hashSync(req.body.password, 10);
            const token = jwt.sign(payload, secretKey, options);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                token
            });

            newUser.save().then(newDoc => {
                res.json({ result: true, token: newDoc.token });
            });
        } else {
            res.json({ result: false, error: 'User already exists' });
        }
    });
});

router.post("/signin", (req, res) => {
    if (!checkBody(req.body, ["email", "password"])) {
        res.json({ result: false, error: "Missing or empty fields" });
        return;
    }

    User.findOne({ email: req.body.email }).then((data) => {
        if (data && bcrypt.compareSync(req.body.password, data.password)) {

            const payload = {
                username: data.username
            };
            const options = {
                expiresIn: '1h',
                algorithm: 'HS256'
            };
            const newToken = jwt.sign(payload, secretKey, options);


            data.token = newToken;
            data.save().then(() => {
                res.json({ result: true, token: newToken });
            });
        } else {
            res.json({ result: false, error: "User not found or wrong password" });
        }
    });
});

module.exports = router;
