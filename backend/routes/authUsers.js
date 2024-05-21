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

    User.findOne({ username }).then(exist => {
        if (exist) {
            const newArtist = new Artist({
                artistName: [req.body.artistName],
                genre: req.body.genre,
                member: req.body.member,
            })
        }
    });
});

router.post("/host", (req, res) => {
    if (!checkBody(req.body, [''])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
});

module.exports = router;
