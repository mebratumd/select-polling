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
const sslRedirect = require('heroku-ssl-redirect');



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


app.use(sslRedirect());
app.use((req,res,next)=>{
  if (!req.headers.host.match(/^www\./)) {
    res.redirect(`https://www.selectpolling.ca${req.url}`);
  } else {
    next()
  }
});

app.use(express.static(path.join(__dirname,'public/browser')));
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
app.use(require('prerender-node'));
app.set('trust proxy', true); //

app.use("/", auth);
app.use("/class",classroom);

// DB failures
app.use((error,req,res,next)=>{
  if (error) {
    res.status(500).json({errors:[{msg:'Something went wrong.'}]});
  }
});

app.use("/",classLimiter); //

// update polls
io.of("/update").on("connection",(socket)=>{

  socket.on("check",(electionID)=>{
    Election.findById({"_id":electionID}).populate({
      path:'class',
      select: 'name'
    }).select('-tokens -electionAccess -voteStatus -count.studentnumber -candidates.studentnumber').lean().exec((err,election)=>{
      if (err) throw err
      if (election) {
        io.of("/update").in(socket.rooms[election._id]).emit("updatedCount",{updatedElection:election});
      }

    });

  });

  socket.on("joinElectionRoom",(electionID)=>{
    Election.findById(electionID).exec((error,election)=>{
      if (error) throw error
      if (election) {
        socket.join(election._id, ()=>{

        });
      }
    });
  });


});


app.get("*", (req,res)=>{

  res.sendFile(path.join(__dirname, 'public/browser/index.html'));
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
