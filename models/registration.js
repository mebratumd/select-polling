const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  time: Number,
  counter: Number
});

module.exports = mongoose.model('Registration',registrationSchema);
