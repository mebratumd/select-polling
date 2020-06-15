const LocalStrategy = require('passport-local').Strategy;
const Student = require('../models/student.js');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


module.exports = (passport) => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      Student.findOne({ username: username.toLowerCase() }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'This user does not exist.',active:true }); //
        } else {
          if (user.active) {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                  return done(null, user);
                } else {
                  return done(null, false, { message: 'Incorrect password.',active:true });
                }
            });
          } else {
            return done(null, false, { message: `${user.firstname}, please activate your account.`,active:false });
          }

        }



      });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Student.findById(id,(err, user) => {
      done(err, user);
    });
  });
}
