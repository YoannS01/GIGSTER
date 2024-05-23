var express = require("express");
var router = express.Router();
const moment = require('moment')
const { checkBody } = require('../modules/checkBody');
const { User } = require('../models/users');
const authMiddleware = require('../middleware/auth')

router.post("/userInfo", authMiddleware, (req, res) => {
    if (!checkBody(req.body, ['firstname', 'lastname', 'birthDate', 'phoneNumber', 'street', 'city', 'zipCode'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const username = req.auth.username;

    User.findOne({ username }).then(user => {
        if (user) {
            const newUserInfo = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                birthDate: Date(moment(req.body.birthDate, 'DD/MM/YYYY').format('DD/MM/YYYY')),
                phoneNumber: req.body.phoneNumber,
                isArtist: req.body.isArtist,
                isHost: req.body.isHost
            }

            const newAddress = {
                street: req.body.street,
                city: req.body.city,
                zipCode: req.body.zipCode
            };

            user.address.push(newAddress)

            user.save().then(() => {
                res.json({ result: true, newArtist: newUserInfo });
            });
        }
    })


})

router.post("/artist", authMiddleware, (req, res) => {
    if (!checkBody(req.body, ['genre', 'member', 'artistName', 'placeOrigin'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const username = req.auth.username;

    User.findOne({ username }).then(user => {
        if (user) {
            const newArtist = {
                genre: req.body.genre,
                member: req.body.member,
                artistName: req.body.artistName,
                placeOrigin: req.body.placeOrigin,
            };

            user.artist.push(newArtist);
            user.isArtist = true
            user.artistRanking = 5
            user.updatedAt = Date.now()


            user.save().then(() => {
                res.json({ result: true, newArtist: newArtist });
            });
        }
    });

});

router.post("/host", authMiddleware, (req, res) => {
    if (!checkBody(req.body, ['description', 'favoriteGenre'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const username = req.auth.username

    User.findOne({ username }).then(user => {
        if (user) {
            const newHost = {
                description: req.body.description,
                favoriteGenre: req.body.favoriteGenre
            }

            user.host.push(newHost)
            user.isHost = true
            user.hostRanking = 5
            user.updatedAt = Date.now()

            user.save().then(() => {
                res.json({ result: true, newHost: newHost })
            })
        }
    })
})

module.exports = router;

