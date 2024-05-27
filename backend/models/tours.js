const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    showsID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'shows' }],
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt: Date,
    updatedAt: Date,
    isValidated: Boolean,
    status: String,
    setDuration: String,
});

const Tour = mongoose.model('tours', tourSchema);

module.exports = { Tour };