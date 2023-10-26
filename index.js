//jshint esversion:6
const express = require("express");
const app = express();
const session = require('express-session')
const bodyParser = require("body-parser");
const passport = require('passport');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
;
app.use(session({
  secret:process.env['Mongo'],
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

const User_ = require("./mongod.js");


passport.use(User_.createStrategy());

passport.serializeUser(User_.serializeUser());
passport.deserializeUser(User_.deserializeUser());


app.get("/", (req, res) => {
  res.render("home.ejs")
})
app.get("/register", (req, res) => {
  res.render("register.ejs")
})
app.get("/login", (req, res) => {
  res.render("login.ejs")
})
app.get("/logout",(req,res)=>{
  req.logout((err)=>{
    if(err) return err;
    res.redirect("/");
  });
  
})

app.get("/secrets",(req,res)=>{
  if(req.isAuthenticated()) {
    res.render("secrets.ejs")
  } else {
    res.render("login.ejs")
  }
})



  



app.post('/register', async (req, res) => {
  User_.register({username:req.body.username},req.body.password, function(err,user){
    if(err) {
      console.log(err)
    } else {
      passport.authenticate('local')(req,res, function(){
        res.redirect("/secrets")
      })
    }
  })
});
app.post('/login', async (req, res) => {
 const user = new User_({
   username:req.body.username,
   password: req.body.password
 })
  req.login(user, function(err){
    if(err){
      console.log(err)
    } else {
      passport.authenticate('local')(req,res, function(){
        res.redirect("/secrets")
      })
    }
  })
})




app.listen("7500",()=>{
  console.log("server is running");
})