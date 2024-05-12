const mongoose = require("mongoose");

const TesterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
});

const BetaTester = mongoose.model("BetaTester", TesterSchema);

module.exports = BetaTester;
