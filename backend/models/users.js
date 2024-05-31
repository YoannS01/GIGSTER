const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: String,
});

const hostSchema = mongoose.Schema({
  hostRanking: { type: Number, default: 5 },
  description: String,
  announces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Announce" }],
  favoritesGenres: { type: [String], required: true },
  hostedArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const artistSchema = mongoose.Schema({
  artistname: { type: String, required: true },
  genres: { type: [String], required: true },
  members: { type: Number, default: 1 },
  //medias: [String],
  description: String,
  placeOrigin: String,
  tours: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tour" }],
  artistRanking: { type: Number, default: 5 },
});

const userSchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  firstname: String,
  lastname: String,
  password: { type: String, required: true },
  verifiedPassword: String,
  token: String,
  addresses: [addressSchema],
  isArtist: Boolean,
  isHost: Boolean,
  artist: artistSchema,
  host: hostSchema,
  //image: [String],
  phoneNumber: String,
  birthdate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  profilePicture: String,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
