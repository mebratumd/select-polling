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
          return done(null, false, { message: 'This user does not exist.',active:undefined }); //
        } else {
          if (user.active) {
            bcrypt.compare(password, user.password, async (err, res) => {
                let currentTime = new Date().getTime();
                if (res) {
                  if (user.loginAttempts < 10 || user.loginTimeout < currentTime) {
                    /*if (user.loginTimeout < currentTime) {

                    }*/
                    user.loginAttempts = 0;
                    user.loginTimeout = undefined;
                    await user.save();

                    return done(null, user);
                  } else {
                    return done(null, false, { message: 'Account locked. Please wait 1 minute.', active:true });
                  }
                } else {
                  if (user.loginAttempts < 10 || user.loginTimeout < currentTime) {
                    if (user.loginTimeout < currentTime) {
                      user.loginAttempts = 0;
                      user.loginTimeout = undefined;
                    }
                    user.loginAttempts++;
                    await user.save();
                    return done(null, false, { message: 'Incorrect password.',active:true });
                  } else {
                    if (!user.loginTimeout) {
                      user.loginTimeout = currentTime + 60000;
                      await user.save();
                    }
                    return done(null, false, { message: 'Account locked. Please wait 1 minute.', active:true });
                  }

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
