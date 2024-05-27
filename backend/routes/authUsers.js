var express = require("express");
var router = express.Router();
const moment = require('moment');
const { checkBody } = require('../modules/checkBody');
const authMiddleware = require('../middleware/auth');
const { Announce } = require("../models/announces");
const { User } = require("../models/user");
const fs = require('fs');
const uniqid = require('uniqid');
const cloudinary = require('cloudinary').v2;

router.post("/announce", authMiddleware, (req, res) => {
    if (!checkBody(req.body, ['street', 'city', 'zipcode', 'instrumentsAvailable', 'locationType', 'availableDate', 'capacity', 'sleeping', 'restauration'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const photoPath = `./tmp/${uniqid()}.jpg`;

    req.files.photoFromFront.mv(photoPath).then(() => {
        return cloudinary.uploader.upload(photoPath);
    }).then(resultCloudinary => {
        fs.unlinkSync(photoPath);

        const username = req.auth.username;

        User.findOne({ username }).then(user => {
            if (user) {
                const newAnnounce = new Announce({
                    host: user._id,
                    address: [{
                        street: req.body.street,
                        city: req.body.city,
                        zipcode: req.body.zipcode
                    }],
                    availableDates: [{
                        startDateAt: moment(req.body.availableDate).startOf('day').toDate(),
                        endDateAt: moment(req.body.availableDate).endOf('day').toDate()
                    }],
                    locationType: req.body.locationType,
                    instrumentsAvailable: req.body.instrumentsAvailable,
                    capacity: req.body.capacity,
                    description: req.body.description,
                    media: [resultCloudinary.secure_url],
                    accessibility: req.body.accessibility,
                    accomodation: {
                        sleeping: req.body.sleeping,
                        restauration: req.body.restauration
                    },
                    createdAt: new Date(),
                    updatedAt: new Date()
                })





                newAnnounce.save().then(() => {
                    res.json({ result: true, url: resultCloudinary.secure_url, newAnnounce })
                });
            } else {
                res.json({ result: false, error: 'User not found' })
            }
        });
    });
});

router.post("/shows", authMiddleware, (req, res) => )

module.exports = router;
