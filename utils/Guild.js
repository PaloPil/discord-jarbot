const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  language: {
    type: String,
    required: true,
    default: "fr",
  },
  available: {
    type: Boolean,
    required: true,
    default: true,
  },
<<<<<<< HEAD
=======
  ownerId: {
    type: Number,
    required: false,
  },
>>>>>>> 1a598450aa6e82820f9c8b67b9006314b1d8cc00
});

const Guild = mongoose.model("Guild", GuildSchema);

module.exports = Guild;
