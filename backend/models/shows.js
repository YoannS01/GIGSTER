const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    street: String,
    city: String,
    zipcode: String,
});

const showSchema = mongoose.Schema({
    tourID: { type: mongoose.Schema.Types.ObjectId, ref: 'Tours' },
    date: Date,
    createdAt: Date,
    updatedAt: Date,
    adress: addressSchema,
    host: { type: Schema.Types.ObjectId, ref: 'users' },
    status: String,
    isValidated: Boolean,
    isRefused: Boolean,
});

const Show = mongoose.model('shows', showSchema);

module.exports = Show;