const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    street: String,
    city: String,
    zipcode: String,
});

const showSchema = mongoose.Schema({
    tourID: { type: mongoose.Schema.Types.ObjectId, ref: 'tours' },
    date: Date,
    createdAt: Date,
    updatedAt: Date,
    adress: addressSchema,
    host: { type: Schema.Types.ObjectId, ref: 'user' },
    status: String,
    isValidated: Boolean,
    isRefused: Boolean,
});

const ShowsAdress = mongoose.model('showsAdress', addressSchema)
const Show = mongoose.model('shows', showSchema);

module.exports = { ShowsAdress, Show }