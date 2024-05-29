const express = require("express");
const router = express.Router();
const { checkBody } = require('../modules/checkBody');
const authMiddleware = require('../middleware/auth');
const { Announce } = require("../models/announces");
const cloudinary = require('cloudinary').v2;
const uniqid = require('uniqid');
const fs = require('fs');

router.post("/announces", authMiddleware, (req, res) => {
    const requiredFields = ['street', 'city', 'zipcode', 'instrumentsAvailable', 'locationType', 'availableDate', 'capacity', 'sleeping', 'restauration', 'description'];
    if (!checkBody(req.body, requiredFields)) {
        return res.json({ result: false, error: 'Missing or empty fields' });
    }

    const username = req.auth.username;

    User.findOne({ username }).then(user => {
        if (!user) {
            return res.json({ result: false, error: 'User not found' });
        }

        const newAnnounce = new Announce({
            host: user._id,
            address: [{ street: req.body.street, city: req.body.city, zipcode: req.body.zipcode }],
            availableDates: [{
                startDateAt: req.body.startDateAt,
                endDateAt: req.body.endDateAt,
            }],
            locationType: req.body.locationType,
            instrumentsAvailable: req.body.instrumentsAvailable,
            capacity: req.body.capacity,
            description: req.body.description,
            media: [resultCloudinary.secure_url], // Utilisation de l'URL fournie par Cloudinary
            accessibility: req.body.accessibility,
            accomodation: { sleeping: req.body.sleeping, restauration: req.body.restauration },
            createdAt: new Date(),
            updatedAt: new Date()
        });

        newAnnounce.save().then(() => {
            res.json({ result: true, newAnnounce });
        }).catch(error => {
            res.json({ result: false, error: 'Error saving announce to database' });
        });
    }).catch(error => {
        res.json({ result: false, error: 'Error finding user' });
    });
});


module.exports = router;


router.post("/tours", authMiddleware, (req, res) => {
    const requiredFields = ['date', 'city', 'street', 'zipcode', 'status'];
    if (!checkBody(req.body, requiredFields)) {
        return res.json({ result: false, error: 'Missing or empty fields' });
    }

    const username = req.auth.username;

    User.findOne({ username }).then(user => {
        if (user) {
            const newShow = new Show({
                host: user._id,
                date: req.body.date,
                address: [{ street: req.body.street, city: req.body.city, zipcode: req.body.zipcode }],
                status: req.body.status,
                isValidated: req.body.isValidated,
                isRefused: req.body.isRefused,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            newShow.save().then(savedShow => {
                const newTour = new Tour({
                    artist: user._id,
                    showsID: [savedShow._id],
                    isValidated: req.body.isValidated,
                    status: req.body.status,
                    setDuration: req.body.setDuration,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                newTour.save().then(() => {
                    res.json({ result: true, newTour });
                });
            });
        } else {
            res.json({ result: false, error: 'User not found' });
        }
    });
});

router.post("/shows", authMiddleware, (req, res) => {
    const requiredFields = ['date', 'city', 'street', 'city', 'zipcode', 'status'];
    if (!checkBody(req.body, requiredFields)) {
        return res.json({ result: false, error: 'Missing or empty fields' });
    }

    const username = req.auth.username;

    User.findOne({ username }).then(user => {
        if (user) {
            const newShow = new Show({
                host: user._id,
                tourID: req.body.tourID,
                date: req.body.date,
                address: [{ street: req.body.street, city: req.body.city, zipcode: req.body.zipcode }],
                status: req.body.status,
                isValidated: req.body.isValidated,
                isRefused: req.body.isRefused,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            newShow.save().then(() => {
                res.json({ result: true, newShow });
            });
        } else {
            res.json({ result: false, error: "User not found" });
        }
    });
});

module.exports = router;
