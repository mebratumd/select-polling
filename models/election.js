const mongoose = require("mongoose");
require('./student.js');
require('./classroom.js');

const electionSchema = new mongoose.Schema({
  type:String,
  title: String,
  class:{type: mongoose.Schema.Types.ObjectId,ref:'Classroom'},
  duration: Number,
  date: Date,
  status: Boolean,
  vacancies: Number,
  quota: {type: Number,default:0},
  count: [{studentnumber:Number,votes:Number,name:String}],
  count_STV: [{studentnumber:Number,ranks:[[String]],total:{type:Number,default:0},name:String}],
  total: {type:Number,default:0},
  candidates: [{studentnumber:Number,name:String}],
  elected_STV: [{studentnumber:Number,quota:Number,name:String}],
  tokens: [{studentnumber:Number,hash:String}],
  links: [String],
  electionAccess: [{studentnumber:Number,permission:Boolean}],
  voteStatus: [{studentnumber:Number,didVote:Boolean}],
  description: String,
});

module.exports = mongoose.model('Election',electionSchema);
