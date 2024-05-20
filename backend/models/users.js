const mongoose = require('mongoose')

const adressSchema = mongoose.Schema({
    street: String,
    city: String,
    zipcode: String,
})

const hostSchema = mongoose.Schema({
    hostRanking: Number,
    description: String,
    announces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'announces' }],
    favoriteGenre: [String],
    hostedArtist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
})

const artistSchema = mongoose.Schema({
    genre: [String],
    member: Number,
    artistName: String,
    media: [String],
    descripton: String,
    placeOrigin: String,
    tours: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tours' }],
    artistRanking: Number,
})

const userSchema = mongoose.Schema({
    email: String,
    username: String,
    firstname: String,
    lastname: String,
    password: String,
    token: String,
    adress: adressSchema,
    isArtist: Boolean,
    isHost: Boolean,
    artists: artistSchema,
    hosts: hostSchema,
    phoneNumber: String,
    birthdate: Date,
    createdAt: Date,
    updatedAt: Date,
    profilePicture: String,
})

const User = mongoose.model('users', userSchema)

module.exports = User