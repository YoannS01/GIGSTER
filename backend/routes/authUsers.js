/*var express = require("express");
var router = express.Router();
const moment = require('moment')
const { checkBody } = require('../modules/checkBody');
const authMiddleware = require('../middleware/auth');
const { Announce } = require("../models/announces");
const fs = require('fs')
const uniqid = require('uniqid')
const cloudinary = require('cloudinary').v2;

router.post("/announce", authMiddleware, async (req, res) => {
    if (!checkBody(req.body, ['street', 'city', 'zipCode', 'accomodation', 'instrumentsAvailable', 'locationType', 'availableDate', 'capacity', 'sleeping', 'restauration'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const photoPath = `./tmp/${uniqid()}.jpg`;
    const resultMove = await req.files.photoFromFront.mv(photoPath);

    const resultCloudinary = await cloudinary.uploader.upload(photoPath);

    fs.unlinkSync(photoPath);

    if (!resultMove) {
        res.json({
            result: true,
            url: resultCloudinary.secure_url
        });
    } else {
        res.json({ result: false, error: resultMove });
    }

    const username = req.auth.username

    User.findOne({ username }).then(announceData => {
        if (announceData) {
            const newAnnounce = {
                host: [ObjectId],
                locationType: req.body.locationType,
                instrumentsAvailable: req.body.instrumentsAvailable,
                capacity: req.body.capacity,
                description: req.body.description,
                accessibility: req.body.accessibility,
                media: resultCloudinary.secure_url,
            }
        }
    })
})


module.exports = router;*/


