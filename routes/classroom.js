const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const upload = multer({
  dest: './uploads',
  fileFilter: (req,file,cb)=>{
    if (path.extname(file.originalname) != ".csv") {
      req.incorrectType = true;
      return cb(null,false);
    }

    cb(null,true);
  },
  limits:{
    files:1,
    fileSize:500000
  }
});
const csv = require('fast-csv');
const fs = require('fs');
const Classroom = require('../models/classroom.js');
const Student = require('../models/student.js')
const Election = require('../models/election.js');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const _ = require('underscore');
const mongoose = require("mongoose");
const request = require('request');

const authenticated = (req,res,next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send();
  }

}

const errorFile = (err,req,res,next) => {
  if (err.code == 'LIMIT_FILE_SIZE') {
    return res.status(501).json({errors:[{msg:"File exceeds 100 MB."}]});
  } else if (err.code == 'LIMIT_FILE_COUNT') {
    return res.status(501).json({errors:[{msg:"Multiple files submitted. Only submit 1 CSV file with a class list."}]});
  } else {
    next()
  }
}



// dashboard endpoints

router.post("/search",authenticated,[check('name').isLength({min:3,max:12}).withMessage('Searches must be between 3-12 characters.').matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Class name must only contain letters (french or english) and/or numbers."),
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

  })

  p.then(()=>{

    Classroom.find({ name: {$regex: req.body.name, $options: 'i' } }).select('name school').limit(100).exec((err,rooms)=>{

      if (err) throw new Error(err)

      return res.json({classes:rooms});

    });

  }).catch((err) => {
    next(err)
  });

});


router.post("/password",authenticated,[check('password').isLength({min:6,max:12}).withMessage("Password must be between 6-12 characters.").matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Password must contain letters (french or english) and/or numbers."),
check('name').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Class name must contain letters (french or english) and/or numbers.").customSanitizer(val=>{
  if (val){
    return val.toLowerCase();
  }
})],(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let currentTime = new Date().getTime();

  if (req.session[req.user.username] == undefined || req.session[req.user.username] > 0 || req.session[`${req.user.username}_timeOut`] < currentTime) {

    if (req.session[`${req.user.username}_timeOut`]) {
      delete req.session[req.user.username];
      delete req.session[`${req.user.username}_timeOut`];
    }

    Classroom.findOne({name:req.body.name}).populate("elections").exec((err,room)=>{
      if (err) next(err)
      if (room) {
        bcrypt.compare(req.body.password,room.password,(err,resp)=>{

          if (err) next(err)

          if (resp){
            const student = room.students.filter((student)=>{
              return student.email === req.user.email;
            });

            if (student.length > 0) {
              if (room.elections.length > 0) {

                const tkn = uuidv4();
                room.elections.filter(el => el.status == true).forEach(async function(e) {
                  ongoingElec = await Election.findById(e._id).exec();
                  didVote = ongoingElec.voteStatus.filter(voteOb => voteOb.email == student[0].email);
                  if (didVote.length == 0) {
                    ongoingElec.tokens.push({email:student[0].email,hash:tkn});
                    ongoingElec.electionAccess.push({email:student[0].email,permission:false});
                    ongoingElec.voteStatus.push({email:student[0].email,didVote:false});
                    await ongoingElec.save()
                  }
                })
              }
              // success
              Student.findById(req.user.id).exec((e,s)=>{
                if (e) next(e)
                if (s) {

                  if (s.classrooms_student.length < 5) {

                    s.classrooms_student.push(room.id);
                    room.joined = room.joined + 1;
                    room.save().catch(err => next(err));
                    s.save().then(() => {
                      return res.json({})
                    }).catch((err) => next(err));

                  } else {
                    return res.status(422).json({errors:[{msg:`You have reached the limit for the amount of classrooms you can be a student in (max 5).`}]});
                  }

                } else {
                  return res.status(422).json({errors:[{msg:`Something went wrong. Please submit details again.`}]});
                }
              });

            } else {
              // not apart of classroom
              return res.status(422).json({errors:[{msg:`You are not in the class list for ${room.name}.`}]});
            }

          } else {
            // incorrect password
            if (req.session[req.user.username]) {
              req.session[req.user.username]--;
              if (req.session[req.user.username] == 0) {
                req.session[`${req.user.username}_timeOut`] = new Date().getTime() + 120000; // 2 min lock out
              }
            } else {
              req.session[req.user.username] = 9;
            }

            return res.status(422).json({errors:[{msg:`Incorrect password for ${room.name}.`}]});
          }
        })
      } else {
        // doesn't exist
        return res.status(422).send("Classroom doesn't exist.");

      }

    });



  } else {
    return res.status(422).json({errors:[{msg:'Account locked. Please wait 2 mintutes.'}]});
  }



});

// creating classroom endpoints

router.post("/edit",authenticated,upload.single('classfile'),errorFile,(req,res)=>{


  if (req.incorrectType) {
    return res.status(422).json({errors:[{msg:"File must be in CSV format."}]});
  }

  const headers = ["name","email"];
  const students = [];

  if (path.extname(req.file.originalname) == ".csv") {
    const stream = fs.createReadStream(`./uploads/${req.file.filename}`);
    stream.pipe(csv.parse({ headers: true }).on('data', (row)=>{
      const inputHeaders = Object.keys(row);
      inputHeaders.forEach((header) => {
        if (headers.indexOf(header.toLowerCase()) == -1) {
          stream.emit('error', new Error('Headers are either incorrect or not formatted correctly.'));
        }
      });
      sortedObject = {};
      Object.keys(row).sort().forEach((key)=>{
        let content = row[key].trim().replace(/\s\s+/g, ' ');
        if (content.length > 40) {
          stream.emit('error', new Error(`${key.replace(/^./,key[0].toUpperCase())} field too large.`));
        }
        sortedObject[key.toLowerCase()] = content;
      })
      students.push(sortedObject);
    }).on('error',(error)=> {
      return res.status(422).json({errors:[{msg:error.message}]});
    }).on('end',(rowCount)=>{
      if (rowCount > 500) {
        res.status(422).json({errors:[{msg:"Too many students in uploaded file. Classrooms must contain 4-500 students."}]});
      } else if (rowCount < 4 ) {
        res.status(422).json({errors:[{msg:"Not enough students in uploaded file. Classrooms must contain 4-500 students."}]});
      } else {
        res.json({classlist:students});
      }

    }));
  } else {
    res.status(422).json({errors:[{msg:"File must be in CSV format."}]});
  }

  fs.unlink(`./uploads/${req.file.filename}`, (err) => {
    if (err) console.log(err)
  });


});

