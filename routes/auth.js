const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Student = require('../models/student.js');
const Classroom = require('../models/classroom.js');
const Election = require('../models/election.js');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const uuidv4 = require('uuid/v4');

const authenticated = (req,res,next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send();
  }

}

router.post('/login',[check('username').isLength({min:4,max:12}).withMessage("Username must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Username must be alphanumeric.").customSanitizer(val => val.toLowerCase()),
check('password').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric.")],(req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      if (info.active) {
        return res.status(401).json({errors:[info]}); // incorrect password or user doesn't exist
      } else {
        return res.status(423).send(info.message); // activate your account
      }
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.json({});
    });
  })(req, res, next);
});

router.post("/register", [check('email').isEmail().withMessage("Invalid email.").matches(/^[\w.]{4,12}@/).withMessage('Email address must be alphanumeric and between 4-12 characters in length.').normalizeEmail(),
check('status').isIn(['yes','no']).withMessage('Please submit a valid status.'),
check('username').isLength({min:4,max:12}).withMessage("Username must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Username must be alphanumeric.").customSanitizer(val => val.toLowerCase()),
check("firstname").isLength({min:2,max:16}).withMessage("First name must be between 2-16 characters.").matches(/^[a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("First name must only contain letters.").customSanitizer(val => val.toLowerCase()),
check("lastname").isLength({min:2,max:16}).withMessage("Last name must be between 2-16 characters.").matches(/^[a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Last name must only contain letters.").customSanitizer(val => val.toLowerCase()),
check("school").isIn(['University of Manitoba']).withMessage("School not found."),
check('password').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric."),
check('confirmPassword').custom((cpwd,{req}) => cpwd === req.body.password).withMessage("Passwords do not match."),
check('electionKey').optional().isLength({min:6,max:20}).withMessage('Election key must be between 6-20 characters.').isAlpha().withMessage('Election key must be alphanumeric.')],
(req,res,next) => {

  // errors with submitted form from user
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // school extensions added here
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

  let emailSend = async (email,activationLink,name) => {
    //let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
      }
    });

    let info = await transporter.sendMail({
        from: '"Select Polling 📈" <noreply@selectpolling.ca>', // sender address
        to: `${email}`, // list of receivers
        subject: "Activation ✔", // Subject line
        text: `Thank you for signing up with Select Polling, ${name}. Please click the URL or copy and paste it into your browser to activate your account: ${activationLink}`, // plain text body
        html: `
        <div>
          <h1 style="text-align:center;">Select Polling</h1>
          <h2>Hi, ${name}</h2>
          <p>Thank you for signing up with <a href="https://select-poll.herokuapp.com/">Select Polling</a>. To complete the activation of your account click the URL below or copy and paste it into your browser to complete activation.
          If for any reason you are having troubles activating your account please <a href="https://select-poll.herokuapp.com/contact">Contact Us</a>.</p><br>
          <span style="margin-top:10px;padding:10px;"><a href=${activationLink}>${activationLink}</a></span>
          <br><br>
          <small style="display:block;margin-top:20px;">If you did not sign up, please disregard this message.</small>
        </div>` // html body
    });

    console.log(`Activation email sent to ${email}`);

  }

  // Username search
  Student.find({ username: req.body.username }, (error,student) => {
    if (error) next(error)

    if (student.length == 0) {

      if (req.body.status == 'yes') {

        if (req.body.electionKey) {
          bcrypt.genSalt(10, (error,salt)=>{
            if (error) next(error)
            bcrypt.hash(req.body.electionKey,salt,(error,electionKeyHash)=>{
              if (error) next(error)
              Student.find({ email: req.body.email }, (error,student)=>{

                if (error) next(error)

                if (student.length == 0) {

                  bcrypt.genSalt(10, (err, salt) => {
                    if (err) next(err)
                    bcrypt.hash(req.body.password, salt, (err, passwordHash) => {
                      if (err) next(err)

                      let firstFirstLetter = req.body.firstname[0].toUpperCase();
                      let firstRestLetter = req.body.firstname.slice(1);
                      let firstname = `${firstFirstLetter}${firstRestLetter}`;

                      let lastFirstLetter = req.body.lastname[0].toUpperCase();
                      let lastRestLetter = req.body.lastname.slice(1);
                      let lastname = `${lastFirstLetter}${lastRestLetter}`;

                      const newStudent = new Student({
                        username: req.body.username,
                        firstname: firstname,
                        lastname: lastname,
                        email: req.body.email,
                        password: passwordHash,
                        hash: uuidv4(),
                        studentnumber: req.body.studentnumber,
                        school: req.body.school,
                        active: false, // change to false
                        status: true,
                        registered: new Date(),
                        delete: new Date(),
                        key:electionKeyHash
                      });

                      newStudent.save((error,student)=>{
                        if (error) next(error)

                        if (student) {
                          emailSend(req.body.email,`https://select-poll.herokuapp.com/a/${student.username}/${student.hash}`,student.firstname).then(()=>{
                            return res.json({msg:`Thank you for signing up, ${student.firstname}. Please login.`});
                          }).catch((err) => {
                            return next(err)
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

            });
          })
        } else {
          return res.status(422).json({errors:[{msg:"Missing election key."}]});
        }




      } else {
        // Not actually students but in the same collection.
        Student.find({ email:req.body.email }, (error,student)=>{
          if (error) next(error)

          if (student.length == 0) {

            bcrypt.genSalt(10, (err,salt) => {
              if (err) next(err)
              bcrypt.hash(req.body.password, salt, (err, hash) => {

                if (err) next(err)

                let firstFirstLetter = req.body.firstname[0].toUpperCase();
                let firstRestLetter = req.body.firstname.slice(1);
                let firstname = `${firstFirstLetter}${firstRestLetter}`;

                let lastFirstLetter = req.body.lastname[0].toUpperCase();
                let lastRestLetter = req.body.lastname.slice(1);
                let lastname = `${lastFirstLetter}${lastRestLetter}`;

                const newMaster = new Student({
                  username: req.body.username,
                  firstname: firstname,
                  lastname: lastname,
                  email: req.body.email,
                  password: hash,
                  school: req.body.school,
                  status: false,
                  hash:uuidv4(),
                  active:false,
                  registered: new Date(),
                  delete: new Date()
                });

                newMaster.save((error,master)=>{
                  if (error) next(error)

                  if (master) {

                    emailSend(req.body.email,`https://select-poll.herokuapp.com/a/${master.username}/${master.hash}`,master.firstname).then(()=>{
                      return res.json({msg:`Thank you for signing up, ${master.firstname}. Please login.`});
                    }).catch(err => next(err));


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


router.get("/a/:username/:hash",(req,res,next)=>{

  Student.find({username:req.params.username.toLowerCase()}).exec((err,user)=>{
    if (err) next(err)
    if (user.length > 0) {
      if (user.hash == req.params.hash) {
        user.active = true;
        user.save().then(()=>{
          return res.send(`<p>Thank you for activating your account, ${user.firstname}. <a href="https://select-poll.herokuapp.com/login">Login</a></p>`)
        }).catch((err) => res.send(`<p>There was an error. Please re-submit the link.</p>`));
      }
    } else {
      return res.status(422).json({errors:[{msg:'This user does not exist.'}]});
    }
  });


});


router.get("/loggedin",authenticated,(req,res,next)=>{

  Student.findById(req.user.id).populate({
    path: 'classrooms_master classrooms_student',
    select: '-password -__v',
    populate: {
      path: 'ongoingElections archived',
      select: '-tokens -__v',
      options:{sort:{'date':-1}}
    }
  }).select('-password -_id -__v -active -hash -delete').lean().exec((err,student)=>{

    if (err) next(err)

    if (student) {

      student.classrooms_student.forEach((classroom)=>{
        classroom.students.forEach((s)=>{
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

router.post("/change-pwd",authenticated,[check('old').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric."),
check('new').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric."),
check('confirm').custom((value,{req}) => value === req.body.new).withMessage('Passwords do not match.')],(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  bcrypt.compare(req.body.old,req.user.password,(err,resp)=>{
    if (err) next(err)
    if (resp) {
      Student.findById(req.user.id).exec((err,user)=>{
        if (err) next(err)
        bcrypt.genSalt(10,(err,salt)=>{
          if (err) next(err)
          bcrypt.hash(req.body.new, salt, (err,hash)=>{
            if (err) next(err)
            user.password = hash;
            user.save().then(() => res.json({}) ).catch((err) => next(err));
          });
        })

      });
    } else {
      return res.status(422).json({errors:[{msg:'Incorrect password.'}]});
    }

  });


});

router.post("/delete-account",authenticated,[check('password').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric.")],(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  bcrypt.compare(req.body.password, req.user.password, (err,resp)=>{
    if (err) next(err)
    if (resp) {

      deleteUSER = async () => {
        // removes user from classrooms they are student of
        let u = await Student.findById(req.user.id).exec();
        let user_student_rooms = await Classroom.find({id:{$in:u.classrooms_student}}).exec();
        for(let i=0;i<user_student_rooms.length;i++) {
          user_student_rooms[i].joined = user_student_rooms[i].joined - 1;
          await user_student_rooms[i].save()
        }

        // removes students from classroom that user is master of
        let students = await Student.find({classrooms_student:{$in:u.classrooms_master}}).exec();
        for (let i=0;i<students.length;i++) {
          students[i].classrooms_student = students[i].classrooms_student.filter((room)=>{
            return u.classrooms_master.indexOf(room) == -1;
          });
          await students[i].save();
        }

        // deletes all elections associated with master classrooms
        let master_rooms = await Classroom.find({_id:u.classrooms_master}).exec();
        for(let i=0;i<master_rooms.length;i++) {
          if (master_rooms[i].ongoingElections > 0) {
            await Election.deleteMany({_id:master_rooms[i].ongoingElections},(err,docs)=>{});
          }
          if (master_rooms[i].archived > 0) {
            await Election.deleteMany({_id:master_rooms[i].archived},(err,docs)=>{});
          }
        }

        // deletes all master classrooms
        let user_master_rooms = await Classroom.deleteMany({_id:u.classrooms_master},(err,docs)=>{});

        // deletes user
        await u.remove();

        return res.json({});

      }

      deleteUSER().catch(err => next(err));

    } else {
      return res.status(422).json({errors:[{msg:'Incorrect password.'}]});
    }

  })

});

module.exports = router;
