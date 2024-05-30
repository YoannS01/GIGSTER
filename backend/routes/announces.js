const express = require("express");
const router = express.Router();
const { checkBody } = require('../modules/checkBody');
const authMiddleware = require('../middleware/auth');
const { Announce } = require("../models/announces");
const { User } = require("../models/users")

router.post("/announces", authMiddleware, (req, res) => {
    const requiredFields = ['street', 'city', 'zipcode', 'instrumentsAvailable', 'locationType', 'capacity', 'sleeping', 'restauration', 'description'];
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
            //media: [resultCloudinary.secure_url], // Utilisation de l'URL fournie par Cloudinary
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

router.get("/allAnnounces", (req, res) => {
    Announce.find()
        .populate('host')
        .then(announces => {
            res.json({ result: true, announces })
        })
})


module.exports = router;
