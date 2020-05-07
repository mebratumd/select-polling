const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Student = require('../models/student.js');
const Classroom = require('../models/classroom.js');
const Election = require('../models/election.js');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const authenticated = (req,res,next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send();
  }

}

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      if (info.active) {
        return res.status(401).json({errors:[info]});
      } else {
        return res.status(423).send(info.message);
      }
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.json({});
    });
  })(req, res, next);
});


router.get("/loggedin",authenticated,(req,res)=>{

  Student.findById(req.user.id).populate({
    path: 'classrooms_master classrooms_student',
    select: '-password',
    populate: {
      path: 'ongoingElections archived',
      select: '-tokens',
      options:{sort:{'date':-1}}
    }
  }).select('-password -_id').lean().exec((err,student)=>{



    if (student) {

      student.classrooms_student.forEach((classroom)=>{
        classroom.students.forEach((s)=>{
          delete s['disabled'];
          delete s['studentnumber'];
        });
        classroom.ongoingElections.forEach((election)=>{
          election.voteStatus = election.voteStatus.filter(voterObject => voterObject.studentnumber == student.studentnumber);
          election.electionAccess = election.electionAccess.filter(accessObject => accessObject.studentnumber == student.studentnumber);
        });
      });

      student.classrooms_master.forEach((classroom)=>{
        classroom.ongoingElections.forEach((election)=>{
          election.voteStatus = election.voteStatus.filter(voterObject => voterObject.studentnumber == student.studentnumber);
          election.electionAccess = election.electionAccess.filter(accessObject => accessObject.studentnumber == student.studentnumber);
        });
      });

      return res.json({success:true,student:student});

    } else {
      return res.json({success:false});
    }
  });

});

router.get('/logout', authenticated, (req, res) => {

  req.logout();
  return res.status(200).send();

});

router.post("/register", [check('email').isEmail().withMessage("Invalid email.").matches(/^[\w.]{4,12}@/).withMessage('Email address must be alphanumeric and between 4-12 characters in length.'),
check('status').isIn(['yes','no']).withMessage('Please submit a valid status.'),
check('username').isLength({min:4,max:12}).withMessage("Username must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Username must be alphanumeric."),
check("firstname").isLength({min:2,max:16}).withMessage("First name must be between 2-16 characters.").matches(/^[a-zA-Z]+$/).withMessage("First name must only contain letters."),
check("lastname").isLength({min:2,max:16}).withMessage("Last name must be between 2-16 characters.").matches(/^[a-zA-Z]+$/).withMessage("Last name must only contain letters."),
check("school").isIn(['University of Manitoba']).withMessage("School not found."),
check('password').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric."),
check('confirmPassword').custom((cpwd,{req}) => cpwd === req.body.password).withMessage("Passwords do not match.")],
(req,res) => {

  // errors with submitted form from user
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // increasing school support would require adding to this object
  const schoolExtensions = {'University of Manitoba': ['@myumanitoba.ca','@umanitoba.ca','@cc.umanitoba.ca']};

  if (typeof schoolExtensions[req.body.school] == "object") {
    validEmail = schoolExtensions[req.body.school].some((extension)=>{
      const re = new RegExp(`${extension}$`);
      return re.test(req.body.email);
    });
  } else {
    const re = new RegExp(`${schoolExtensions[req.body.school]}$`);
    validEmail = re.test(req.body.email);
  }

  if (!validEmail) {
    return res.status(422).json({errors:[{msg:`Invalid email extension for the ${req.body.school}`}]});
  }

  if (req.body.studentnumber) {
    if (req.body.status == 'no') {
      return res.status(422).json({errors:[{msg:`No student number required.`}]});
    } else {
      // this range for student numbers is pretty subjective and based entirely off of U of M's range
      const re = new RegExp('^[\\d]{5,10}$');
      if (!re.test(req.body.studentnumber)) {
        return res.status(422).json({errors:[{msg:`Student number must be between 5-10 digits.`}]});
      }
    }
  } else {
    if (req.body.status == 'yes') {
      return res.status(422).json({errors:[{msg:`Missing student number.`}]});
    }
  }

  // Username search
  Student.find({ username: req.body.username }, (error,student) => {
    if (error) throw error

    if (student.length == 0) {

      if (req.body.status == 'yes') {

        Student.find({ email: req.body.email }, (error,student)=>{

          if (error) throw error

          if (student.length == 0) {

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.password, salt, (err, hash) => {

                if (err) throw err

                const newStudent = new Student({
                  username: req.body.username.toLowerCase(),
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  email: req.body.email.toLowerCase(),
                  password: hash,
                  studentnumber: req.body.studentnumber,
                  school: req.body.school,
                  active: true, // change to false
                  status: true,
                  registered: new Date(),
                  delete: new Date()
                });

                newStudent.save((error,student)=>{
                  if (error) throw error

                  if (student) {

                    Classroom.find({students: {$elemMatch: {email:req.body.email}}}).exec((err,rooms)=>{
                      if (err) throw err

                      if (rooms.length > 0) {
                        rooms.forEach((room)=>{
                          room.students.forEach((s)=>{
                            if (s.studentnumber == req.body.studentnumber) {
                              s.disabled = false;
                            }
                          });
                          room.save((err,student)=>{
                            if (err) throw err
                          });
                        });
                      }

                      return res.json({msg:`Thank you for signing up, ${req.body.firstname}. Please login.`});
                    });

                  } else {
                    return res.status(422).json({errors:[{msg:"Try submiting your details again."}]});
                  }
                });


              });
            });

          } else {
            return res.status(422).json({errors:[{msg:"This email is already in use."}]});
          }
        });

      } else {
        // Not actually students but in the same collection.
        Student.find({ email:req.body.email }, (error,student)=>{
          if (error) throw error

          if (student.length == 0) {
            bcrypt.genSalt(10, (err,salt) => {
              bcrypt.hash(req.body.password, salt, (err, hash) => {

                if (error) throw error

                const newMaster = new Student({
                  username: req.body.username.toLowerCase(),
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  email: req.body.email.toLowerCase(),
                  password: hash,
                  school: req.body.school,
                  status: false,
                  active:true,
                  registered: new Date(),
                  delete: new Date()
                });

                newMaster.save((error,master)=>{
                  if (error) throw error

                  if (master) {

                    Classroom.find({students: {$elemMatch: {email:req.body.email}}}).exec((err,rooms)=>{
                      if (err) throw err
                      if (rooms.length > 0) {
                        rooms.forEach((room)=>{
                          room.students.forEach((s)=>{
                            if (s.studentnumber == req.body.studentnumber) {
                              s.disabled = false;
                            }
                          });
                          room.save((err,student)=>{
                            if (err) throw err
                          });
                        });
                      }

                      return res.json({msg:`Thank you for signing up, ${req.body.firstname}. Please login.`});
                    });

                  } else {
                    return res.status(422).json({errors:[{msg:"Try submiting your details again."}]});
                  }
                });

              });
            });
          } else {
            return res.status(422).json({errors:[{msg:"This email is already in use."}]});
          }
        });
      }

    } else {
      return res.status(422).json({errors:[{msg:"This username already exists. Try another one."}]});
    }
  });


});

