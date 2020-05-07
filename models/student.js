const mongoose = require("mongoose");
require('./classroom.js');

const studentSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  studentnumber: Number,
  school: String,
  status: Boolean,
  active: Boolean,
  registered: Date,
  delete: {type:Date}, 
  classrooms_master: [{type: mongoose.Schema.Types.ObjectId, ref: 'Classroom'}],
  classrooms_student: [{type: mongoose.Schema.Types.ObjectId, ref: 'Classroom'}]
});

module.exports = mongoose.model('Student',studentSchema);
