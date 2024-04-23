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
  ownerId: {
    type: Number,
    required: false,
  },
});

const Guild = mongoose.model("Guild", GuildSchema);

module.exports = Guild;