router.post("/change-pwd",authenticated,[check('old').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric."),
check('new').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric."),
check('confirm').custom((value,{req}) => value === req.body.new).withMessage('Passwords do not match.')],(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  bcrypt.compare(req.body.old,req.user.password,(err,resp)=>{
    if (err) throw err
    if (resp) {
      Student.findById(req.user.id).exec((err,user)=>{
        if (err) throw err
        bcrypt.genSalt(10,(err,salt)=>{
          if (err) throw err
          bcrypt.hash(req.body.new, salt, (err,hash)=>{
            if (err) throw err
            user.password = hash;
            user.save();
            return res.json({});
          });
        })

      });
    } else {
      return res.status(422).json({errors:[{msg:'Incorrect password.'}]});
    }

  })

});

router.post("/delete-account",authenticated,(req,res)=>{

  bcrypt.compare(req.body.password, req.user.password, (err,resp)=>{
    if (err) throw err
    if (resp) {
      deleteUSER = async () => {

        let u = await Student.findById(req.user.id).exec();
        let user_student_rooms = await Classroom.find({id:{$in:u.classrooms_student}}).exec();
        for(let i=0;i<user_student_rooms.length;i++) {
          user_student_rooms[i].joined = user_student_rooms[i].joined - 1;
          await user_student_rooms[i].save()
        }

        let students = await Student.find({classrooms_student:{$in:u.classrooms_master}}).exec();
        for (let i=0;i<students.length;i++) {
          students[i].classrooms_student = students[i].classrooms_student.filter((room)=>{
            return u.classrooms_master.indexOf(room) == -1;
          });
          await students[i].save();
        }

        let master_rooms = await Classroom.find({_id:u.classrooms_master}).exec();

        master_rooms.forEach(async function(room) {
          if (room.ongoingElections > 0) {
            await Election.deleteMany({_id:room.ongoingElections},(err,docs)=>{});
          }
          if (room.archived) {
            await Election.deleteMany({_id:room.archived},(err,docs)=>{});
          }
        });

        let user_master_rooms = await Classroom.deleteMany({_id:u.classrooms_master},(err,docs)=>{});

        u.remove((err,deletedUser)=>{
          return res.json({});
        })

      }

      deleteUSER();
    } else {
      return res.status(422).json({errors:[{msg:'Incorrect password.'}]});
    }

  })

});

module.exports = router;
