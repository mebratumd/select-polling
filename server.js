const express = require('express');
const passport = require('passport');
const auth = require("./routes/auth.js");
const classroom = require("./routes/classroom.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const rateLimit = require("express-rate-limit");
const Election = require('./models/election.js');
const Student = require("./models/student.js");
const Classroom = require("./models/classroom.js");

//require('dotenv').config();



const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const classLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
});


require('./config/passport.js')(passport);

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
.then(()=>{
  console.log("Connected");
}).catch((error)=>{
  console.log(error);
})


const PORT = process.env.PORT;


app.use(express.static(path.join(__dirname,'public')));

app.use(session({
  secret: 'konjo habesha',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    collection: "sessions",
    ttl:3600,
    autoRemove: 'interval',
    autoRemoveInterval:5
  })
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.set('trust proxy', true); //


const https = (req,res,next) => {
  if (req.secure && req.protocol == "https") {
    next();
  } else {
    console.log(req.protocol);
    console.log(req.secure);
    res.redirect(`https://selectpolling.ca`);
  }
}

app.use("/",https,auth);
app.use("/class",https,classroom);

// DB failures
app.use((error,req,res,next)=>{
  console.log(error);
  res.status(500).json({errors:[{msg:'Something went wrong.'}]});
});

app.use("/",classLimiter); //

// update polls
io.of("/update").on("connection",(socket)=>{

  socket.on("check",(classID)=>{
    Classroom.findById(classID).populate({
      path: 'ongoingElections',
      options:{sort:{'date':-1}}
    }).exec((err,classroom)=>{
      if (err) throw err
      if (classroom) {
        io.of("/update").in(socket.rooms[classroom.name]).emit("updatedCount",{updatedElections:classroom.ongoingElections,name:classroom.name});
      }

    });

  });

  socket.on("joinClassroom",(classroomID)=>{
    Classroom.findById(classroomID).exec((error,classroom)=>{
      if (error) throw error
      if (classroom) {
        socket.join(classroom.name, ()=>{
          //console.log(Object.keys(socket.rooms));
        });
      }
    });
  });


});


app.get("*", (req,res)=>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
