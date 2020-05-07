const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: './uploads' });
const csv = require('fast-csv');
const fs = require('fs');
const Classroom = require('../models/classroom.js');
const Student = require('../models/student.js')
const Election = require('../models/election.js');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const mongoose = require("mongoose");

const authenticated = (req,res,next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send();
  }

}

// dashboard endpoints

router.post("/search",authenticated,(req,res)=>{

  Classroom.find({ name: {$regex: req.body.name.replace(/ /g,''), $options: 'i' } }).select('name school').limit(100).exec((err,rooms)=>{

    if (err) throw err

    return res.json({classes:rooms});

  });

});

router.post("/password",authenticated,(req,res)=>{

  Classroom.findOne({name:req.body.name}).exec((err,room)=>{
    if (err) throw err
    if (room) {
      bcrypt.compare(req.body.password,room.password,(err,resp)=>{
        if (err) throw err
        if (resp){
          const student = room.students.filter((student)=>{
            return student.email == req.user.email && student.studentnumber == req.user.studentnumber;
          });
          if (student.length > 0) {
            // success
            Student.findById(req.user.id).exec((e,s)=>{
              if (e) throw e
              if (s) {
                if (s.classrooms_student.length < 5) {
                  s.classrooms_student.push(room.id);
                  room.joined = room.joined + 1;
                  room.save();
                  s.save((e,s)=>{
                    if (e) throw e
                    if (s) res.json({})
                    else res.status(422).json({errors:[{msg:`Something went wrong. Please submit details again.`}]});
                  });
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

router.post("/edit",authenticated,upload.single('classfile'), (req,res)=>{
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
        sortedObject[key.toLowerCase()] = row[key];
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
    if (err) throw err
  });


});

router.post("/submit",authenticated,[check('classname').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Class name must be alphanumeric."),
check('school').isIn(['University of Manitoba']).withMessage("School not found."),
check('partake').isIn([true,false]).withMessage("Partake status must be either 'yes' or 'no'"),
check('password').isLength({min:6,max:12}).withMessage("Password must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Password must be alphanumeric."),
], (req,res)=>{

  const schoolExtensions = {'University of Manitoba': ['myumanitoba.ca','cc.umanitoba.ca','umanitoba.ca']};

  let finalClassList = [];
  const studentCheck = (student) => {
    const headers = Object.keys(student);
    const sorted = {};

    if (headers.length == 3) {
      headers.forEach((header)=>{
          if (['name','studentnumber','email'].indexOf(header.toLowerCase()) == -1) {
            throw new Error("Incorrect CSV headers. Please ensure that the CSV file you uploaded has the following headers as the first row: name,studentnumber,email ");
          }
      });
      headers.sort().forEach((header)=>{
        sorted[header.toLowerCase()] = student[header];
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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
// here

  Student.findById(req.user.id).exec((er,st)=>{
    if (er) throw er
    // less than or equal to 10 classrooms
    if (st.classrooms_master.length < 5) {


      Classroom.find({name:req.body.classname.toLowerCase()},(err,classroom) => {
        if (err) throw err

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
                if (err) throw err
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
                    if (err) throw err
                    if (classroom) {
                      Student.findById(req.user.id, (err,student)=>{
                        if (err) throw err
                        if (student) {
                          student.classrooms_master.push(classroom.id);
                          student.save((err,updated)=>{
                            if (err) throw err
                            return res.json({}); // success
                          });
                        } else {
                          throw new Error('Classroom was successfully created, however, you will need to search for the class and enter its password. This can be done from your dashboard.');
                        }
                      });
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
      return res.status(422).json({errors:[{msg:"A maximum of 14 classes can be adminned per user."}]});
    }
  })




});

// classroom endopoints

router.post("/delete-student",authenticated,[check('classname').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Class name must be alphanumeric."),
check('studentnumber').isLength({min:5,max:10}).withMessage('Student number must be between 5-10 digits in length.').isInt().withMessage('Student number must be an integer.'),
check('email').isEmail().withMessage('Invalid email.')], (req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }


  Classroom.findOne({name:req.body.classname.toLowerCase()}).exec((err,room)=>{
    if (err) throw err

    try {
      if (room) {
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
              if (err) throw err
              if (student) {
                const newClassList = student.classrooms_student.filter(classroom => classroom != room.id);
                student.classrooms_student = newClassList;
                student.save((err,student)=>{
                  if (err) throw err
                });
              }

            });

            const newClassList = room.students.filter(student => student.studentnumber != req.body.studentnumber);
            room.students = newClassList;
            room.save((err,room)=>{
              if (err) throw err
            });

            return res.json({removedStudent:req.body});

          } else {
            throw new Error("You cannot remove students from the classroom.");
          }
        } else {
          // classroom less than or equal to 4 students
          throw new Error("Classroom size needs to be more than 4 students.");
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

router.post("/add-student",authenticated,[check('classname').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Class name must be alphanumeric."),
check('name').isLength({min:5,max:33}).withMessage('Name must be between 2-40 characters (including spaces).').matches(/^[\w ]+$/).withMessage('Name must be alphanumeric.'),
check('studentnumber').isLength({min:5,max:10}).withMessage('Student number must be between 5-10 digits in length.').isInt().withMessage('Student number must be an integer.'),
check('email').isEmail().withMessage('Invalid email.')], (req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Classroom.findOne({name:req.body.classname.toLowerCase()}).exec((err,room)=>{
    if (err) throw err

    try {
      if (room) {
        if (room.students.length <= 120) {
          if (room.master == req.user.id) {

            if (req.user.email == req.body.email) {
              throw new Error('You cannot add youself to the class list.');
            }

            if (req.user.studentnumber == req.body.studentnumber) {
              throw new Error('You cannot add yourself to the class list.');
            }

            //looking for duplicate email and student number
            room.students.forEach((student)=>{

              if (student.email == req.body.email.toLowerCase()) {
                throw new Error('Duplicate email found.');
              }

              if (student.studentnumber == req.body.studentnumber) {
                throw new Error('Duplicate studentnumbers found.');
              }

            });

            // Valid email
            const schoolExtensions = {'University of Manitoba': ['myumanitoba.ca','cc.umanitoba.ca','umanitoba.ca']};
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

            Student.find({email:req.body.email.toLowerCase(),studentnumber:req.body.studentnumber}).exec((err,student)=>{
              if (err) throw err
              let addedStudent;
              if (student.length > 0) {
                addedStudent = {email:student.email,studentnumber:student.studentnumber,name:`${student.firstname} ${student.lastname}`,disabled:false};
                room.students.push(addedStudent);
              } else {
                addedStudent = {email:req.body.email.toLowerCase(),studentnumber:req.body.studentnumber,name:req.body.name,disabled:true};
                room.students.push(addedStudent);
              }

              room.save((err,room)=>{
                if (err) throw err
                if (room) {
                  return res.json({addedStudent:addedStudent});
                } else {
                  throw new Error('Oops. Something went wrong. Please try adding details again.');
                }
              })

            });

          } else {
            throw new Error('You do not have permission to modify the class list.');
          }
        } else {
          throw new Error('Classroom cannot exceed 120 students');
        }



      } else {
        throw new Error('Classroom does not exist.');
      }
    } catch(e) {
      return res.status(422).json({ errors: [{msg:e.message}] });
    }


  });





});

router.post("/status",authenticated,(req,res)=>{

  Student.findById(req.user.id, (err,student) => {

    if (student) {

      Classroom.findOne({name:req.body.name},(err,room)=>{

        if (room) {
          if (req.user.id == room.master) {
            return res.json({master:true});
          } else {
            if (student.classrooms_student.indexOf(room.id) > -1) {
              return res.json({master:false});
            } else {
              return res.status(422).send(); // not a student or a master/admin
            }
          }
        } else {
          return res.status(422).send("Classroom does not exist.");
        }

      });
    }
  });

});

router.post("/ticket",authenticated,[check('title').isLength({min:10,max:150}).withMessage("Election title must be between 10-150 characters."),
check('urls.*').optional().isURL().withMessage('Please ensure that all links are valid URLs.'),
check('restrictions').custom((resOb) => Object.prototype.toString.call(resOb) == "[object Object]").withMessage('Incorrect format detected.'),
check('candidates').custom((candidates) => Object.values(candidates).indexOf(true) > -1).withMessage('There must be at least 1 candidate selected to run.'),
check('description').isLength({min:20,max:500}).withMessage("Description must be between 20-500 characters."),
check('duration').custom((time) => time >= 0.1 && time <= 168 ).withMessage("Duration must be between 0.1 (6 minutes) and 168 hours.")],(req,res)=>{


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

  const restrictedStudentIds = Object.keys(req.body.restrictions);
  let restrictedCandidates = {};
  restrictedStudentIds.forEach((id)=>{
    if (req.body.restrictions[id]) {
      restrictedCandidates[id] = true;
    }
  });



  return res.json({election:{candidates:candidates,restrictions:restrictedCandidates,title:req.body.title,description:req.body.description,duration:req.body.duration,links:req.body.urls}});



});

router.post("/submit-ticket",authenticated,[check('sheet.*.title').isLength({min:10,max:150}).withMessage("All election titles must be between 10-150 characters."),
check('sheet').custom((electionSheet) => electionSheet.length < 20 && electionSheet.length > 0).withMessage('The ticket must be less than 20 elections.'),
check('sheet.*.links.*').optional().isURL().withMessage('Please ensure that all links are valid URLs.'),
check('sheet.*.restrictions').custom((restrictedOb) => Object.prototype.toString.call(restrictedOb) == "[object Object]").withMessage('Incorrect format.'),
check('sheet.*.candidates').custom((candidates) => Object.values(candidates).indexOf(true) > -1).withMessage('There must be at least 1 candidate selected to run.'),
check('sheet.*.description').isLength({min:20,max:500}).withMessage("All descriptions must be between 20-500 characters."),
check('sheet.*.duration').custom((time) => time >= 0.1 && time <= 168 ).withMessage("All durations must be between 0.1 (6 minutes) and 168 hours."),
check('classname').isLength({min:6,max:12}).withMessage("Class name must be between 6-12 characters.").matches(/^[\w]+$/).withMessage("Class name must be alphanumeric.")],(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let sheet = req.body.sheet;
    let allCandidates = [];
    let trueCandidates;

    Classroom.findOne({name:req.body.classname}).exec((error,classroom)=>{
      if (error) throw error
      if (classroom) {
        if (classroom.master == req.user.id) {

          const tokens = classroom.students.map((student)=>{
            return {studentnumber:student.studentnumber,hash:uuidv4()}
          });

          sheet.forEach((poll,idx) => {

            const restrictedStudentIds = Object.keys(poll.restrictions);
            let restrictedCandidates = [];
            restrictedStudentIds.forEach((id)=>{
              if (poll.restrictions[id]) {
                restrictedCandidates.push(id);
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
                return res.status(422).json({errors:[{msg:'Candidates must be a student in the class list.'}]});
              }
            });

            poll.candidates = classroom.students.filter((student) => {
              return trueCandidates.indexOf(student.studentnumber.toString()) > -1
            });

            poll.date = new Date();
            poll.class = classroom.id;
            poll.status = true;
            poll.count = trueCandidates.map((id) => { return {studentnumber:id,count:0}});
            poll.electionAccess = classroom.students.map((student) => { return {studentnumber:student.studentnumber,permission:false} });
            poll.voteStatus = voterStat;
            poll.tokens = tokens;
            if (poll.urls != undefined) {
              poll.links = poll.urls;
            }


          });

          Election.insertMany(sheet).then((docs) => {
            classroom.ongoingElections = docs;
            classroom.save((e,r)=>{
              if (e) throw e
              if (r) {
                return res.json({});
              } else {
                return res.status(422).json({errors:[{msg:'Oops. Something went wrong. Please try submitting again.'}]});
              }
            });

          },(err)=>{
            return res.status(422).json({errors:[{msg:'Oops. Something went wrong. Please try submitting again.'}]});
          });


        } else {
          return res.status(422).json({errors:[{msg:'You do not have permission to create polls for this class.'}]})
        }



      } else {
        return res.status(422).json({errors:[{msg:"Classroom does not exist."}]});
      }
    })

});

router.post("/access-poll",authenticated,(req,res)=>{

  Classroom.findOne({ name:req.body.name }).populate('ongoingElections').exec((err,classroom) => {
      if (err) throw err

      try {
        if (classroom) {
          const studentIds = classroom.students.map(student => student.studentnumber);
          if (studentIds.includes(req.user.studentnumber)) {

            if (classroom.ongoingElections.length > 0) {

              const firstElection = classroom.ongoingElections[0]; // grab first election
              const pass = firstElection.tokens.find((student) => {
                return student.studentnumber == req.user.studentnumber && student.hash == req.body.password;
              });

              if (!pass) {
                throw new Error('Incorrect password.');
              } else {
                Election.find({tokens: {$elemMatch : { studentnumber:req.user.studentnumber,hash:req.body.password }}}).exec((err,polls) => {
                  if (err) throw err
                  if (polls) {
                    polls.forEach((poll,idx)=>{
                      poll.electionAccess.forEach((person,i)=>{
                        if (person.studentnumber == req.user.studentnumber) {
                          poll.electionAccess.splice(i,1,{_id: person._id,studentnumber:req.user.studentnumber,permission:true});
                          poll.save((err,complete)=>{
                            if (polls.length == idx+1) {
                              return res.json({});
                            }
                          })
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

});

router.post("/vote",authenticated,(req,res)=>{

  Student.findById(req.user.id).populate({
    path: 'classrooms_master classrooms_student',
    populate: {
      path: 'ongoingElections',
    }
  }).exec((err,student)=>{

    try {
      const foundElectionMaster = student.classrooms_master.filter((room)=>{
        return room.ongoingElections.some(e => e._id == req.body.id );
      });

      const foundElectionStudent = student.classrooms_student.filter((room)=>{
        return room.ongoingElections.some(e => e._id == req.body.id );
      });

      if (foundElectionMaster.length > 0 || foundElectionStudent.length > 0) {
        Election.findById(req.body.id).exec((err,elec) => {
          const start = new Date(elec.date).getTime();
          const duration = elec.duration*3600000;
          const expiration = start + duration;
          const current = new Date().getTime();
          const expired = current < expiration ? false : true;
          if (expired && elec.status) {
            elec.status = false;
            elec.save();
            Classroom.findById(elec.class).populate('ongoingElections').exec((err,room)=>{
              const idx = room.ongoingElections.findIndex(e => e._id == req.body.id);
              room.ongoingElections.splice(idx,1);
              room.archived.push(elec);
              room.save();
            });

            throw new Error('Cannot submit vote as the poll is now closed.');
          } else {
            const studentStatus = elec.voteStatus.filter(student => student.studentnumber == req.user.studentnumber)[0];
            if (!studentStatus.didVote) {
              const candidatePresent = elec.candidates.find(candidate => candidate.studentnumber == req.body.student.studentnumber);
              if (candidatePresent) {
                elec.count.forEach((student)=>{
                  if (student.studentnumber == req.body.student.studentnumber) {
                    if (student.votes) {
                      student.votes = student.votes + 1;
                    } else {
                      student.votes = 1;
                    }

                  }
                });
                elec.voteStatus.forEach((ob)=>{
                  if (ob.studentnumber == req.user.studentnumber) {
                    ob.didVote = true;
                  }
                });
                elec.save();

                return res.json({}) //success
              } else {
                // candidate is not legit
                throw new Error('Vote note submitted: candidate not found.');
              }


            } else {
              // already voted
              throw new Error('You either do not have permission to vote or have already submitted a vote.');
            }
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

router.post("/expired",authenticated,(req,res) => {

  editing = (id) => {
    return new Promise((resolve,reject)=>{
      Election.findById(id).exec((err,poll)=>{
        if (err) throw err
        if (poll) {
          const start = new Date(poll.date).getTime();
          const duration = poll.duration * 3600000;
          const expiration = start + duration;
          const current = new Date().getTime();
          const expired = current < expiration ? false : true;
          if (expired && poll.status) {
            poll.status = false;
            Classroom.findById(poll.class).populate({path:'ongoingElections archived',options:{sort:{'date':1}}}).exec((err,classroom)=>{
              if (err) throw err
              const idx = classroom.ongoingElections.findIndex(e => e._id == id);
              if (idx > -1) {
                let filteredPoll = poll;
                delete filteredPoll.electionPermission;
                delete filteredPoll.voteStatus;
                classroom.ongoingElections.splice(idx,1);
                if (classroom.archived.length < 100) {
                  classroom.archived.push(filteredPoll);
                } else {
                  classroom.archived.splice(0,1,filteredPoll);
                }


                classroom.save((er,cl) => {
                  if (er) throw er
                  if (cl) {
                    poll.save((err,p) => {
                      if (err) throw err
                      if (p) resolve(); //
                      else reject();
                    });
                  } else {
                    reject()
                  }

                });
              }

            });

          } else {
            reject()
          }


        } else {
          // poll does not exist
        }


      });
    })

  }

  updated = async (elections) => {
    for (i=0;i<elections.length;i++) {
      const t = await editing(elections[i]);
      if (elections.length-1 == i) {
        res.json({});
      }
    }

  }

  let polls = req.body.ids;
  updated(polls).catch(()=>{
    res.status(422).json({});
  });


});

router.post("/delete-poll",authenticated,(req,res) => {


      Classroom.findOne({name:req.body.name}).populate({
        path:'ongoingElections',
        populate: {
          path: 'candidates'
        }
      }).exec((err,room) => {
        if (room.master == req.user.id) {

          Election.findById(req.body.id).exec((error,poll)=>{
            if (error) throw error
            if (poll) {
              if (poll.status) {
                bcrypt.compare(req.body.password,room.password,(e,r)=>{
                  if (e) throw e

                  if (r) {
                    let updatedElections = room.ongoingElections.filter(elections => elections._id != req.body.id);
                    room.ongoingElections = updatedElections;
                    room.save((e,r)=>{
                      if (e) throw e

                      if (r) {
                        Election.deleteOne({_id:req.body.id});

                        return res.json({elections:updatedElections});



                      } else {
                        return res.status(422).json({ errors: [{msg:"Oops. Something went wrong."}] });
                      }

                    });
                  } else {
                    return res.status(422).json({ errors: [{msg:"Unauthorized: incorrect password."}] });
                  }
                })
              }
            } else {
              return res.status(422).json({errors:[{msg:'Poll does not exist.'}]});
            }

          })
          /*
          bcrypt.compare(req.body.password,room.password,(e,r)=>{
            if (e) throw e

            if (r) {
              let updatedElections = room.ongoingElections.filter(elections => elections._id != req.body.id);
              room.ongoingElections = updatedElections;
              room.save((e,r)=>{
                if (e) throw e

                if (r) {
                  return res.json({elections:updatedElections});
                  // Need to DELETE election from DB..but how?
                  Election.deleteOne({id:req.body.id});

                } else {
                  return res.status(422).json({ errors: [{msg:"Oops. Something went wrong."}] });
                }

              });
            } else {
              return res.status(422).json({ errors: [{msg:"Unauthorized: incorrect password."}] });
            }
          })
          */

        } else {
          return res.status(422).json({ errors: [{msg:"Unauthorized: you do not have permission to perform this action."}] });
        }
      });

});

router.post("/delete-class",authenticated,(req,res) => {

  Classroom.findOne({name:req.body.name},(err,room)=>{
    if (err) throw err
    if (room) {
      bcrypt.compare(req.body.password, room.password, (err,resp)=>{
        if (err) throw err
          if (resp) {
            if (room.master == req.user.id) {

              Student.find({$or:[{classrooms_master:room.id},{classrooms_student:room.id}]}).exec((err,students)=>{

                students.forEach(async function(student) {
                  idxM = student.classrooms_master.indexOf(room.id);
                  if (idxM > -1) {
                    student.classrooms_master.splice(idxM,1);
                    await student.save()
                  }
                });

                students.forEach(async function (student) {
                  idxS = student.classrooms_student.indexOf(room.id);
                  if (idxS > -1) {
                    student.classrooms_student.splice(idxS,1);
                    await student.save()
                  }
                });

                room.remove((err,result)=>{
                  if (err) throw err
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

router.post("/leave-class",authenticated,(req,res)=>{

  // password, name

  bcrypt.compare(req.body.password, req.user.password, (err,resp)=>{
    if (err) throw err
    if (resp) {
      Student.findById(req.user.id).populate('classrooms_student').exec((err,student)=>{
        if (err) throw err
        if (student) {
          student.classrooms_student = student.classrooms_student.filter(room => room.name != req.body.name);
          student.save();
          Classroom.find({name:req.body.name}).exec((err,room)=>{
            if (err) throw err
            if (room.length > 0) {
              room.joined = room.joined - 1;
              room.save();
              return res.json({});
            }
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

module.exports = router;
