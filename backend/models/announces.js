const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    street: String,
    city: String,
    zipcode: String,
});

const availableDateSchema = mongoose.Schema({
    startDateAt: Date,
    endDateAt: Date,
});

const accomodationSchema = mongoose.Schema({
    sleeping: Boolean,
    restauration: Boolean,
});

const announceSchema = mongoose.Schema({
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Corrigé ici pour référencer 'User'
    address: [addressSchema],
    availableDates: [availableDateSchema],
    locationType: [String],
    instrumentsAvailable: [String],
    capacity: Number,
    description: String,
    accessibility: Boolean,
    placeRanking: Number,
    accomodation: accomodationSchema,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Announce = mongoose.model('Announce', announceSchema);

module.exports = { Announce };
