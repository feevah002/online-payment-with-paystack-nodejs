require('dotenv').config()
require('./src/connect/mongodb')
const bodyParser = require("body-parser");
const User = require("./app/user/model");
      express = require("express"),
      expressSession = require("express-session"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      nodemailer = require("nodemailer"),
      app = express();
 

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"))
//sestting a view engine
app.set("view engine","ejs")


// authentication handling 
app.use(expressSession({
  secret:"life is a mess",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
})


// route handlers
const userRoute = require(`./app/user/route`)
const payRoute = require(`./app/payment/route`)
// const proRoute = require(`./app/pro/route`)
// const basicRoute = require(`./app/basic/route`)
// const noneRoute = require(`./app/none/route`)
app.use(userRoute)
app.use(payRoute)
// app.use(proRoute)
// app.use(basicRoute)
// app.use(noneRoute)


const PORT = process.env.PORT
app.listen(PORT, (err)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log(`server started succeccfully, PORT: ${PORT}`)
  }
})