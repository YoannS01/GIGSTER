const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    street: String,
    city: String,
    zipcode: String,
});

const availableDateSchema = mongoose.Schema({
    startDateAt: Date,
    endDateAt: Date
});

const announceSchema = mongoose.Schema({
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'hosts' },
    createdAt: Date,
    updatedAt: Date,
    address: addressSchema,
    availableDates: [availableDateSchema],
    locationType: String,
    instrumentsAvailable: [String],
    capacity: Number,
    description: String,
    media: [String],
    accessibility: Boolean,
    placeRanking: Number
});

const Announce = mongoose.model('announces', announceSchema);

module.exports = Announce;