router.post("/submit",authenticated,[check('classname').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Class name only contain letters (french or english) and/or numbers.").customSanitizer(val => {
  if (val) {
    return val.toLowerCase();
  }
}),
check('emails.*').isLength({min:6,max:100}).withMessage('E-mail\'s must be between 6-100 characters.').isEmail().withMessage("Invalid e-mail found.").normalizeEmail(),
check('students').custom((allStudents,{req}) => {
  const emails = allStudents.map(s => s.email);
  if (_.isEqual(req.body.emails,emails)) {
    return true;
  } else {
    return false;
  }
}).withMessage('Invalid submission.'),
check('partake').isIn([true,false]).withMessage("Partake status must be either 'yes' or 'no'"),
check('password').isLength({min:6,max:12}).withMessage("Password must be between 6-12 characters.").matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Password must only contain letters (french or english) and/or numbers."),
check('cpassword').custom((cpwd,{req}) => cpwd === req.body.password).withMessage("Passwords do not match.")], (req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // let schoolExtensions = {'University of Manitoba': ['myumanitoba.ca']};

  let finalClassList = [];

  const studentCheck = (student) => {
    const headers = Object.keys(student).map(val => val.trim().replace(/\s/g,'').toLowerCase());
    const studentVals = Object.values(student).map(val => val.trim().replace(/\s/g,' '));
    const sorted = {};
    const clean = {};

    if (headers.length == 2) {
      headers.forEach((header)=>{
          if (['name','email'].indexOf(header) == -1) {
            throw new Error("Incorrect CSV headers. Please ensure that the CSV file you uploaded has the following headers as the first row: name,email ");
          }
      });

      for(let i=0;i<headers.length;i++) {
        clean[headers[i]] = studentVals[i];
      }
       // here
       Object.keys(clean).sort().forEach((header)=>{
         sorted[header] = clean[header];
       });

    } else {
      throw new Error("Incorrectly formatted information. Check class list.");
    }

    if (Object.values(student).length == 2) {
      Object.values(sorted).forEach((field,i)=>{
        //email
        /*
        if (i == 0) {
          if (typeof schoolExtensions[req.body.school] == 'object') {
            pass = schoolExtensions[req.body.school].some((ex)=>{
              const re = new RegExp(`^[\\w.]{4,25}@${ex}$`);
              if (re.test(field)) {
                return true;
              } else {
                return false;
              }
            });

            if (!pass) {
              throw new Error(`Invalid email found: ${field}. Please ensure all emails are 4-25 characters in length before the @ symbol and are from the ${req.body.school}. Characters include letters (english), numbers, periods or underscores.`);
            }


          } else {

            const re = new RegExp(`^[\\w.]{4,25}@${schoolExtensions[req.body.school]}$`);
            if (!re.test(field)) {
              //error
              throw new Error(`Invalid email found: ${field}. Please ensure all emails are 4-25 characters in length before the @ symbol and are from the ${req.body.school}. Characters include letters (english), numbers, periods or underscores.`);
            }

        }
      }
        */
        // name
        if (i==1) {
          const re = new RegExp("^[a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\\-\\.' ]{5,33}$");
          if (!re.test(field)) {
            //error
            throw new Error(`Invalid student name(s) found: ${field}. Names must be between 5-33 characters and contain only letters (french or english), spaces, apostrophes, or hyphens.`);
          }
        }

      });

      finalClassList.push(sorted);
    } else {
      throw new Error('Incorrectly formatted information. Check class list.');
    }

    if (student.email.toLowerCase() == req.user.email) {
      throw new Error(`Inputted student with the same e-mail as you. Ensure each student has a unique e-mail address.
      If you are a student and are planning to partake in elections leave your information out of the student list; it will be added on our end.`);
    }

  }


// here

  Student.findById(req.user.id).exec((er,st)=>{
    if (er) next(er)
    if (st.classrooms_master.length < 5) {

      Classroom.find({ name:req.body.classname },(err,classroom) => {
        if (err) next(err)


        if (classroom.length == 0) {
          try {
            req.body.students.forEach(studentCheck);

            const studentemails = finalClassList.map((student)=>{ return student.email.toLowerCase() });
            const duplicateStudentEmail = studentemails.some((studentemail,idx)=>{
              return studentemails.indexOf(studentemail) != idx;
            });
            if (duplicateStudentEmail) {
              throw new Error('Duplicate student e-mail found. Each student should have a unique email address.');
            }

            const studentnames = finalClassList.map((student)=>{ return student.name.toLowerCase() });
            const duplicateStudentName = studentnames.some((studentname,idx)=>{
              return studentnames.indexOf(studentname) != idx;
            });
            if (duplicateStudentName) {
              throw new Error('Duplicate student names found. Each student should have a unique name.');
            }

            if (req.body.partake == "true") {
              if (req.user.status) {

                let self = finalClassList.filter((student,i)=>{
                  return student.email == req.user.email;
                });

                if (self.length == 0) {
                  finalClassList.push({email:req.user.email,name:`${req.user.firstname} ${req.user.lastname}`});
                } else {
                  throw new Error("Do not include your name in the class list. It will be added on our end.");
                }
              } else {
                throw new Error("Only students can partake in polls.");
              }

            }

            let currentClassCount = req.body.partake ? 1 : 0;

            if (finalClassList.length > 500) {
              throw new Error('Classrooms must be less than 500 students.');
            }

            if (finalClassList.length < 4) {
              throw new Error('Classrooms must be at least 4 students.');
            }

            bcrypt.genSalt(10, (err, salt) => {
              if (err) next(err)

              bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) next(err)
                  // Store hash in your password DB.
                  const addClassroom = new Classroom({
                    name: req.body.classname.toLowerCase(),
                    password: hash,
                    school: req.user.school,
                    partake: req.body.partake,
                    registered: new Date(),
                    master: req.user.id,
                    students: finalClassList,
                    joined: currentClassCount
                  });

                  addClassroom.save((err,classroom)=>{
                    if (err) next(err)
                    if (classroom) {
                      st.classrooms_master.push(classroom.id);
                      st.save().then(()=>{
                        return res.json({}); // success
                      }).catch(err => next(err));
                    } else {
                      throw new Error("Oops. Something went wrong. Try re-submitting.")
                    }

                  });

              });
            });

          } catch (e) {
            return res.status(422).json({ errors: [{msg:e.message}] });
          }
        } else {
          return res.status(422).json({ errors: [{msg:'Class name is already in use.'}] });
        }

      });





    } else {
      return res.status(422).json({errors:[{msg:"A maximum of 5 classes can be administrated per user."}]});
    }
  })


});

// classroom endopoints

router.post("/delete-student",authenticated,[check('classname').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Class name must only contain letters (french or english) and/or numbers.").customSanitizer(val => {
  if (val){
    return val.toLowerCase();
  }
}),
check('email').isEmail().withMessage('Invalid e-mail.').normalizeEmail()], (req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }


  Classroom.findOne({ name:req.body.classname }).populate('elections').exec((err,room)=>{
    if (err) next(err)

    try {
      if (room) {
        let ongoing = room.elections.filter(el => el.status == true);

        if (ongoing.length > 0) {
          throw new Error('Cannot delete students from class list while elections are underway.');
        } else {
          if (room.students.length > 4) {
            if (room.master == req.user.id) {

              if (req.user.email == req.body.email) {
                throw new Error('You cannot remove yourself from the classroom.');
              }


              // this should execute regardless of student status
              Student.findOne({email:req.body.email}).exec((err,student)=>{
                if (err) next(err)
                if (student) {

                  if (student.classrooms_student.indexOf(room.id) > -1) {
                    const dec = room.joined - 1;
                    room.joined = dec;
                    const newClassList = student.classrooms_student.filter(classroom => classroom != room.id);
                    student.classrooms_student = newClassList;
                    student.save().then(()=>{
                      const newClassList = room.students.filter(student => student.email != req.body.email);
                      room.students = newClassList;
                      room.save().then(()=>{
                        return res.json({removedStudent:req.body,joined:true});
                      }).catch((err)=>next(err));
                    }).catch((err)=>next(err));
                  } else {
                    const newClassList = room.students.filter(student => student.email != req.body.email);
                    room.students = newClassList;
                    room.save().then(()=>{
                      return res.json({removedStudent:req.body,joined:false});
                    }).catch((err)=>next(err));
                  }

                } else {

                  const newClassList = room.students.filter(student => student.email != req.body.email);
                  room.students = newClassList;
                  room.save().then(()=>{
                    return res.json({removedStudent:req.body,joined:false});
                  }).catch((err)=>next(err));

                }

              });



            } else {
              throw new Error("You cannot remove students from the classroom.");
            }
          } else {
            // classroom less than or equal to 4 students
            throw new Error("Classroom size needs to be more than 4 students.");
          }
        }



      } else {
        // class not found
        throw new Error('Classroom not found.')
      }
    } catch(e) {
      return res.status(422).json({ errors: [{msg:e.message}] });
    }

  });



});

