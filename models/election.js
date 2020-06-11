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
  quota: {type:Number,default:1},
  count: [{votes:Number,name:String}],
  count_STV: [{ranks:[[String]],total:{type:Number,default:0},name:String}],
  winners: [{votes:Number,name:String}],
  total: {type:Number,default:0},
  candidates: [{name:String}],
  elected_STV: [{quota:Number,name:String}],
  tokens: [{email:String,hash:String}],
  links: [String],
  electionAccess: [{email:String,permission:Boolean}],
  voteStatus: [{email:String,didVote:Boolean}],
  description: String,
  approvalRate: Number
});

module.exports = mongoose.model('Election',electionSchema);
