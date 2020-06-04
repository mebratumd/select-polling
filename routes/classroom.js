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
    fileSize:100000
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

const authenticated = (req,res,next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send();
  }

}

const errorFile = (err,req,res,next) => {
  if (err.code == 'LIMIT_FILE_SIZE') {
    return res.status(422).json({errors:[{msg:"File exceeds 100 MB."}]});
  } else if (err.code == 'LIMIT_FILE_COUNT') {
    return res.status(422).json({errors:[{msg:"Multiple files submitted. Only submit 1 CSV file with a class list."}]});
  } else {
    next()
  }
}



// dashboard endpoints

router.post("/search",authenticated,[check('name').isLength({min:6,max:12}).withMessage('Class name must be between 6-12 characters.').matches(/^[\w]+$/).withMessage("Class name must be alphanumeric.").customSanitizer(val => {
  if (val){
    return val.toLowerCase();
  }
})],(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Classroom.find({ name: {$regex: req.body.name } }).select('name school').limit(100).exec((err,rooms)=>{

    if (err) next(err)

    return res.json({classes:rooms});

  });

});


router.post("/password",authenticated,[check('password').isLength({min:6,max:12}).withMessage("Password must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric."),
check('name').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Class name must be alphanumeric.").customSanitizer(val=>{
  if (val){
    return val.toLowerCase();
  }
})],(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Classroom.findOne({name:req.body.name}).populate("elections").exec((err,room)=>{
    if (err) next(err)
    if (room) {
      bcrypt.compare(req.body.password,room.password,(err,resp)=>{
        if (err) next(err)
        if (resp){
          const student = room.students.filter((student)=>{
            return student.email == req.user.email && student.studentnumber == req.user.studentnumber;
          });
          if (student.length > 0) {
            if (room.elections.length > 0) {
              // token
              // access
              // vote status
              const tkn = uuidv4();
              room.elections.filter(el => el.status == true).forEach(async function(e){
                ongoingElec = await Election.findById(e._id).exec();
                didVote = ongoingElec.voteStatus.filter(voteOb => voteOb.studentnumber == req.user.studentnumber);
                if (didVote.length == 0) {
                  ongoingElec.tokens.push({studentnumber:req.user.studentnumber,hash:tkn});
                  ongoingElec.electionAccess.push({studentnumber:req.user.studentnumber,permission:false});
                  ongoingElec.voteStatus.push({studentnumber:req.user.studentnumber,didVote:false});
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
                  return res.status(422).json({errors:[{msg:`You have reached the limit for the amount of classrooms you can be a student in.`}]});
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
          return res.status(422).json({errors:[{msg:`Incorrect password for ${room.name}.`}]});
        }
      })
    } else {
      // doesn't exist
      return res.status(422).send("Classroom doesn't exist.");

    }

  });

});

// creating classroom endpoints

router.post("/edit",authenticated,upload.single('classfile'),errorFile,(req,res)=>{


  if (req.incorrectType) {
    return res.status(422).json({errors:[{msg:"File must be in CSV format."}]});
  }

  const headers = ["name","studentnumber","email"];
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
        sortedObject[key.toLowerCase()] = row[key].trim().replace(/\s\s+/g, ' ');
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

router.post("/submit",authenticated,[check('classname').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Class name must be alphanumeric.").customSanitizer(val => {
  if (val) {
    return val.toLowerCase();
  }
}),
check('school').isIn(['University of Manitoba']).withMessage("School not found."),
check('partake').isIn([true,false]).withMessage("Partake status must be either 'yes' or 'no'"),
check('password').isLength({min:6,max:12}).withMessage("Password must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric.")], (req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let schoolExtensions = {'University of Manitoba': ['myumanitoba.ca']};

  let finalClassList = [];

  const studentCheck = (student) => {
    const headers = Object.keys(student).map(val => val.trim().replace(/\s+/g,'').toLowerCase());
    const studentVals = Object.values(student).map(val => val.trim().replace(/\s\s+/g,' '));
    const sorted = {};
    const clean = {};

    if (headers.length == 3) {
      headers.forEach((header)=>{
          if (['name','studentnumber','email'].indexOf(header) == -1) {
            throw new Error("Incorrect CSV headers. Please ensure that the CSV file you uploaded has the following headers as the first row: name,studentnumber,email ");
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

    if (Object.values(student).length == 3) {
      Object.values(sorted).forEach((field,i)=>{
        //email
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
              throw new Error(`Invalid email extension(s) found: ${field}. Please ensure all emails are from the ${req.body.school}`);
            }


          } else {

            const re = new RegExp(`^[\\w.]{4,25}@${schoolExtensions[req.body.school]}$`);
            if (!re.test(field)) {
              //error
              throw new Error(`Invalid email extension(s) found: ${field}. Please ensure all emails are from the ${req.body.school}`);
            }
          }

        }
        // name
        if (i==1) {
          const re = new RegExp("^[\\w ]{2,40}$");
          if (!re.test(field)) {
            //error
            throw new Error(`Invalid student name(s) found: ${field}. Names must be between 2-40 characters and contain only letters.`);
          }
        }
        //student number
        if (i==2) {
          const re = new RegExp('^\\d{5,10}$');
          if (!re.test(field)) {
            // error
            throw new Error(`Invalid student number(s) found: ${field}. Student numbers must be 5-10 digits in length.`);
          }

        }
      });

      finalClassList.push(sorted);
    } else {
      throw new Error('Incorrectly formatted information. Check class list.');
    }

    if (req.user.studentnumber == student.studentnumber) {
      throw new Error(`Inputted user with the same student number as you. Ensure each student has a unique student number. If you are a student
      and are planning to partake in elections leave your information out of the student list; it will be added on our end.`);
    }

    if (student.email == req.user.email) {
      throw new Error(`Inputted user with the same email as you. Ensure each student has a unique email address.
      If you are a student
      and are planning to partake in elections leave your information out of the student list; it will be added on our end.`);
    }

  }


// here

  Student.findById(req.user.id).exec((er,st)=>{
    if (er) next(er)
    // less than or equal to 10 classrooms
    if (st.classrooms_master.length < 5) {


      Classroom.find({ name:req.body.classname },(err,classroom) => {
        if (err) next(err)


        if (classroom.length == 0) {
          try {
            req.body.students.forEach(studentCheck);

            const studentnumbers = finalClassList.map((student)=>{ return student.studentnumber.toString() });
            const duplicateStudentId = studentnumbers.some((studentnumber,idx)=>{
              return studentnumbers.indexOf(studentnumber) != idx;
            });
            if (duplicateStudentId) {
              throw new Error('Duplicate student numbers found. Each student should have a unique student number.');
            }

            const studentemails = finalClassList.map((student)=>{ return student.email });
            const duplicateStudentEmail = studentemails.some((studentemail,idx)=>{
              return studentemails.indexOf(studentemail) != idx;
            });
            if (duplicateStudentEmail) {
              throw new Error('Duplicate student emails found. Each student should have a unique email address.');
            }

            if (req.body.partake == "true") {
              if (req.user.status) {

                let self = finalClassList.filter((student,i)=>{

                  return student.studentnumber == req.user.studentnumber.toString() && student.email.toLowerCase() == req.user.email;
                });
                if (self.length == 0) {
                  finalClassList.push({email:req.user.email,name:`${req.user.firstname} ${req.user.lastname}`,studentnumber:req.user.studentnumber});
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
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) next(err)
                  // Store hash in your password DB.
                  const addClassroom = new Classroom({
                    name: req.body.classname.toLowerCase(),
                    password: hash,
                    school: req.body.school,
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

router.post("/delete-student",authenticated,[check('classname').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Class name must be alphanumeric.").customSanitizer(val => {
  if (val){
    return val.toLowerCase();
  }
}),
check('studentnumber').isLength({min:5,max:10}).withMessage('Student number must be between 5-10 digits in length.').isInt().withMessage('Student number must be an integer.'),
check('email').isEmail().withMessage('Invalid email.').normalizeEmail()], (req,res,next)=>{

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

              if (req.user.studentnumber == req.body.studentnumber) {
                throw new Error('You cannot remove yourself from the classroom.');
              }

              // this should execute regardless of student status
              Student.findOne({studentnumber:req.body.studentnumber,email:req.body.email}).exec((err,student)=>{
                if (err) next(err)
                if (student) {
                  const dec = room.joined - 1;
                  room.joined = dec;
                  const newClassList = student.classrooms_student.filter(classroom => classroom != room.id);
                  student.classrooms_student = newClassList;
                  student.save().then(()=>{

                  }).catch((err)=>next(err));
                }

              });

              const newClassList = room.students.filter(student => student.studentnumber != req.body.studentnumber && student.email != req.body.email);
              room.students = newClassList;
              room.save().then(()=>{
                return res.json({removedStudent:req.body});
              }).catch((err)=>next(err));

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

router.post("/add-student",authenticated,[check('classname').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Class name must be alphanumeric.").customSanitizer(val => {
  if (val){
    return val.toLowerCase();
  }
}),
check('name').isLength({min:5,max:33}).withMessage('Name must be between 2-40 characters (including spaces).').matches(/^[\w ]+$/).withMessage('Name must be alphanumeric.').customSanitizer(val => {
  if (val) {
    return val.trim().replace(/\s\s+/g,' ')
  }
}),
check('studentnumber').isLength({min:5,max:10}).withMessage('Student number must be between 5-10 digits in length.').isInt().withMessage('Student number must be an integer.'),
check('email').isEmail().withMessage('Invalid email.').normalizeEmail()], (req,res,next)=>{

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

            if (req.user.studentnumber == req.body.studentnumber) {
              throw new Error('You cannot add yourself to the class list.');
            }

            //looking for duplicate email and student number
            room.students.forEach((student)=>{

              if (student.email == req.body.email) {
                throw new Error('Duplicate email found.');
              }

              if (student.studentnumber == req.body.studentnumber) {
                throw new Error('Duplicate student numbers found.');
              }

            });

            // Valid email
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
                throw new Error(`Invalid email extension(s) found. Please ensure all emails are from the ${room.school}`);
              }


            } else {

              const re = new RegExp(`^[\\w.]{4,25}@${extForGivenSchool}$`);
              if (!re.test(req.body.email)) {
                //error
                throw new Error(`Invalid email extension(s) found. Please ensure all emails are from the ${room.school}`);
              }
            }

            //

            Student.find({email:req.body.email,studentnumber:req.body.studentnumber}).exec((err,student)=>{
              if (err) next(err)
              let addedStudent;
              if (student.length > 0) {
                addedStudent = {email:student[0].email,studentnumber:student[0].studentnumber,name:req.body.name};
                room.students.push(addedStudent);
              } else {
                addedStudent = {email:req.body.email,studentnumber:req.body.studentnumber,name:req.body.name};
                room.students.push(addedStudent);
              }

              room.save().then(()=>{
                return res.json({addedStudent:addedStudent});
              }).catch((err)=>next(err));

            });

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

router.post("/status",authenticated,[check('name').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Class name must be alphanumeric.").customSanitizer(val => {
  if (val){
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
    } else {
      next(err)
    }

  });

});

router.post("/ticket",authenticated,[check('title').isLength({min:10,max:150}).withMessage("Election title must be between 10-150 characters.").customSanitizer(val => {
  if (val) {
    return val.trim().replace(/\s\s+/g, ' ')
  }
}),
check('typeof').isIn(['stv','fpp','approval']).withMessage('Invalid election type.'),
check('vacancies').isInt().withMessage('Vacancies must be an integer.'),
check('urls.*').optional().isURL().withMessage('Please ensure that all links are valid URLs.').matches(/^https*/).withMessage('Invalid URL. Please copy and paste entire URL.'),
check('restrictions').custom((resOb) => Object.prototype.toString.call(resOb) == "[object Object]").withMessage('Incorrect format detected.'),
check('candidates').custom((candidates) => Object.prototype.toString.call(candidates) == "[object Object]" ).withMessage('Incorrect format detected.').custom((candidates) => Object.values(candidates).indexOf(true) > -1).withMessage('There must be at least 1 candidate selected to run.'),
check('description').isLength({min:20,max:500}).withMessage("Description must be between 20-500 characters.").customSanitizer(val => {
  if (val) {
    return val.trim().replace(/\s\s+/g, ' ')
  }
}),
check('duration').custom((time) => time >= 0 && time <= 168 ).withMessage("Duration must be between 0.1 (6 minutes) and 168 hours.")],(req,res,next)=>{


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }


  const studentIds = Object.keys(req.body.candidates);
  let candidates = {};
  studentIds.forEach((id)=>{
    if (req.body.candidates[id]) {
      candidates[id] = true;
    }
  });

  if (req.body.vacancies >= Object.keys(candidates).length) {
    return res.status(422).json({ errors: [{msg:'The number of candidates must be greater than the number of vacancies.'}] });
  }

  const restrictedStudentIds = Object.keys(req.body.restrictions);
  let restrictedCandidates = {};
  restrictedStudentIds.forEach((id)=>{
    if (req.body.restrictions[id]) {
      restrictedCandidates[id] = true;
    }
  });

  let ticketBody = {type:req.body.typeof,candidates:candidates,restrictions:restrictedCandidates,title:req.body.title,description:req.body.description,duration:req.body.duration,links:req.body.urls,vacancies:req.body.vacancies};

  return res.json({election:ticketBody});



});

router.post("/submit-ticket",authenticated,[check('sheet.*.title').isLength({min:10,max:150}).withMessage("All election titles must be between 10-150 characters.").customSanitizer(val => {
  if (val) {
    return val.trim().replace(/\s\s+/g, ' ')
  }
}),
check('sheet').custom((electionSheet) => electionSheet.length < 20 && electionSheet.length > 0).withMessage('The ticket must be less than 20 elections.'),
check('sheet.*.links.*').optional().isURL().withMessage('Please ensure that all links are valid URLs.').matches(/^https*/).withMessage('Invalid URL. Please copy and paste entire URL.'),
check('sheet.*.restrictions').custom((restrictedOb) => Object.prototype.toString.call(restrictedOb) == "[object Object]").withMessage('Incorrect format.'),
check('sheet.*.candidates').custom((candidates) => Object.prototype.toString.call(candidates) == "[object Object]" ).withMessage('Incorrect format detected.').custom((candidates) => Object.values(candidates).indexOf(true) > -1).withMessage('There must be at least 1 candidate selected to run.'),
check('sheet.*.description').isLength({min:20,max:500}).withMessage("All descriptions must be between 20-500 characters.").customSanitizer(val => {
  if (val) {
    return val.trim().replace(/\s\s+/g, ' ')
  }
}),
check('sheet.*.vacancies').matches(/^\d+$/).withMessage('Vacancies must be an integer.'),
check('sheet.*.type').isIn(['stv','fpp','approval']).withMessage('Not a valid election type.'),
check('sheet.*.duration').custom((time) => time >= 0 && time <= 168 ).withMessage("All durations must be between 0.1 (6 minutes) and 168 hours."),
check('classname').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Class name must be alphanumeric.").customSanitizer(val => {
  if (val) {
    return val.toLowerCase()
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
          if (classroom.master == req.user.id) {

            const tokens = classroom.students.map((student)=>{
              return {studentnumber:student.studentnumber,hash:uuidv4()}
            });

            sheet.forEach((poll,idx) => {

              const restrictedStudentIds = Object.keys(poll.restrictions);
              let restrictedCandidates = [];
              const re = new RegExp('^[\\d]{5,10}$');
              restrictedStudentIds.forEach((id)=>{
                if (!re.test(id)) {
                  throw new Error('Invalid format for election restrictions.');
                  //return res.status(422).json({errors:[{msg:'Invalid format for election restrictions.'}]});
                }
                if (poll.restrictions[id] == true) {
                  restrictedCandidates.push(id);
                } else if (poll.restrictions[id] == false) {
                  // ignore
                } else {
                  throw new Error('Invalid format for election restrictions.');
                  //return res.status(422).json({errors:[{msg:'Invalid format for election restrictions.'}]});
                }
              });

              let voterStat = classroom.students.map((student)=>{
                if (restrictedCandidates.indexOf(student.studentnumber.toString()) == -1) {
                  return {studentnumber:student.studentnumber,didVote:false};
                } else {
                  return {studentnumber:student.studentnumber,didVote:true};
                }
              });

              const classStudentIds = classroom.students.map(student => student.studentnumber);
              trueCandidates = Object.keys(poll.candidates).filter(candidate => poll.candidates[candidate] == true);
              trueCandidates.forEach((candidate)=>{
                if (!classStudentIds.includes(candidate)) {
                  throw new Error('Candidates must be a student in the class list.');
                  //return res.status(422).json({errors:[{msg:'Candidates must be a student in the class list.'}]});
                }
              });

              poll.candidates = classroom.students.filter((student) => {
                return trueCandidates.indexOf(student.studentnumber.toString()) > -1
              });


              poll.date = new Date();
              poll.class = classroom.id;
              poll.status = true;
              if (poll.type == "fpp" || poll.type == "approval") {
                poll.count = poll.candidates.map((ob) => { return { studentnumber:ob.studentnumber,votes:0,_id:ob._id,name:ob.name } });
              }

              if (poll.type == "stv") {
                poll.count_STV = poll.candidates.map((ob) => { return { studentnumber:ob.studentnumber,_id:ob._id,name:ob.name,ranks:[] } });
              }

              poll.electionAccess = classroom.students.map((student) => { return {studentnumber:student.studentnumber,permission:false} });
              poll.voteStatus = voterStat;
              poll.tokens = tokens;
              if (poll.urls != undefined) {
                poll.links = poll.urls;
              }

              if (poll.candidates.length <= poll.vacancies) {
                // error
                throw new Error('The number of candidates must exceed the number of vacancies.');
                //return res.status(422).json({errors:[{msg:'The number of candidates must exceed the number of vacancies.'}]});

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



        } else {
          return res.status(422).json({errors:[{msg:"Classroom does not exist."}]});
        }
      } catch(e) {
        return res.status(422).json({errors:[{msg:e.message}]});
      }

    })

});

router.post("/access-poll/:key",authenticated,[check('name').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Class name must be alphanumeric.").customSanitizer(val => {
  if (val) {
    return val.toLowerCase();
  }
}),
check('password').isLength({min:4}).withMessage("Password must be at least 4 characters.").matches(/^[\w-]+$/).withMessage("Password must be alphanumeric. Hyphens are allowed.")],(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  if (req.params.key === "code") {
    Classroom.findOne({ name:req.body.name }).populate('elections').exec((err,classroom) => {
        if (err) next(err)

        try {
          if (classroom) {
            const studentIds = classroom.students.map(student => student.studentnumber);
            if (studentIds.includes(req.user.studentnumber)) {

              if (classroom.elections.length > 0) {

                const firstElection = classroom.elections.filter(el => el.status == true)[0];
                const pass = firstElection.tokens.find((student) => {
                  return student.studentnumber == req.user.studentnumber && student.hash == req.body.password;
                });

                if (!pass) {
                  throw new Error('Incorrect password.');
                } else {
                  Election.find({tokens: {$elemMatch : { studentnumber:req.user.studentnumber,hash:req.body.password }}}).exec((err,polls) => {
                    if (err) next(err)
                    if (polls) {
                      polls.forEach((poll,idx)=>{
                        poll.electionAccess.forEach(async function(person,i) {
                          if (person.studentnumber == req.user.studentnumber) {
                            poll.electionAccess.splice(i,1,{_id: person._id,studentnumber:req.user.studentnumber,permission:true});
                            await poll.save().then(()=>{}).catch(err => next(err));
                            if (polls.length == idx+1) {
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
                //
                throw new Error('No elections currently going on.');
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

  if (req.params.key == "key") {
    bcrypt.compare(req.body.password,req.user.key,(error,response)=>{
      if (error) next(error)
      if (response) {
        Classroom.find({name:req.body.name}).populate('elections').exec((err,room)=>{
          if (err) next(err)
          if (room.length > 0) {
            let valid = room[0].students.filter(student => student.studentnumber == req.user.studentnumber);
            if (valid.length > 0) {
              let firstElection = room[0].elections.filter(el => el.status == true)[0];
              let token = firstElection.tokens.filter(token => token.studentnumber == req.user.studentnumber)[0];
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
        return res.status(422).json({errors:[{msg:'Incorrect key.'}]});
      }
    });
  }



});

router.post("/vote",[check('type').isIn(['stv','fpp','approval']).withMessage('Invalid election type.')],authenticated,(req,res,next)=>{

  if (req.body.type == "stv") {
    if (Object.prototype.toString.call(req.body.student) != "[object Array]") {
      return res.status(422).json({ errors: [{msg:'Invalid submission.'}] });
    }
    if (req.body.students.length <= 0) {
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
              const studentStatus = elec.voteStatus.filter(student => student.studentnumber == req.user.studentnumber)[0];
              if (!studentStatus.didVote) {
                if (req.body.type == "fpp") {
                  const candidatePresent = elec.candidates.find(candidate => candidate._id == req.body.student._id);
                  if (candidatePresent) {
                    elec.count.forEach((student)=>{
                      if (student._id == req.body.student._id) {
                        student.votes = student.votes + 1;
                      }
                    });

                    elec.total = elec.total+1;

                    elec.voteStatus.forEach((ob)=>{
                      if (ob.studentnumber == req.user.studentnumber) {
                        ob.didVote = true;
                      }
                    });
                    elec.save().then(()=>{
                      return res.json({}) //success
                    }).catch((err)=>next(err));


                  } else {
                    // candidate is not legit
                    throw new Error('Vote note submitted: candidate not found.');
                  }
                }

                if (req.body.type == "stv") {
                  let studentIdsAllCand = elec.candidates.map(cand => cand._id);
                  req.body.student.forEach((id)=>{
                    if (studentIdsAllCand.indexOf(id) == -1) {
                      throw new Error("Candidate does not exist.");
                    }
                  });

                  let firstChoice = req.body.student[0];
                  elec.count_STV.forEach((ob)=>{
                    if (ob._id == firstChoice) {
                      ob.ranks.push(req.body.student);
                      ob.total = ob.total + 1;
                    }
                  });

                  elec.total = elec.total + 1;

                  elec.quota = (elec.total/(elec.vacancies + 1)) + 1;

                  elec.voteStatus.forEach((ob)=>{
                    if (ob.studentnumber == req.user.studentnumber) {
                      ob.didVote = true;
                    }
                  });

                  elec.save().then(()=>{
                    return res.json({}) //success
                  }).catch((err)=>next(err));


                }

                if (req.body.type == "approval") {
                  let studentIdsAllCand = elec.candidates.map(cand => cand._id);
                  Object.keys(req.body.student).forEach((id)=>{
                    if (studentIdsAllCand.indexOf(id) == -1) {
                      throw new Error("Candidate does not exist.");
                    }
                  });

                  elec.count.forEach((ob)=>{
                    if (req.body.student[ob._id] === true) {
                      ob.votes = ob.votes + 1;
                    }
                  });

                  elec.total = elec.candidates.length + elec.total;

                  elec.voteStatus.forEach((ob)=>{
                    if (ob.studentnumber == req.user.studentnumber) {
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
    } catch(e) {
      return res.status(422).json({ errors: [{msg:e.message}] });
    }





  })



});

router.post("/expired",authenticated,(req,res,next) => {


  edits = async (ids) =>{

      for(let i=0;i<ids.length;i++) {
        let expiredElec = await Election.findById(ids[i]).exec();
        let expiredElecClass = await Classroom.findById(expiredElec.class).populate({path:'elections',options:{sort:{'date':1}}}).exec();
        if (expiredElecClass.master == req.user.id) {

          if (expiredElec.type == "fpp" || expiredElec.type == "approval") {
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
                if (student.ranks.length >= roundedQuota) {
                  exceededThreshold.push(student.studentnumber);
                  elected.push({studentnumber:student.studentnumber,quota:roundedQuota,_id:student._id});
                  let excessVotes = _.sample(student.ranks,student.ranks.length - roundedQuota);
                  excessVotes.forEach((excess)=>{
                    excess.shift();
                    let followingRanked = excess[0];
                    expiredElec_.count_STV.forEach((candidate) => {
                      if (candidate._id == followingRanked) {
                        candidate.ranks.push(excess);
                      }
                    })
                  });
                }
              });

              await expiredElec_.save();
              // not enough votes
              let expiredElec__ = await Election.findById(ids[i]).exec();
              if (elected.length < expiredElec_.vacancies) {
                expiredElec__.count_STV.sort((a,b)=>{
                  return a.total - b.total;
                });
                try {

                  expiredElec__.count_STV.forEach((student,index)=>{

                    if (exceededThreshold.indexOf(student.studentnumber) == -1 && index+1 <= expiredElec__.candidates.length - expiredElec__.vacancies) {

                      eliminated.push(student.studentnumber);

                      student.ranks.forEach((voteList)=>{
                        voteList.shift();
                        for(let i=0;i<voteList.length;i++){
                          try {
                            expiredElec__.count_STV.forEach((candidate)=>{
                              if (candidate._id == voteList[i] && exceededThreshold.indexOf(voteList[i]) == -1 && eliminated.indexOf(voteList[i]) == -1) {
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
                          if (student_.ranks.length >= roundedQuota && exceededThreshold.indexOf(student_.studentnumber) == -1) {
                            elected.push({studentnumber:student.studentnumber,quota:roundedQuota,_id:student_._id});
                            exceededThreshold.push(student.studentnumber);
                          }
                      });

                      // check to see if there are remaining vacancies

                      if (elected.length >= expiredElec__.vacancies) {
                        throw new Error();
                      }

                    } else {
                      elected.push({studentnumber:student.studentnumber,quota:roundedQuota,_id:student._id});
                      exceededThreshold.push(student.studentnumber);
                      throw new Error();
                    }




                  });

                } catch(e) {
                  // done
                  let losers = [];
                  expiredElec__.candidates.forEach((can)=>{
                    if (exceededThreshold.indexOf(can.studentnumber) == -1) {
                      losers.push({studentnumber:can.studentnumber,quota:0,_id:can._id});
                    };
                  });
                  let elected_all = elected.concat(losers);
                  elected_all.forEach((ob)=>{
                    expiredElecClass.students.forEach((student)=>{
                      if (student.studentnumber == ob.studentnumber) {
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
                  if (exceededThreshold.indexOf(can.studetnumber) == -1) {
                    losers.push({studentnumber:can.studentnumber,quota:0,_id:can._id});
                  };
                });
                let elected_all = elected.concat(losers);
                elected_all.forEach((ob)=>{
                  expiredElecClass.students.forEach((student)=>{
                    if (student.studentnumber == ob.studentnumber) {
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

            } else {
              // poll has already been closed and expired
              throw new Error();
            }
          } else {
            // neither stv or fpp
            throw new Error();
          }

        } else {
          // do not have permission to expire elections
          throw new Error();
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


      Classroom.findOne({name:req.body.name}).populate({
        path:'elections',
        populate: {
          path: 'candidates'
        }
      }).exec((err,room) => {
        if (err) next(err)
        if (room.master == req.user.id) {

          Election.findById(req.body.id).exec((error,poll)=>{
            if (error) next(error)
            if (poll) {
              if (poll.status) {
                bcrypt.compare(req.body.password,room.password,(e,r)=>{
                  if (e) next(e)
                  if (r) {
                    let updatedElections = room.elections.filter(elections => elections._id != req.body.id);
                    room.elections = updatedElections;
                    room.save().then(()=>{
                      Election.deleteOne({_id:req.body.id},(err,result)=>{
                        if (err) next(err)
                      });
                      return res.json({elections:updatedElections});
                    }).catch((err)=>next(err));
                  } else {
                    return res.status(422).json({ errors: [{msg:"Unauthorized: incorrect password."}] });
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
          return res.status(422).json({ errors: [{msg:"Unauthorized: you do not have permission to perform this action."}] });
        }
      });

});

router.post("/delete-class",authenticated,[check('name').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Class name must be alphanumeric.").customSanitizer(val => {
  if (val) {
    return val.toLowerCase()
  }
}),
check('password').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric.")],(req,res,next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
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
                if (room.elections >0) {
                  Election.deleteMany({id:room.elections},(err,docs)=>{
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
            return res.status(401).json({errors:[{msg:"Password is incorrect."}]});
          }
      });
    } else {
      return res.status(401).json({errors:[{msg:"Classroom does not exist."}]});
    }
  })

});

router.post("/leave-class",authenticated,[check('name').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Class name must be alphanumeric.").customSanitizer(val => {
  if (val) {
    return val.toLowerCase()
  }
}),
check('password').isLength({min:4,max:12}).withMessage("Password must be between 4-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric.")],(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
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
      return res.status(422).json({errors:[{msg:'Incorrect password.'}]});
    }

  });

});

router.get("/permission/:id",(req,res,next)=>{
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {

      Election.findOne({_id: req.params.id}).populate({
        path: 'class',
        select: 'students _id'
      }).select('-tokens -count.studentnumber -candidates.studentnumber -elected_STV.studentnumber -count_STV.studentnumber').lean().exec((err,election)=>{

        if (err) {
          next(err)
        }

        if (election) {
          if (election.status) {
            election.electionAccess.forEach((student,idx)=>{
              if (student.studentnumber == req.user.studentnumber) {
                if (student.permission) {

                  if (election.voteStatus) {
                    election.voteStatus = election.voteStatus.filter(voterObject => voterObject.studentnumber == student.studentnumber);
                  }

                  if (election.electionAccess) {
                    election.electionAccess = election.electionAccess.filter(accessObject => accessObject.studentnumber == student.studentnumber);
                  }

                  let classSize = election.class.students.length;
                  delete election.class['students'];

                  return res.json({election:election,classSize:classSize});
                } else {
                  return res.status(401).send('Must enter your election key before proceeding to poll.');
                }
              }
              if (idx+1 == election.electionAccess.length) {
                return res.status(401).send('Unauthorized.');
              }
            });
          } else {
            let students = election.class.students.map(student => student.studentnumber);
            if (students.indexOf(req.user.studentnumber) > -1) {
              delete election['class'];
              return res.json({election:election});
            } else {
              if (election.class.master == req.user.id) {
                delete election['class'];
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


module.exports = router;