router.post("/add-student",authenticated,[check('classname').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Class name must only contain letters (french or english) and/or numbers.").customSanitizer(val => {
  if (val){
    return val.toLowerCase();
  }
}),
check('name').isLength({min:5,max:33}).withMessage('Name must be between 5-33 characters.').matches(/^[a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\\-\\.' ]+$/).withMessage('Name must only contain letters (french or english), spaces, periods, apostrophes, or hyphens.').customSanitizer(val => {
  if (val) {
    return val.trim().replace(/\s/g,' ')
  }
}),
check('email').isLength({min:6,max:100}).withMessage('E-mail must be between 6-100 characters.').isEmail().withMessage('Invalid e-mail.').normalizeEmail()], (req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Classroom.findOne({ name:req.body.classname }).exec((err,room)=>{
    if (err) next(err)

    try {
      if (room) {
        if (room.students.length < 500) {
          if (room.master == req.user.id) {

            if (req.user.email == req.body.email) {
              throw new Error('You cannot add youself to the class list.');
            }


            //looking for duplicate email and student number
            room.students.forEach((student)=>{
              if (student.email == req.body.email) {
                throw new Error('Duplicate e-mail found.');
              }
              if (student.name.toLowerCase() == req.body.name.toLowerCase()) {
                throw new Error('This name already exists in the class list.');
              }
            });

            // Valid email
            /*
            const schoolExtensions = {'University of Manitoba': ['myumanitoba.ca']};
            const extForGivenSchool = schoolExtensions[room.school];

            if (typeof extForGivenSchool == 'object') {
              pass = extForGivenSchool.some((ex)=>{
                const re = new RegExp(`^[\\w.]{4,25}@${ex}$`);
                if (re.test(req.body.email)) {
                  return true;
                } else {
                  return false;
                }
              });

              if (!pass) {
                throw new Error(`Invalid email. Please ensure all emails are from the ${room.school}.`);
              }


            } else {

              const re = new RegExp(`^[\\w.]{4,25}@${extForGivenSchool}$`);
              if (!re.test(req.body.email)) {
                //error
                throw new Error(`Invalid email. Please ensure all emails are from the ${room.school}.`);
              }
            }
            */
            //
            room.students.push({email:req.body.email,name:req.body.name});
            room.save().then(()=>{
              return res.json({email:req.body.email,name:req.body.name});
            }).catch((err)=>next(err));

          } else {
            throw new Error('You do not have permission to modify the class list.');
          }
        } else {
          throw new Error('Classroom cannot exceed 500 students');
        }



      } else {
        throw new Error('Classroom does not exist.');
      }
    } catch(e) {
      return res.status(422).json({ errors: [{msg:e.message}] });
    }


  });





});

router.post("/status",authenticated,[check('name').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Class name must only contain letters (french or english) and/or numbers.").customSanitizer(val => {
  if (val) {
    return val.toLowerCase();
  }
})],(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Student.findById(req.user.id, (err,student) => {
    if (err) next(err)

    if (student) {

      Classroom.findOne({name:req.body.name},(err,room)=>{
        if (err) next(err)

        if (room) {
          if (req.user.id == room.master) {
            return res.json({master:true});
          } else {
            if (student.classrooms_student.indexOf(room.id) > -1) {
              return res.json({master:false});
            } else {
              return res.status(422).send();
            }
          }
        } else {
          return res.status(422).send("Classroom does not exist.");
        }

      });
    }

  });

});

router.post("/ticket",authenticated,[check('title').custom(title => typeof title == "string").withMessage('Invalid format for election title.').isLength({min:10,max:150}).withMessage("Election title must be between 10-150 characters.").customSanitizer((val) => {
  if (val) {
    return val.trim().replace(/\s/g, ' ')
  }
}),
check('typeof').isIn(['stv','fpp','approval']).withMessage('Invalid election type.'),
check('vacancies').isInt().withMessage('Vacancies must be an integer.'),
check('urls.*').optional().isURL().withMessage('Please ensure that all links are valid URLs.').matches(/^https*/).withMessage('Invalid URL. Please copy and paste entire URL.').isLength({max:500}).withMessage('URL is too large.'),
check('restrictions').custom(resOb => Object.prototype.toString.call(resOb) == "[object Object]").withMessage('Incorrect format detected.'),
check('candidates').custom(candidates => Object.prototype.toString.call(candidates) == "[object Object]" ).withMessage('Incorrect format detected.').custom((candidates) => Object.values(candidates).indexOf(true) > -1).withMessage('There must be at least 1 candidate selected to run.'),
check('description').custom(description => typeof description == "string").withMessage('Invalid format for election description.').isLength({min:20,max:500}).withMessage("Description must be between 20-500 characters.").customSanitizer((val) => {
  if (val) {
    return val.trim().replace(/\s/g, ' ')
  }
}),
check('approvalRate').optional(),
check('duration').custom(duration => typeof duration == "number").withMessage("Invalid format for election duration.").custom(time => time >= 0.5 && time <= 168 ).withMessage("Duration must be between 0.5 (30 minutes) and 168 hours.")],(req,res,next)=>{


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  if (req.body.vacancies > 5) {
    return res.status(422).json({errors:[{msg:'Vacancies to be filled cannot exceed 5.'}]});
  }


  const studentIds = Object.keys(req.body.candidates);
  let candidates = {};
  studentIds.forEach((id)=>{
    if (req.body.candidates[id]) {
      candidates[id] = true;
    }
  });

  if (Object.keys(candidates).length > 15 || Object.keys(candidates).length < 1) {
    return res.status(422).json({errors:[{msg:'The number of candidates must be between 1 and 15.'}]})
  }


  if (req.body.typeof != "approval") {
    if (req.body.vacancies >= Object.keys(candidates).length) {
      return res.status(422).json({ errors: [{msg:'The number of candidates must exceed the number of vacancies.'}] });
    }
  } else {
    if (Object.keys(candidates).length == 1) {
      if (req.body.vacancies != 1) {
        return res.status(422).json({ errors: [{msg:'The number of vacancies must be 1.'}] });
      }
    } else {
      if (req.body.vacancies >= Object.keys(candidates).length) {
        return res.status(422).json({ errors: [{msg:'The number of candidates must exceed the number of vacancies.'}] });
      }
    }

  }


  const restrictedStudentIds = Object.keys(req.body.restrictions);
  let restrictedCandidates = {};
  restrictedStudentIds.forEach((id)=>{
    if (req.body.restrictions[id]) {
      restrictedCandidates[id] = true;
    }
  });

  let ticketBody;
  if (typeof req.body.approvalRate == "number" && req.body.typeof == "approval" && Object.keys(candidates).length == 1) {
    ticketBody = {type:req.body.typeof,candidates:candidates,restrictions:restrictedCandidates,title:req.body.title,description:req.body.description,duration:req.body.duration,links:req.body.urls,vacancies:req.body.vacancies,approvalRate:req.body.approvalRate};
  } else {
    ticketBody = {type:req.body.typeof,candidates:candidates,restrictions:restrictedCandidates,title:req.body.title,description:req.body.description,duration:req.body.duration,links:req.body.urls,vacancies:req.body.vacancies};
  }




  return res.json({election:ticketBody,copy:ticketBody});



});

