const mongoose = require("mongoose");
require('./classroom.js');

const studentSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  school: String,
  status: Boolean,
  active: Boolean,
  registered: Date,
  delete: {type:Date, expires:'60m'},
  hash: String,
  key:String,
  forgotPassword: String,
  forgotPasswordTimer:Number,
  classrooms_master: [{type: mongoose.Schema.Types.ObjectId, ref: 'Classroom'}],
  classrooms_student: [{type: mongoose.Schema.Types.ObjectId, ref: 'Classroom'}],
  loginAttempts: {type:Number,default:0},
  loginTimeout: Number
});

module.exports = mongoose.model('Student',studentSchema);
