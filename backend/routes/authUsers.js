var express = require("express");
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const { User } = require('../models/users');
const authMiddleware = require('../middleware/auth')

router.post("/user", authMiddleware, (req, res) => {

})

router.post("/artist", authMiddleware, (req, res) => {
    if (!checkBody(req.body, ['genre', 'artistName', 'placeOrigin', 'member'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const username = req.auth.username;

    User.findOne({ username }).then(user => {
        if (user) {
            const newArtist = {
                artistName: req.body.artistName,
                genre: req.body.genre,
                member: req.body.member,
                placeOrigin: req.body.placeOrigin,
                artistRanking: req.body.artistRanking,
            };

            user.artists.push(newArtist);
            user.isArtist = true

            user.save().then(() => {
                res.json({ result: true, newArtist: newArtist });
            });
        }
    });

});

module.exports = router;