router.post("/submit-ticket",authenticated,[check('sheet.*.title').custom(title => typeof title == "string").withMessage('Invalid format for election title.').isLength({min:10,max:150}).withMessage("All election titles must be between 10-150 characters.").customSanitizer((val) => {
  if (val) {
    return val.trim().replace(/\s/g, ' ')
  }
}),
check('sheet').custom(sheet => Object.prototype.toString.call(sheet) == "[object Array]").withMessage('Incorrect format for election ticket.').custom(sheet => sheet.length < 20 && sheet.length > 0).withMessage('The election ticket must be less than 20 elections.'),
check('sheet.*.links.*').optional().isURL().withMessage('Please ensure that all links are valid URLs.').matches(/^https*/).withMessage('Invalid URL. Please copy and paste entire URL.').isLength({max:500}).withMessage('URL is too large.'),
check('sheet.*.restrictions').custom((restrictedOb) => Object.prototype.toString.call(restrictedOb) == "[object Object]").withMessage('Incorrect format.'),
check('sheet.*.candidates').custom((candidates) => Object.prototype.toString.call(candidates) == "[object Object]" ).withMessage('Incorrect format detected.').custom((candidates) => Object.values(candidates).indexOf(true) > -1).withMessage('There must be at least 1 candidate selected to run.'),
check('sheet.*.description').custom(description => typeof description == "string").withMessage('Invalid format for election description.').isLength({min:20,max:500}).withMessage("All descriptions must be between 20-500 characters.").customSanitizer((val) => {
  if (val) {
    return val.trim().replace(/\s/g, ' ')
  }
}),
check('sheet.*.vacancies').isInt().withMessage('Vacancies must be an integer.'),
check('sheet.*.type').isIn(['stv','fpp','approval']).withMessage('Not a valid election type.'),
check('sheet.*.duration').custom(duration => typeof duration == "number").withMessage("Invalid format for election duration.").custom(time => time >= 0.5 && time <= 168 ).withMessage("All durations must be between 0.5 (30 minutes) and 168 hours."),
check('classname').isLength({min:6,max:12}).withMessage('Class name must be between 6-12 characters.').matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Class name must only contain letters (french or english) and/or numbers.").customSanitizer((val) => {
  if (val) {
    return val.toLowerCase();
  }
})],(req,res,next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let sheet = req.body.sheet;
    let allCandidates = [];
    let trueCandidates;

    Classroom.findOne({ name:req.body.classname }).populate({
      path: 'elections',
      model: 'Election',
      options: {sort:{'date':'asc'}}
    }).exec((error,classroom)=>{
      if (error) next(error)
      try {
        if (classroom) {

          let ongoing = classroom.elections.filter(el => el.status == true);

          if (ongoing.length > 0) {
            return res.status(401).send("Elections are currently ongoing.");
          } else {

            if (classroom.master == req.user.id) {

              const tokens = classroom.students.map((student)=>{
                return {_id:student._id,email:student.email,hash:uuidv4()}
              });

              sheet.forEach((poll,idx) => {

                let validRestrictions = Object.keys(poll.restrictions).every((rest)=>{
                  return mongoose.Types.ObjectId.isValid(rest);
                });

                let validCandidates = Object.keys(poll.candidates).every((cand)=>{
                  return mongoose.Types.ObjectId.isValid(cand);
                });

                if (!validCandidates || !validRestrictions) {
                  throw new Error('Invalid input for candidates/restrictions.');
                }

                if (poll.vacancies > 5) {
                  throw new Error('Vacancies to be filled cannot exceed 5');
                }


                const restrictedStudentIds = Object.keys(poll.restrictions);
                let restrictedCandidates = [];
                const re = new RegExp('^[\\w]{5,50}$');
                restrictedStudentIds.forEach((id)=>{
                  if (!re.test(id)) {
                    throw new Error('Invalid format for election restrictions.');
                  }
                  if (poll.restrictions[id] == true) {
                    restrictedCandidates.push(id);
                  } else if (poll.restrictions[id] == false) {
                    // ignore
                  } else {
                    throw new Error('Invalid format for election restrictions.');

                  }
                });

                let voterStat = classroom.students.map((student)=>{
                  if (restrictedCandidates.indexOf(student._id.toString()) == -1) {
                    return {_id:student._id,email:student.email,didVote:false};
                  } else {
                    return {_id:student._id,email:student.email,didVote:true};
                  }
                });

                const classStudentIds = classroom.students.map(student => student._id.toString());
                trueCandidates = Object.keys(poll.candidates).filter(candidate => poll.candidates[candidate] == true);
                trueCandidates.forEach((candidate)=>{
                  if (!classStudentIds.includes(candidate)) {
                    throw new Error('Candidates must be a student in the class list.');

                  }
                });

                poll.candidates = classroom.students.filter((student) => {
                  return trueCandidates.indexOf(student._id.toString()) > -1
                });

                if (poll.candidates.length > 15 || poll.candidates.length < 1) {
                  throw new Error('The number of candidates must be between 1 and 15.');
                }

                poll.date = new Date();
                poll.class = classroom.id;
                poll.status = true;
                if (poll.type == "fpp" || poll.type == "approval") {
                  poll.count = poll.candidates.map((ob) => { return { votes:0,_id:ob._id,name:ob.name } });
                }

                if (poll.type == "approval" && poll.vacancies == 1 && Object.keys(poll.candidates).length == 1) {
                  if (typeof poll.approvalRate != "number") {
                    throw new Error("Approval rate should be a number between 1-100.");
                  }
                  if (poll.approvalRate > 100 || poll.approvalRate < 1) {
                    throw new Error("Approval rate should be a number between 1-100.");
                  }
                } else {
                  poll.approvalRate = undefined;
                }

                if (poll.type == "stv") {
                  poll.count_STV = poll.candidates.map((ob) => { return { _id:ob._id,name:ob.name,ranks:[] } });
                }

                poll.electionAccess = classroom.students.map((student) => { return {_id:student._id,email:student.email,permission:false} });
                poll.voteStatus = voterStat;
                poll.tokens = tokens;
                if (poll.urls != undefined) {
                  poll.links = poll.urls;
                }


                if (poll.type != "approval") {

                  if (poll.candidates.length <= poll.vacancies) {
                    throw new Error('The number of candidates must exceed the number of vacancies.');
                  }

                } else {

                  if (poll.candidates.length == 1) {

                    if (poll.vacancies != 1) {
                      throw new Error('The number of vacancies must be 1.');
                    }

                  } else {

                    if (poll.candidates.length <= poll.vacancies) {
                      throw new Error('The number of candidates must exceed the number of vacancies.');
                    }

                  }


                }


              });


              Election.insertMany(sheet).then((docs) => {
                if (classroom.elections.length > 100) {
                  let remove = sheet.length + (classroom.elections.length - 100);
                  classroom.elections.splice(0,remove);
                }
                let ids = docs.map(e => e._id).forEach((id)=>{
                  classroom.elections.push(id);
                });
                classroom.save().then(()=>{
                  return res.json({});
                }).catch(err=>next(err));
              },(err)=>{
                return res.status(422).json({errors:[{msg:'Oops. Something went wrong. Please try submitting again.'}]});
              });

            } else {
              return res.status(422).json({errors:[{msg:'You do not have permission to create polls for this class.'}]});
            }


          }





        } else {
          return res.status(422).json({errors:[{msg:"Classroom does not exist."}]});
        }
      } catch(e) {
        return res.status(422).json({errors:[{msg:e.message}]});
      }

    })

});

