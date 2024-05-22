var express = require("express");
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const User = require('../models/users');

router.post("/artist", (req, res) => {
    if (!checkBody(req.body, ['genre', 'artistName', 'placeOrigin', 'member'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const username = req.auth.username;

    User.findOne({ username }).then(user => {
        if (user) {
            const newArtist = new User({

            })
        }
    });
});

module.exports = router;
