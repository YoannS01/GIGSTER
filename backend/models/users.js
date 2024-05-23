const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    street: String,
    city: String,
    zipCode: Number,
});

const hostSchema = mongoose.Schema({
    hostRanking: Number,
    description: String,
    announces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Announce' }],
    favoriteGenre: [String],
    hostedArtist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const artistSchema = mongoose.Schema({
    artistName: String,
    genre: [String],
    member: Number,
    media: [String],
    description: String,
    placeOrigin: String,
    tours: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }],
    artistRanking: Number,
});

const userSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    verifiedPassword: String,
    token: String,
    address: [addressSchema],
    isArtist: Boolean,
    isHost: Boolean,
    artist: [artistSchema],
    host: [hostSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    profilePicture: String,
    firstname: String,
    lastname: String,
    birthDate: Date,
    phoneNumber: String,
});

const UserAddress = mongoose.model('UserAddress', addressSchema);
const Host = mongoose.model('Host', hostSchema);
const Artist = mongoose.model('Artist', artistSchema);
const User = mongoose.model('User', userSchema);

module.exports = { UserAddress, Host, Artist, User };