router.post("/access-poll/:key",authenticated,[check('name').isLength({min:6,max:12}).withMessage('Class name must be between 6-12 characters.').matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Class name must only contain letters (french or english) and/or numbers.").customSanitizer(val => {
  if (val) {
    return val.toLowerCase();
  }
}),
check('password').isLength({min:6}).withMessage("Minimum of 6 characters.").matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\\-]+$/).withMessage("Must contain only letters (french or english), numbers or hyphens.")],(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let currentTime = new Date().getTime();

  if (req.session[req.user.username] == undefined || req.session[req.user.username] > 0 || req.session[`${req.user.username}_timeOut`] < currentTime) {

    if (req.session[`${req.user.username}_timeOut`]) {
      delete req.session[req.user.username];
      delete req.session[`${req.user.username}_timeOut`];
    }

    if (req.params.key === "code") {
      Classroom.findOne({ name:req.body.name }).populate('elections').exec((err,classroom) => {
          if (err) next(err)

          try {
            if (classroom) {
              const studentIds = classroom.students.map(student => student.email);
              if (studentIds.includes(req.user.email)) {

                const firstElection = classroom.elections.filter(el => el.status == true)[0];
                const pass = firstElection.tokens.find((student) => {
                  return student.email == req.user.email && student.hash == req.body.password;
                });

                if (!pass) {

                  if (req.session[req.user.username]) {
                    req.session[req.user.username]--;
                    if (req.session[req.user.username] == 0) {
                      req.session[`${req.user.username}_timeOut`] = new Date().getTime() + 120000; // 2 min lock out
                    }
                  } else {
                    req.session[req.user.username] = 9;
                  }

                  throw new Error('Incorrect access code.');
                } else {
                  Election.find({tokens: {$elemMatch : { email:req.user.email,hash:req.body.password }}}).exec((err,polls) => {
                    if (err) next(err)
                    if (polls) {
                      polls.forEach((poll,idx)=>{
                        poll.electionAccess.forEach(async function(person,i) {
                          if (person.email == req.user.email) {
                            poll.electionAccess.splice(i,1,{_id:person._id,email:req.user.email,permission:true});
                            await poll.save().then(()=>{}).catch(err => next(err));
                            if (polls.length == idx+1) {
                              delete req.session[req.user.username]
                              return res.json({});
                            }
                          }
                        });
                      });
                    } else {
                      throw new Error('Oops. Something went wrong. Please try submitting details again.');
                    }
                  });
                }


              } else {
                // student is not apart of the classroom
                throw new Error("You cannot partake in this classroom's elections.");

              }

            } else {
              // classroom doesn't exist
              throw new Error("This classroom does not exist.");
            }
          } catch(e) {
            return res.status(422).json({errors:[{msg:e.message}]});
          }


        });
    }


    if (req.params.key === "key") {
      bcrypt.compare(req.body.password,req.user.key,(error,response)=>{
        if (error) {
          next(error);
        }
        if (response) {
          Classroom.find({name:req.body.name}).populate('elections').exec((err,room)=>{
            if (err) next(err);
            if (room.length > 0) {
              let valid = room[0].students.filter(student => student.email == req.user.email);
              if (valid.length > 0) {
                let firstElection = room[0].elections.filter(el => el.status == true)[0];
                let token = firstElection.tokens.filter(token => token.email == req.user.email)[0];
                if (token) {
                  return res.json({key:token.hash});
                } else {
                  return res.status(422).json({errors:[{msg:'Cannot access this poll as you were added to the class list after the creation of the poll.'}]});
                }

              } else {
                return res.status(422).json({errors:[{msg:'You are not apart of the class list.'}]});
              }
            } else {
              return res.status(422).json({errors:[{msg:'Classroom not found.'}]});
            }

          });
        } else {

          if (req.session[req.user.username]) {
            req.session[req.user.username]--;
            if (req.session[req.user.username] == 0) {
              req.session[`${req.user.username}_timeOut`] = new Date().getTime() + 120000; // 2 min lock out
            }
          } else {
            req.session[req.user.username] = 9;
          }

          return res.status(422).json({errors:[{msg:'Incorrect key.'}]});

        }
      });
    }

  } else {
    return res.status(422).json({errors:[{msg:'Account locked. Please wait 2 mintutes.'}]});
  }


});

router.post("/vote",authenticated,[check('type').isIn(['stv','fpp','approval']).withMessage('Invalid election type.')],(req,res,next)=>{

  if (req.body.type == "stv") {
    if (Object.prototype.toString.call(req.body.student) != "[object Array]") {
      return res.status(422).json({ errors: [{msg:'Invalid submission.'}] });
    }
    if (req.body.student.length <= 0) {
      return res.status(422).json({ errors: [{msg:'Invalid submission. Please rank at least 1 candidate.'}] });
    }
  }

  if (req.body.type == "approval") {
    if (Object.prototype.toString.call(req.body.student) != "[object Object]") {
      return res.status(422).json({ errors: [{msg:'Invalid submission.'}] });
    }
  }

  if (req.body.type == "fpp") {

    if (Object.prototype.toString.call(req.body.student) != "[object Object]") {
      return res.status(422).json({ errors: [{msg:'Invalid submission.'}] });
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.student._id)) {
      return res.status(422).json({ errors: [{msg:'Invalid submission.'}] });
    }

  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Student.findById(req.user.id).populate({
    path: 'classrooms_master classrooms_student',
    populate: {
      path: 'elections',
    }
  }).exec((err,student)=>{
    if (err) next(err)
    try {
      const foundElectionMaster = student.classrooms_master.filter((room)=>{
        return room.elections.some(e => e._id == req.body.id );
      });

      const foundElectionStudent = student.classrooms_student.filter((room)=>{
        return room.elections.some(e => e._id == req.body.id );
      });

      if (mongoose.Types.ObjectId.isValid(req.body.id)) {
        if (foundElectionMaster.length > 0 || foundElectionStudent.length > 0) {
          Election.findById(req.body.id).exec((err,elec) => {
            if (err) next(err)
            try {
              const start = new Date(elec.date).getTime();
              const duration = elec.duration*3600000;
              const expiration = start + duration;
              const current = new Date().getTime();
              const expired = current < expiration ? false : true;
              if (expired) {
                throw new Error('Cannot submit vote as the poll is now closed.');
              } else {
                const studentStatus = elec.voteStatus.filter(student => student.email == req.user.email)[0];
                if (!studentStatus.didVote) {
                  if (req.body.type == "fpp") {
                    const candidatePresent = elec.candidates.find(candidate => candidate._id.toString() == req.body.student._id);
                    if (candidatePresent) {
                      elec.count.forEach((student)=>{
                        if (student._id.toString() == req.body.student._id) {
                          student.votes = student.votes + 1;
                        }
                      });

                      elec.total = elec.total+1;

                      elec.voteStatus.forEach((ob)=>{
                        if (ob.email == req.user.email) {
                          ob.didVote = true;
                        }
                      });
                      elec.save().then(()=>{
                        return res.json({}) //success
                      }).catch((err)=>next(err));


                    } else {
                      // candidate is not legit
                      throw new Error('Vote note submitted because candidate not found.');
                    }
                  }

                  if (req.body.type == "stv") {
                    let studentIdsAllCand = elec.candidates.map(cand => cand._id.toString());
                    req.body.student.forEach((id)=>{
                      if (studentIdsAllCand.indexOf(id) == -1) {
                        throw new Error("Candidate does not exist.");
                      }
                    });

                    let firstChoice = req.body.student[0];
                    elec.count_STV.forEach((ob)=>{
                      if (ob._id.toString() == firstChoice) {
                        ob.ranks.push(req.body.student);
                        ob.total = ob.total + 1;
                      }
                    });

                    elec.total = elec.total + 1;

                    elec.quota = (elec.total/(elec.vacancies + 1)) + 1;

                    elec.voteStatus.forEach((ob)=>{
                      if (ob.email == req.user.email) {
                        ob.didVote = true;
                      }
                    });

                    elec.save().then(()=>{
                      return res.json({}) //success
                    }).catch((err)=>next(err));


                  }

                  if (req.body.type == "approval") {
                    let studentIdsAllCand = elec.candidates.map(cand => cand._id.toString());
                    Object.keys(req.body.student).forEach((id)=>{
                      if (studentIdsAllCand.indexOf(id) == -1) {
                        throw new Error("Candidate does not exist.");
                      }
                    });

                    elec.count.forEach((ob)=>{
                      if (req.body.student[ob._id.toString()] == true) {
                        ob.votes = ob.votes + 1;
                        if (elec.candidates.length == 1) {
                          elec.canApprovalRate = ( ob.votes/(elec.total + 1) ) * 100;
                        }
                      }
                    });

                    elec.total = elec.candidates.length + elec.total;

                    elec.voteStatus.forEach((ob)=>{
                      if (ob.email == req.user.email) {
                        ob.didVote = true;
                      }
                    });
                    elec.save().then(()=>{
                      return res.json({}) //success
                    }).catch((err)=>next(err));

                  }



                } else {
                  // already voted
                  throw new Error('You either do not have permission to vote or have already submitted a vote.');
                }
              }
            } catch(e){
              return res.status(422).json({ errors: [{msg:e.message}] });
            }



          });
        } else {
          // election does not exist or is now closed.
          throw new Error('Poll does not exist or is now closed.');
        }
      } else {
        return res.status(422).json({errors:[{msg:'Not a valid election ID.'}]});
      }

    } catch(e) {
      return res.status(422).json({ errors: [{msg:e.message}] });
    }





  })



});

