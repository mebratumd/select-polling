const mongoose = require("mongoose");
require('./student.js');
require('./election.js');

const classroomSchema = new mongoose.Schema({
  name: String,
  password: String,
  partake: Boolean,
  school: String,
  registered: Date,
  ongoingElections: [{type:mongoose.Schema.Types.ObjectId, ref:'Election'}],
  archived: [{type:mongoose.Schema.Types.ObjectId, ref:'Election'}],
  master: {type:mongoose.Schema.Types.ObjectId, ref:'Student'},
  students: [{email:String, studentnumber:Number, name:String}],
  joined:Number
});

module.exports = mongoose.model('Classroom',classroomSchema);
