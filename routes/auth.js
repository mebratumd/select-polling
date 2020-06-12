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
const request = require('request');

const authenticated = (req,res,next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send();
  }

}

router.post('/login',[check('username').isLength({min:4,max:12}).withMessage("Username must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Username must be alphanumeric.").customSanitizer((val) => {
  if (val) {
    return val.toLowerCase();
  }
}),
check('password').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric."),
check('token').isLength({max:600}).withMessage('Something wrong').matches(/^[\w-]+$/).withMessage("Something wrong.")],(req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  request.post('https://www.google.com/recaptcha/api/siteverify',{form:{secret:'6Ld-1PsUAAAAALONqcsUeJCQIybmEDUi5XkaeYFK',response:req.body.token}},(err,response,body)=>{
    if (JSON.parse(body).score <= 0.3) {
      return res.status(422).json({errors:[{msg:'Something wrong.'}]});
    } else {
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

    }

  });


});

router.post("/register", [check('email').isEmail().withMessage("Invalid email.").normalizeEmail(),
check('status').isIn(['yes','no']).withMessage('Please submit a valid status.'),
check('username').isLength({min:4,max:12}).withMessage("Username must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Username must be alphanumeric.").customSanitizer((val) => {
  if (val) {
    return val.toLowerCase();
  }
),
check("firstname").isLength({min:2,max:16}).withMessage("First name must be between 2-16 characters.").matches(/^[a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("First name must only contain letters.").customSanitizer((val) => {
  if (val) {
    return val.toLowerCase();
  }
}),
check("lastname").isLength({min:2,max:16}).withMessage("Last name must be between 2-16 characters.").matches(/^[a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Last name must only contain letters.").customSanitizer((val) => {
  if (val) {
    return val.toLowerCase();
  }
}),
check("school").isIn(['University of Manitoba']).withMessage("School not found."),
check('password').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric."),
check('confirmPassword').custom((cpwd,{req}) => cpwd === req.body.password).withMessage("Passwords do not match."),
check('token').isLength({max:600}).withMessage('Something wrong').matches(/^[\w-]+$/).withMessage("Something wrong.")
],(req,res,next) => {

  // errors with submitted form from user
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let emailSend = async (email,activationLink,name) => {

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
          <p>Thank you for signing up with <a href="https://www.selectpolling.ca/">Select Polling</a>. To complete the activation of your account click the URL below or copy and paste it into your browser to complete activation.
          If for any reason you are having troubles activating your account please contact us at <b>contact@selectpolling.ca.</b></p><br>
          <span style="margin-top:10px;padding:10px;"><a href=${activationLink}>ACTIVATE</a></span>
          <br><br>
          <small style="display:block;margin-top:20px;">If you did not sign up with Select Polling, please disregard this message.</small>
        </div>` // html body
    });

    console.log(`Activation email sent to ${email}`);

  }

  let p = new Promise((resolve,reject)=>{
    request.post('https://www.google.com/recaptcha/api/siteverify',{form:{secret:'6Ld-1PsUAAAAALONqcsUeJCQIybmEDUi5XkaeYFK',response:req.body.token}},(err,response,body)=>{
        let json = JSON.parse(body);
        if (json.success) {
          if (json.score <= 0.3) {
            reject();
          } else {
            resolve();
          }
        } else {
          reject();
        }
    });
  });

  // school extensions added here
  const schoolExtensions = {'University of Manitoba': ['@myumanitoba.ca']};

  p.then(()=>{
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

    if (req.body.status == "yes") {
      if (req.body.electionKey) {
        const re = new RegExp('^[\\w]+$');

        if(!re.test(req.body.electionKey)) {
          return res.status(422).json({errors:[{msg:`Election key must be alphanumeric.`}]});
        }

        if (req.body.electionKey.length > 20 || req.body.electionKey < 6) {
          return res.status(422).json({errors:[{msg:`Election key must be between 6-20 characters.`}]});
        }

      } else {
        return res.status(422).json({errors:[{msg:`Missing election key.`}]});
      }

    }

    Student.find({ username: req.body.username }, (error,student) => {
      if (error) throw new Error(error)

      if (student.length == 0) {

        if (req.body.status == 'yes') {

          bcrypt.genSalt(10, (error,salt)=>{

            if (error) throw new Error(error)

            bcrypt.hash(req.body.electionKey,salt,(error,electionKeyHash)=>{

              if (error) throw new Error(error)

              Student.find({ email: req.body.email }, (error,student)=>{

                if (error) throw new Error(error)

                if (student.length == 0) {

                  bcrypt.genSalt(10, (err, salt_) => {

                    if (err) throw new Error(err)

                    bcrypt.hash(req.body.password, salt_, (err, passwordHash) => {

                      if (err) throw new Error(err)

                      let firstname = req.body.firstname.replace(/^./,req.body.firstname[0].toUpperCase());
                      let lastname = req.body.lastname.replace(/^./,req.body.lastname[0].toUpperCase());
                      const newStudent = new Student({
                        username: req.body.username,
                        firstname: firstname,
                        lastname: lastname,
                        email: req.body.email,
                        password: passwordHash,
                        hash: uuidv4(),
                        school: req.body.school,
                        active: false,
                        status: true,
                        registered: new Date(),
                        delete: new Date(),
                        key:electionKeyHash
                      });

                      newStudent.save((error,student)=>{
                        if (error) throw new Error(error)

                        if (student) {

                          emailSend(student.email,`https://www.selectpolling.ca/a/${student.username}/${student.hash}`,student.firstname).then(()=>{
                            return res.json({msg:`Thank you for signing up, ${student.firstname}. Please check your email to complete activation.`});
                          }).catch((err) => {
                            next(err)
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

          Student.find({ email:req.body.email }, (error,student)=>{
            if (error) throw new Error(error)

            if (student.length == 0) {

              bcrypt.genSalt(10, (err,salt) => {
                if (err) throw new Error(error)

                bcrypt.hash(req.body.password, salt, (err, hash) => {

                  if (err) throw new Error(err)

                  let firstname = req.body.firstname.replace(/^./,req.body.firstname[0].toUpperCase());
                  let lastname = req.body.lastname.replace(/^./,req.body.lastname[0].toUpperCase());
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
                    if (error) throw new Error(error)

                    if (master) {

                      emailSend(master.email,`https://www.selectpolling.ca/a/${master.username}/${master.hash}`,master.firstname).then(()=>{
                        return res.json({msg:`Thank you for signing up, ${master.firstname}. Please check your email to complete activation.`});
                      }).catch((err) => {
                        next(err)
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

  }).catch((e)=>{
    next(e)
  });

});


router.get("/a/:username/:hash",(req,res,next)=>{

  Student.findOne({username:req.params.username}).exec((err,user)=>{
    if (err) next(err)
    if (user) {
      if (user.active) {
        return res.send(`<p>Your account has already been activated, ${user.firstname}. <a href="https://www.selectpolling.ca/login">Login</a></p>`)
      }

      if (user.hash == req.params.hash) {
        user.active = true;
        user.delete = undefined;
        user.hash = undefined;
        user.save().then(()=>{
          return res.send(`<p>Thank you for activating your account, ${user.firstname}. <a href="https://www.selectpolling.ca/login">Login</a></p>`)
        }).catch((err) => res.send(`<p>There was an error. Please refresh the page.</p>`));
      } else {
        return res.status(401).json({errors:[{msg:'Forbidden.'}]});
      }

    } else {
      return res.status(404).json({errors:[{msg:'This user does not exist.'}]});
    }
  });


});


router.get("/loggedin",authenticated,(req,res,next)=>{

  Student.findById(req.user.id).populate({
    path: 'classrooms_master classrooms_student',
    select: 'name students elections joined partake',
    populate: {
      path: 'elections',
      model: 'Election',
      select: 'type date duration title status electionAccess',
      options: {sort:{'date':'desc'}}
    }
  }).select('-password -__v -active -key -hash -forgotPassword -forgotPasswordTimer').lean().exec((err,student)=>{

    if (err) next(err)

    if (student) {

      student.classrooms_student.forEach((classroom)=>{
        classroom.elections.forEach((election)=>{
          if (election.electionAccess) {
            election.electionAccess = election.electionAccess.filter(accessObject => accessObject.email == student.email);
          }
        });
      });

      student.classrooms_master.forEach((classroom)=>{
        classroom.elections.forEach((election)=>{
          if (election.electionAccess) {
            election.electionAccess = election.electionAccess.filter(accessObject => accessObject.email == student.email);
          }
        });
      });

      return res.json({success:true,student:student});

    } else {
      return res.json({success:false});
    }
  });

});

router.get('/logout', authenticated,(req, res)=>{

  req.logout();
  return res.status(200).send();

});

router.post("/change-pwd",authenticated,[check('old').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric."),
check('new').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric."),
check('confirm').custom((value,{req}) => value === req.body.new).withMessage('Passwords do not match.'),
check('token').isLength({max:600}).withMessage('Something wrong').matches(/^[\w-]+$/).withMessage("Something wrong.")],(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let p = new Promise((resolve,reject)=>{

    request.post('https://www.google.com/recaptcha/api/siteverify',{form:{secret:'6Ld-1PsUAAAAALONqcsUeJCQIybmEDUi5XkaeYFK',response:req.body.token}},(err,response,body)=>{
        let json = JSON.parse(body);
        if (json.success) {
          if (json.score <= 0.3) {
            reject();
          } else {
            resolve();
          }
        } else {
          reject();
        }
    });

  });

  p.then(()=>{

    bcrypt.compare(req.body.old,req.user.password,(err,resp)=>{
      if (err) throw new Error(err);
      if (resp) {
        Student.findById(req.user.id).exec((err,user)=>{
          if (err) throw new Error(err)
          bcrypt.genSalt(10,(err,salt)=>{
            if (err) throw new Error(err)
            bcrypt.hash(req.body.new, salt, (err,hash)=>{
              if (err) throw new Error(err)
              user.password = hash;
              user.save().then(() => res.json({}) ).catch((err) => next(err));
            });
          })

        });
      } else {
        return res.status(401).json({errors:[{msg:'Incorrect password.'}]});
      }

    });

  }).catch(err => next(err))




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
        let master_rooms = await Classroom.find({_id:{$in:u.classrooms_master}}).exec();
        for(let i=0;i<master_rooms.length;i++) {
          if (master_rooms[i].elections.length > 0) {
            await Election.deleteMany({_id:{$in:master_rooms[i].elections}},(err,docs)=>{});
          }

        }

        // deletes all master classrooms
        let user_master_rooms = await Classroom.deleteMany({_id:{$in:u.classrooms_master}},(err,docs)=>{});

        // deletes user
        await u.remove();

        return res.json({});

      }

      deleteUSER().catch(err => next(err));

    } else {
      return res.status(401).json({errors:[{msg:'Incorrect password.'}]});
    }

  })

});

router.post("/forgot-password",[check('email').isEmail().withMessage("Invalid email.").matches(/^[\w.]{4,12}@/).withMessage('Email address must be alphanumeric and between 4-12 characters in length.').normalizeEmail()],(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let resetEmail = async (email,resetLink,name) => {

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
        subject: "Password Reset ✔", // Subject line
        text: `Hi, ${name}. Please click the URL or copy and paste it into your browser to activate your account: ${resetLink}`, // plain text body
        html: `
        <div>
          <h1 style="text-align:center;">Select Polling</h1>
          <h2>Hi, ${name}</h2>
          <p>To complete the password reset of your account click the URL below or copy and paste it into your browser.
          If for any reason you are having troubles please contact us at <b>contact@selectpolling.ca</b>.</p><br>
          <span style="margin-top:10px;padding:10px;"><a href=${resetLink}>${resetLink}</a></span>
          <br><br>
          <small style="display:block;margin-top:20px;">If you did not ask for a password reset, please disregard this message.</small>
        </div>` // html body
    });
  }


  request.post('https://www.google.com/recaptcha/api/siteverify',{form:{secret:'6Ld-1PsUAAAAALONqcsUeJCQIybmEDUi5XkaeYFK',response:req.body.token}},(err,response,body)=>{

    if (JSON.parse(body).score > 0.3) {
      Student.findOne({email:req.body.email}).exec((err,student)=>{
        if (err) next(err)
        if (student){

          if (student.active) {

            const time = new Date().getTime();

            if (student.forgotPassword) {

              if (time - student.forgotPasswordTimer > 600000) {
                student.forgotPassword = uuidv4();
                student.forgotPasswordTimer = new Date().getTime();
                student.save().then((student_) => {

                  resetEmail(req.body.email,`https://www.selectpolling.ca/change-pwd/${student_.username}/${student_.forgotPassword}`,student_.firstname).then(()=>{
                    return res.json({});
                  }).catch((err)=>next(err));


                }).catch((err)=>next(err))
              } else {
                // 10 minutes has not passed
                return res.status(401).json({ errors: [{msg:'Please wait 10 minutes before requesting another email to reset your password.'}]});
              }

            } else {
              student.forgotPassword = uuidv4();
              student.forgotPasswordTimer = new Date().getTime();
              student.save().then((student_) => {

                resetEmail(req.body.email,`https://www.selectpolling.ca/change-pwd/${student_.username}/${student_.forgotPassword}`,student_.firstname).then(()=>{
                  return res.json({});
                }).catch((err)=>next(err));


              }).catch((err)=>next(err))
            }

          } else {

            return res.status(422).json({errors:[{msg:'You must activate your account first before reseting your password.'}]});


          }






        } else {
          return res.status(404).json({ errors: [{msg:'This email is not registered with a user.'}]});
        }
      })
    } else {
      return res.status(500).json({errors:[{msg:"Something wrong."}]});
    }

  });





});

router.get("/fpwd/:username/:hash",(req,res,next)=>{

  // This is to access the view on the front end

  Student.findOne({username:req.params.username}).exec((err,student)=>{
    if (err) next(err)
    if (student) {

      if (student.forgotPassword !== req.params.hash) {
        return res.status(401).send("Unauthorized.");
      } else {
        return res.json({username:student.username,forgotPassword:student.forgotPassword});
      }

    } else {
      return res.status(404).send("No such user.");
    }


  });


});

router.post("/fpwd/change",[check('password').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric."),
check('cpassword').custom((cpwd,{req}) => cpwd === req.body.password).withMessage("Passwords do not match.")],(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  if (req.body.username) {

    if (req.body.forgotPassword) {

      Student.findOne({username:req.body.username}).exec((err,student)=>{
        if (err) next(err)

        if (student) {

          if (student.forgotPassword != req.body.forgotPassword) {
            // error keys do not match
            return res.status(401).json({errors:[{msg:"You do not have permission to perform this action."}]});
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              if (err) next(err)
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) next(err)
                student.password = hash;
                student.forgotPassword = "";
                student.forgotPasswordTimer = 0;
                student.save().then(() => {
                  return res.json({});
                }).catch(err => next(err));
              });
            });
          }

        } else {
          // error student does not exist
          return res.status(404).json({errors:[{msg:"No such user."}]});
        }

      })

    } else {
      // error no key provided
      return res.status(422).json({errors:[{msg:"Key not provided."}]});
    }

  } else {
    // error no username provided
    return res.status(422).json({errors:[{msg:"Missing username."}]});
  }

});


module.exports = router;