router.post("/expired",authenticated,(req,res,next) => {


  edits = async (ids) =>{

      let passed = ids.every((id)=>{
        return mongoose.Types.ObjectId.isValid(id);
      });

      if (!passed) {
        throw new Error('Invalid election ID.');
      } else {
        for(let i=0;i<ids.length;i++) {
          let expiredElec = await Election.findById(ids[i]).exec();
          let expiredElecClass = await Classroom.findById(expiredElec.class).populate({path:'elections',options:{sort:{'date':1}}}).exec();
          if (expiredElec.type == "fpp" || expiredElec.type == "approval") {
            if (expiredElec.type == "approval" && expiredElec.vacancies == 1 && expiredElec.candidates.length == 1) {
              if (expiredElec.canApprovalRate >= expiredElec.approvalRate) {
                // winner
                expiredElec.winners = expiredElec.count;
              } else {
                // loser
                expiredElec.winners = [];
              }

              const start = new Date(expiredElec.date).getTime();
              const duration = expiredElec.duration * 3600000;
              const expiration = start + duration;
              const current = new Date().getTime();
              const expired = current < expiration ? false : true;
              if (expired && expiredElec.status) {
                expiredElec.status = false;
                expiredElec.electionAccess = undefined;
                expiredElec.voteStatus = undefined;
                await expiredElec.save();
              } else {
                throw new Error();
              }

            } else {
              let countObjectArr = _.shuffle([...expiredElec.count]);
              let winners = [];
              for(let x=0;x<expiredElec.vacancies;x++) {
                let maxVal = _.max(countObjectArr,(candidate)=>{
                  return candidate.votes
                });
                winners.push(maxVal);
                countObjectArr.splice(countObjectArr.indexOf(maxVal),1);
              }

              expiredElec.winners = winners;
              const start = new Date(expiredElec.date).getTime();
              const duration = expiredElec.duration * 3600000;
              const expiration = start + duration;
              const current = new Date().getTime();
              const expired = current < expiration ? false : true;
              if (expired && expiredElec.status) {
                expiredElec.status = false;
                expiredElec.electionAccess = undefined;
                expiredElec.voteStatus = undefined;
                await expiredElec.save();
              } else {
                throw new Error();
              }


            }

          } else if (expiredElec.type == "stv") {
            let expiredElec_ = await Election.findById(ids[i]).exec();
            expiredElec_.count_STV.sort((a,b)=>{
              return b.total - a.total;
            });
            const start = new Date(expiredElec_.date).getTime();
            const duration = expiredElec_.duration * 3600000;
            const expiration = start + duration;
            const current = new Date().getTime();
            const expired = current < expiration ? false : true;
            if (expired && expiredElec_.status) {
              let exceededThreshold = [];
              let eliminated = [];
              let elected = [];
              let roundedQuota = Math.floor(expiredElec_.quota);

              expiredElec_.count_STV.forEach((student)=>{
                if (student.ranks.length > roundedQuota) {
                  exceededThreshold.push(student._id.toString());
                  elected.push({quota:roundedQuota,_id:student._id.toString()});
                }
              });

              if (elected.length >= expiredElec_.vacancies) {
                // done
                let losers = [];
                expiredElec_.candidates.forEach((can)=>{
                  if (exceededThreshold.indexOf(can._id.toString()) == -1) {
                    losers.push({quota:0,_id:can._id.toString()});
                  };
                });
                let elected_all = elected.concat(losers);
                elected_all.forEach((ob)=>{
                  expiredElecClass.students.forEach((student)=>{
                    if (student._id.toString() == ob._id) {
                      ob['name'] = student.name;
                    }
                  })
                })
                expiredElec_.status = false;
                expiredElec_.elected_STV = elected_all;
                expiredElec_.electionAccess = undefined;
                expiredElec_.voteStatus = undefined;
                await expiredElec_.save();

              } else {
                elected = [];
                exceededThreshold = [];

                expiredElec_.count_STV.forEach((student)=>{
                  if (student.ranks.length > roundedQuota) {
                    exceededThreshold.push(student._id.toString());
                    elected.push({quota:roundedQuota,_id:student._id.toString()});
                    let slice = student.ranks.length - roundedQuota
                    let excessVotes = _.sample(student.ranks,slice);
                    excessVotes.forEach((excess)=>{
                      excess.shift();
                      let followingRanked = excess[0];
                      expiredElec_.count_STV.forEach((candidate) => {
                        if (candidate._id.toString() == followingRanked) {
                          candidate.ranks.push(excess);
                        }
                      })
                    });
                  }
                });

                await expiredElec_.save();
                // not enough votes
                let expiredElec__ = await Election.findById(ids[i]).exec();
                if (elected.length < expiredElec__.vacancies) {

                  try {

                    expiredElec__.count_STV = _.shuffle(expiredElec__.count_STV);

                    expiredElec__.count_STV.sort((a,b)=>{
                      return a.total - b.total;
                    }).forEach((student,index)=>{

                      if (exceededThreshold.indexOf(student._id.toString()) == -1 && index+1 <= expiredElec__.candidates.length - expiredElec__.vacancies) {

                        eliminated.push(student._id.toString());

                        student.ranks.forEach((voteList)=>{
                          voteList.shift();
                          for(let i=0;i<voteList.length;i++){
                            try {
                              expiredElec__.count_STV.forEach((candidate)=>{
                                if (candidate._id.toString() == voteList[i] && exceededThreshold.indexOf(voteList[i]) == -1 && eliminated.indexOf(voteList[i]) == -1) {
                                  candidate.ranks.push(voteList);
                                  throw new Error();
                                }
                              })
                            } catch(e) {
                              break;
                            }

                          }

                        });
                        // see if anyone hit quota
                        expiredElec__.count_STV.forEach((student_)=>{
                            if (student_.ranks.length > roundedQuota && exceededThreshold.indexOf(student_._id.toString()) == -1) {
                              elected.push({quota:roundedQuota,_id:student_._id.toString()});
                              exceededThreshold.push(student_._id.toString());
                            }
                        });

                        // check to see if there are remaining vacancies

                        if (elected.length >= expiredElec__.vacancies) {
                          throw new Error();
                        }

                      } else {
                        if (exceededThreshold.indexOf(student._id.toString()) == -1) {
                          elected.push({quota:roundedQuota,_id:student._id.toString()});
                          exceededThreshold.push(student._id.toString());
                        }
                        if (index+1 == expiredElec__.candidates.length) {
                          throw new Error();
                        }
                      }




                    });

                  } catch(e) {
                    // done
                    let losers = [];
                    expiredElec__.candidates.forEach((can)=>{
                      if (exceededThreshold.indexOf(can._id.toString()) == -1) {
                        losers.push({quota:0,_id:can._id.toString()});
                      };
                    });
                    let elected_all = elected.concat(losers);
                    elected_all.forEach((ob)=>{
                      expiredElecClass.students.forEach((student)=>{
                        if (student._id.toString() == ob._id) {
                          ob['name'] = student.name;
                        }
                      })
                    });

                    expiredElec__.status = false;
                    expiredElec__.elected_STV = elected_all;
                    expiredElec__.electionAccess = undefined;
                    expiredElec__.voteStatus = undefined;
                    await expiredElec__.save();

                  }

                } else {
                  // done
                  let losers = [];
                  expiredElec__.candidates.forEach((can)=>{
                    if (exceededThreshold.indexOf(can._id.toString()) == -1) {
                      losers.push({quota:0,_id:can._id.toString()});
                    };
                  });
                  let elected_all = elected.concat(losers);
                  elected_all.forEach((ob)=>{
                    expiredElecClass.students.forEach((student)=>{
                      if (student._id.toString() == ob._id) {
                        ob['name'] = student.name;
                      }
                    })
                  })
                  expiredElec__.status = false;
                  expiredElec__.elected_STV = elected_all;
                  expiredElec__.electionAccess = undefined;
                  expiredElec__.voteStatus = undefined;
                  await expiredElec__.save();

                }

              }




            } else {
              // poll has already been closed and expired
              throw new Error();
            }
          }

        }
      }









  }

  edits(req.body.ids).then(()=>{
    return res.json({});
  }).catch((err)=>{
    next(err)
  });


});

