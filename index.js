//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User_ = require("./mongod.js")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
;

app.get("/",(req,res)=>{
  res.render("home.ejs")
})
 app.get("/register",(req,res)=>{
  res.render("register.ejs")
})
  app.get("/login",(req,res)=>{
  res.render("login.ejs")
})

// level 1 
app.post("/register",async(req,res)=>{
  const user = new User_({
     email:req.body.username,
     password:req.body.password
  });
  await user.save();
  res.render("secrets.ejs")
});

app.post("/login",async(req,res)=>{
  const userName = req.body.username;
  const password = req.body.password;
  const user = await User_.findOne({
    email:userName
  });
  if(user.password == password){
    res.render("secrets.ejs");
  } else
    console.log("wrong password");
  
})

  









app.listen("4000");