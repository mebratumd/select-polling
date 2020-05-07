const mongoose = require("mongoose");
require('./student.js');
require('./classroom.js');

const electionSchema = new mongoose.Schema({
  title: String,
  class:{type: mongoose.Schema.Types.ObjectId,ref:'Classroom'},
  duration: Number,
  date: Date,
  status: Boolean,
  count: [{studentnumber:Number,votes:Number}],
  candidates: [{studentnumber:Number,name:String}],
  tokens: [{studentnumber:Number,hash:String}],
  links: [String],
  electionAccess: [{studentnumber:Number,permission:Boolean}],
  voteStatus: [{studentnumber:Number,didVote:Boolean}],
  description: String,
});

module.exports = mongoose.model('Election',electionSchema);