router.post("/delete-poll",authenticated,(req,res,next) => {

  let currentTime = new Date().getTime();

  if (req.session[req.user.username] == undefined || req.session[req.user.username] > 0 || req.session[`${req.user.username}_timeOut`] < currentTime) {

    if (req.session[`${req.user.username}_timeOut`]) {
      delete req.session[req.user.username];
      delete req.session[`${req.user.username}_timeOut`];
    }

    Classroom.findOne({name:req.body.name}).populate({
      path:'elections',
      populate: {
        path: 'candidates'
      }
    }).exec((err,room) => {
      if (err) next(err)
      if (room.master == req.user.id) {

        if (mongoose.Types.ObjectId.isValid(req.body.id)) {

          Election.findById(req.body.id).exec((error,poll)=>{
            if (error) next(error)
            if (poll) {
              if (poll.status) {
                bcrypt.compare(req.body.password,room.password,(e,r)=>{
                  if (e) next(e)
                  if (r) {
                    let updatedElections = room.elections.filter(elections => elections._id.toString() != req.body.id);
                    room.elections = updatedElections;
                    room.save().then(()=>{
                      Election.deleteOne({_id:req.body.id},(err,result)=>{
                        if (err) next(err)
                      });
                      return res.json({elections:updatedElections});
                    }).catch((err)=>next(err));
                  } else {

                    if (req.session[req.user.username]) {
                      req.session[req.user.username]--;
                      if (req.session[req.user.username] == 0) {
                        req.session[`${req.user.username}_timeOut`] = new Date().getTime() + 120000; // 2 min lock out
                      }
                    } else {
                      req.session[req.user.username] = 9;
                    }

                    return res.status(422).json({ errors: [{msg:"Incorrect password."}] });
                  }
                })
              } else {
                return res.status(422).json({errors:[{msg:'This poll has already expired.'}]});
              }
            } else {
              return res.status(422).json({errors:[{msg:'Poll does not exist.'}]});
            }

          })


        } else {
          return res.status(422).json({errors:[{msg:'Invalid poll ID.'}]});
        }




      } else {
        return res.status(422).json({ errors: [{msg:"You do not have permission to perform this action."}] });
      }
    });

  } else {
    return res.status(422).json({errors:[{msg:'Account locked. Please wait 2 mintutes.'}]});
  }




});

router.post("/delete-class",authenticated,[check('name').isLength({min:6,max:12}).withMessage('Class name must be between 6-12 characters.').matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Class name must only contain letters (french or english) and/or numbers.").customSanitizer(val => {
  if (val) {
    return val.toLowerCase();
  }
}),
check('password').isLength({min:6,max:12}).withMessage("Password must be between 6-12 characters.").matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Password must only contain letters (french or english) and/or numbers.")],(req,res,next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }


  let currentTime = new Date().getTime();

  if (req.session[req.user.username] == undefined || req.session[req.user.username] > 0 || req.session[`${req.user.username}_timeOut`] < currentTime) {

    if (req.session[`${req.user.username}_timeOut`]) {
      delete req.session[req.user.username];
      delete req.session[`${req.user.username}_timeOut`];
    }

    Classroom.findOne({ name:req.body.name },(err,room)=>{
      if (err) next(err)
      if (room) {
        bcrypt.compare(req.body.password, room.password, (err,resp)=>{
          if (err) next(err)
            if (resp) {
              if (room.master == req.user.id) {

                Student.find({$or:[{classrooms_master:room.id},{classrooms_student:room.id}]}).exec((err,students)=>{
                  if (err) next(err)

                  // removes from master list
                  students.forEach(async function(student) {
                    idxM = student.classrooms_master.indexOf(room.id);
                    if (idxM > -1) {
                      student.classrooms_master.splice(idxM,1);
                      await student.save().then(()=>{}).catch((err)=>next(err))
                    }
                  });

                  // removes from student list
                  students.forEach(async function (student) {
                    idxS = student.classrooms_student.indexOf(room.id);
                    if (idxS > -1) {
                      student.classrooms_student.splice(idxS,1);
                      await student.save().then(()=>{}).catch((err)=>next(err))
                    }
                  });


                  // deletes all elections associated with master classrooms
                  if (room.elections.length >0) {
                    Election.deleteMany({_id:{$in:room.elections}},(err,docs)=>{
                      if (err) next(err)
                    });
                  }

                  room.remove((err,result)=>{
                    if (err) next(err)
                    return res.json({}); //success
                  });

                });


              } else {
                return res.status(401).json({errors:[{msg:"You do not have permission to delete this class."}]})
              }
            } else {

              if (req.session[req.user.username]) {
                req.session[req.user.username]--;
                if (req.session[req.user.username] == 0) {
                  req.session[`${req.user.username}_timeOut`] = new Date().getTime() + 120000; // 2 min lock out
                }
              } else {
                req.session[req.user.username] = 9;
              }

              return res.status(401).json({errors:[{msg:"Password is incorrect."}]});
            }
        });
      } else {
        return res.status(401).json({errors:[{msg:"Classroom does not exist."}]});
      }
    })


  } else {
    return res.status(422).json({errors:[{msg:'Account locked. Please wait 2 mintutes.'}]});
  }



});

router.post("/leave-class",authenticated,[check('classname').isLength({min:6,max:12}).withMessage('Class name must be between 6-12 characters.').matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Class name must only contain letters (french or english) and/or numbers.").customSanitizer(val => {
  if (val) {
    return val.toLowerCase();
  }
}),
check('password').isLength({min:6,max:12}).withMessage("Password must be between 6-12 characters.").matches(/^[0-9a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/).withMessage("Password must only contain letters (french or english) and/or numbers.")],(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }


  let currentTime = new Date().getTime();

  if (req.session[req.user.username] == undefined || req.session[req.user.username] > 0 || req.session[`${req.user.username}_timeOut`] < currentTime) {

    if (req.session[`${req.user.username}_timeOut`]) {
      delete req.session[req.user.username];
      delete req.session[`${req.user.username}_timeOut`];
    }

    // password, name

    bcrypt.compare(req.body.password, req.user.password, (err,resp)=>{
      if (err) next(err)
      if (resp) {
        Student.findById(req.user.id).populate('classrooms_student').exec((err,student)=>{
          if (err) next(err)
          if (student) {
            student.classrooms_student = student.classrooms_student.filter(room => room.name != req.body.name);
            student.save().then().catch((err)=>next(err));
            Classroom.find({name:req.body.name}).exec((err,room)=>{
              if (err) next(err)
              room.joined = room.joined - 1;
              room.save().then(()=>{
                return res.json({});
              }).catch((err)=>next(err));
            });
          } else {
            return res.status(422).json({errors:[{msg:'User not found.'}]});
          }
        })
      } else {

        if (req.session[req.user.username]) {
          req.session[req.user.username]--;
          if (req.session[req.user.username] == 0) {
            req.session[`${req.user.username}_timeOut`] = new Date().getTime() + 120000; // 2 min lock out
          }
        } else {
          req.session[req.user.username] = 9;
        }

        return res.status(422).json({errors:[{msg:'Incorrect password.'}]});
      }

    });


  } else {
    return res.status(422).json({errors:[{msg:'Account locked. Please wait 2 mintutes.'}]});
  }



});

router.get("/permission/:id",authenticated,(req,res,next)=>{
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {

      Election.findOne({_id: req.params.id}).populate({
        path: 'class',
        model: 'Classroom',
        select: 'students _id name master partake'
      }).select('-tokens').lean().exec((err,election)=>{

        if (err) {
          next(err)
        }

        if (election) {
          if (election.status) {
            election.electionAccess.forEach((student,idx)=>{
              if (student.email == req.user.email) {
                if (student.permission) {

                  if (election.voteStatus) {
                    election.voteStatus = election.voteStatus.filter(voterObject => voterObject.email == student.email);
                  }

                  if (election.electionAccess) {
                    election.electionAccess = election.electionAccess.filter(accessObject => accessObject.email == student.email);
                  }

                  let classSize = election.class.students.length;

                  return res.json({election:election,classSize:classSize});
                } else {
                  return res.status(401).send('Must enter your election key before proceeding to poll.');
                }
              }
              if (idx+1 == election.electionAccess.length) {
                if (req.user.id == election.class.master && (!election.class.partake || election.class.partake == undefined)) {

                  election.voteStatus = [{didVote:true}];
                  election.electionAccess = [];

                  let classSize = election.class.students.length;

                  return res.json({election:election,classSize:classSize});
                } else {
                  return res.status(401).send('Unauthorized.');
                }

              }
            });
          } else {
            let students = election.class.students.map(student => student.email);
            if (students.indexOf(req.user.email) > -1) {
              return res.json({election:election});
            } else {
              if (election.class.master == req.user.id) {
                return res.json({election:election});
              } else {
                return res.status(401).send();
              }
            }
          }


        } else {
          // doesn't exist
          return res.status(404).send('Poll does not exist.');
        }

      })

  } else {
    return res.status(401).send();
  }


});


router.get("/download/:id",authenticated,(req,res,next)=>{



    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      Election.findById(req.params.id).populate({
        path: 'class',
        select: 'name master'
      }).select('-tokens -status -count._id -elected_STV._id -winners._id -count_STV._id -candidates._id -__v -electionAccess -voteStatus -count_STV.ranks').lean().exec((err,election)=>{
        if (err) next(err)
        if (election) {
          if (req.user.id != election.class.master) {
            return res.status(401).json({errors:[{msg:'You do not have permission to perform this action.'}]});
          }

          election.total_votes = election.total;
          delete election.class.master;
          delete election.class._id;
          delete election.total;

          if (election.type == "fpp") {
            delete election.count_STV;
            delete election.elected_STV;
            delete election.canApprovalRate;
            delete election.quota;
          }

          if (election.type == "approval") {
            if (election.candidates.length == 1) {
              election.candidate_approval_rate = election.canApprovalRate;
              election.approval_rate_for_election = election.approvalRate;
              delete election.count_STV;
              delete election.elected_STV;
              delete election.quota;
              delete election.canApprovalRate;
              delete election.approvalRate;
            } else {
              delete election.count_STV;
              delete election.elected_STV;
              delete election.approvalRate;
              delete election.canApprovalRate;
              delete election.quota;
            }

            election.count.map((ob) => {
              let disVotes = election.total_votes/election.candidates.length - ob.votes;
              ob['approval_votes'] = ob.votes;
              ob['disapproval_votes'] = disVotes;
              delete ob.votes;
            });

            election.winners.map((ob)=>{
              let disVotes = election.total_votes/election.candidates.length - ob.votes;
              ob['approval_votes'] = ob.votes;
              ob['disapproval_votes'] = disVotes;
              delete ob.votes;
            });

          }

          if (election.type == "stv") {
            election.count_before_redistribution = election.count_STV.map((v)=>{
              v.votes = v.total;
              delete v.total;
              return v;
            });
            election.count_after_redistritbution = election.elected_STV.map((v)=>{
              v.votes = v.quota;
              delete v.quota;
              return v;
            });
            election.winners = election.elected_STV.filter(can => can.quota > 0).map((v)=>{
              v.votes = v.quota;
              delete v.quota;
              return v;
            });
            delete election.count_STV;
            delete election.elected_STV;
            delete election.count;
            delete election.approvalRate;
            delete election.canApprovalRate;
          }

          let text = JSON.stringify(election,null,2);

          fs.writeFile(`./elections/${election._id}-${election.class.name}.txt`,text,(err)=>{
            if (err) next(err)

            res.download(`./elections/${election._id}-${election.class.name}.txt`,(err)=>{
              if (err) next(err)

              fs.unlink(`./elections/${election._id}-${election.class.name}.txt`,(err)=>{
                if (err) console.log(err)
              });

            });

          });

        } else {
          return res.status(422).json({errors:[{msg:'This election does not exist.'}]});
        }
      })
    } else {
      return res.status(422).json({errors:[{msg:'Invalid election ID.'}]});
    }






})


module.exports = router;
